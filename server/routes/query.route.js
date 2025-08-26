import express from 'express';
import { queryPdf } from '../controllers/query.controller.js';
import { checkAuth } from '../middlewares/auth.middleware.js';
import { queryDailyLimiter } from '../middlewares/rateLimit.middleware.js';
const router = express.Router();

router.post('/', checkAuth, queryDailyLimiter, queryPdf);

export default router;