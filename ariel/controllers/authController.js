import bcrypt from 'bcryptjs';  // changed from 'bcrypt'


import jwt from 'jsonwebtoken';
import supabase from '../services/supabaseClient.js';

export const googleAuth = async (req, res) => {
  const supabaseToken = req.headers.authorization?.split(' ')[1];

  if (!supabaseToken) {
    return res.status(401).json({ message: 'Missing Supabase token' });
  }

  try {
    // Verify Supabase token
    const { data: { user }, error } = await supabase.auth.getUser(supabaseToken);

    if (error || !user) {
      return res.status(401).json({ message: 'Invalid Supabase token' });
    }

    // Check if user already exists in your 'users' table
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('email', user.email)
      .single();

    let dbUser = existingUser;

    if (fetchError) {
      // User not found, create new user record
      const { data: newUser, error: insertError } = await supabase
        .from('users')
        .insert([{ email: user.email }])
        .select()
        .single();

      if (insertError) {
        return res.status(500).json({ message: 'Failed to create user' });
      }

      dbUser = newUser;
    }

    // Create your own JWT token if you want to manage sessions on your backend
    const token = jwt.sign({ id: dbUser.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      success: true,
      message: 'Google login successful',
      token,
      user: dbUser
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Google Auth failed' });
  }
};


export const signup = async (req, res) => {
  const { email, password } = req.body;
  const password_hash = await bcrypt.hash(password, 10);

  const { data, error } = await supabase.from('users').insert([{ email, password_hash }]).select().single();

  if (error) return res.status(400).json({ error: error.message });

  const token = jwt.sign({ id: data.id }, process.env.JWT_SECRET);
  res.json({ token });
};


export const login = async (req, res) => {
  const { email, password } = req.body;

  // Fetch user by email
  const { data: user, error } = await supabase
    .from('users')
    .select()
    .eq('email', email)
    .single();

  // Handle errors or invalid credentials
  if (error || !user || !(await bcrypt.compare(password, user.password_hash))) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  // Generate JWT token
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

  // Omit sensitive fields
  const { password_hash, ...safeUser } = user;

  // Send response
  res.json({
    success: true,
    message: 'Login successful',
    token,
    user: safeUser
  });
};
