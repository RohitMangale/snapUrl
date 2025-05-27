
import express from 'express';
import {
  shortenUrl,
  redirectUrl,
  getAnalytics,
  getUserUrls
} from '../controllers/urlController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/shorten', authenticate, shortenUrl);
router.get('/analytics', authenticate, getAnalytics);
router.get('/my-urls', authenticate, getUserUrls);
router.get('/:short_code', redirectUrl); // Public redirection

export default router;
