// routes/postRoutes.js
import express from 'express';
import { createPost, getAllPosts, createComment, getComments, likePost ,getLatestUserPosts} from '../controllers/postController.js';
import protect from '../middleware/authMiddleware.js'

const router = express.Router();

router.post('/create', protect, createPost);
router.get('/get-post', getAllPosts);
router.post('/create-comment/:postId', protect, createComment);
router.get('/get-comments/:postId', getComments);
router.post('/like/:postId', protect, likePost);
router.get('/latest',protect,getLatestUserPosts);

export default router;
