// routes/chatRoutes.js
import express from 'express';
import { getMessages, sendMessage } from '../controllers/chatController.js';
import Message from '../models/messageModel.js';

const router = express.Router();

router.get('/:senderId/:receiverId', getMessages);

router.post('/', sendMessage);

export default router;
