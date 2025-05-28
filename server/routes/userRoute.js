import express from 'express';
import { getUsers, createUser, authUser, getProfile, updateUserProfile, deleteUser, getUserById } from '../controllers/userController.js';
import { admin, protect } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/UploadMiddleware.js';
import { sendOtp } from '../controllers/otpController.js';
import { forgotPassword, resetPassword } from '../controllers/forgotPasswordController.js';

const router = express.Router();

router.route('/')
  .get(protect, admin, getUsers)    // GET /api/users
  .post(createUser) // POST /api/users

// router.post('/upload', protect, upload.single('image'), (req, res) => {
//   if(req.file) res.json({message : "taiboo noobda"})
//     else if(req.text) res.json({message : "taiboooooooooo"})
//   else
//   res.send({ imageUrl: req.file.path })
// })

router.post('/upload', protect, upload.single('image'), (req, res) => {
  if (req.file) {
    res.json({
      message: 'File uploaded successfully',
      imageUrl: `/uploads/${req.file.filename}`
    });
  } else {
    res.status(400).json({ message: 'No file uploadehygvhfcgfcgfd' });
  }
});


router.post('/login', authUser);

router.route("/profile")
  .get(protect, getProfile)
  .put(protect, updateUserProfile)

router.route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUserProfile);

router.post('/send', sendOtp);

router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;