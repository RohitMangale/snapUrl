import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authorization header missing or invalid" });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // assuming your payload has { id: ... }
    next();
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};
