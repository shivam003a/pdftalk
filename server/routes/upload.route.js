import express from 'express';
import { uploadPdf } from '../controllers/upload.controller.js';
import { checkAuth } from '../middlewares/auth.middleware.js';
import upload from '../config/multer.config.js';
const router = express.Router();

router.post('/', checkAuth, upload.single('pdf'), uploadPdf);

export default router;