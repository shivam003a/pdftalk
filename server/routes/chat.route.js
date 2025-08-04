import express from 'express';
import { checkAuth } from '../middlewares/auth.middleware.js';
const router = express.Router();

import { getAllChats, getChatById, deleteChatById } from '../controllers/chat.controller.js';

router.get('/', checkAuth, getAllChats);
router.get('/:chatId', checkAuth, getChatById)
router.delete('/:chatId', checkAuth, deleteChatById)

export default router;