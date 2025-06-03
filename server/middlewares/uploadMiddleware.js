// import multer from 'multer';
// import { storage } from '../config/cloudinary.js';

// const upload = multer({ storage });

// export default upload;

// middleware/upload.js

// Uploads Folder
import multer from 'multer';
import path from 'path';

// Set storage destination and filename
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure 'uploads/' folder exists
  },
  filename: function (req, file, cb) {
    // e.g. 1683504504040-myimage.jpg
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Optional: file type filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only images (jpeg, jpg, png) are allowed'));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter
});

export default upload;

