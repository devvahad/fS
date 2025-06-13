// routes/imageRoutes.js
import express from 'express';
import upload from '../middlewares/uploadMiddleware.js';
import { protect } from '../middlewares/authMiddleware.js'
import {
  uploadImage,
  downloadImage,
  deleteImage
} from '../controllers/imageController.js';

const router = express.Router();

router.post('/upload', protect, upload.single('file'), uploadImage);
router.get('/download/:filename', downloadImage);
router.delete('/delete/:filename', deleteImage);

export default router;
