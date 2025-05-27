import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import urlRoutes from './routes/urlRoutes.js';
import cors from 'cors';
dotenv.config();
const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // allow frontend
  credentials: true               // allow cookies if used
}));
app.use(express.json());
app.use('/', urlRoutes); // short codes + analytics
app.use('/auth', authRoutes); // login/signup

export default app;
