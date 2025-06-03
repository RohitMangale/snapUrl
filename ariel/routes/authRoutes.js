import express from 'express';
import { login, signup,googleAuth } from '../controllers/authController.js';

const router = express.Router();
router.post('/signup', signup);
router.post('/googleAuth', googleAuth);
router.post('/login', login);
export default router;
