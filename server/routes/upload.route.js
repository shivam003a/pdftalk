import express from 'express';
import { uploadPdf } from '../controllers/upload.controller.js';
import { checkAuth } from '../middlewares/auth.middleware.js';
import upload from '../config/multer.config.js';
import { uploadLimiter } from '../middlewares/rateLimit.middleware.js';
const router = express.Router();

router.post('/', checkAuth, uploadLimiter, upload.single('pdf'), uploadPdf);

export default router;