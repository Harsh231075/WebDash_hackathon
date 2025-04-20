import express from 'express';
import { storeMessage, fetchChatHistory } from '../controllers/chatController.js';
import { protect } from '../middleware/authMiddleware.js'; // Assuming you have an auth middleware

const router = express.Router();

router.post('/store-message', protect, storeMessage);
router.get('/history/:otherUserId', protect, fetchChatHistory);

export default router;