import express from 'express'
import {protect}  from '../middleware/authMiddleware.js'
import { sendMessage, getAllMessage ,getConversationsForUser} from '../controllers/converstionController.js';
const router = express.Router();

router.post('/send', protect, sendMessage);
router.get('/get/:receiverId', protect, getAllMessage);
router.get('/conversations', protect, getConversationsForUser);


export default router;