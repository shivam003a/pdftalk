import express from 'express';
import { queryPdf } from '../controllers/query.controller.js';
import { checkAuth } from '../middlewares/auth.middleware.js';
const router = express.Router();

router.post('/', checkAuth, queryPdf);

export default router;