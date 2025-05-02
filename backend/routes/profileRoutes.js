import express from "express";

import protect from "../middleware/authMiddleware.js";
import { updateProfile, getMyProfile, getAllUserBasicDetails, getUserById, deletePhoto,followUnfollowUser } from "../controllers/profile.js";

const router = express.Router();

router.put("/update", protect, updateProfile);
router.get("/me", protect, getMyProfile);
router.get('/basic-details', getAllUserBasicDetails);
router.get("/view-user/:userId", getUserById);
router.delete('/delete-photo/:photoId', protect, deletePhoto)
router.post('/follow/:userId',protect,followUnfollowUser)
router.delete('/follow/:userId',protect,followUnfollowUser)
export default router;
