import bcrypt from 'bcryptjs';  // changed from 'bcrypt'
import jwt from 'jsonwebtoken';
import supabase from '../services/supabaseClient.js';

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
