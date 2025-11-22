const express = require('express');
const router = express.Router();
const aboutController = require('../controllers/aboutController');
const multer = require('multer');
const path = require('path');

// Setup Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // make sure uploads folder exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Routes
router.get('/', aboutController.getAbout);
router.post('/', upload.single('image'), aboutController.createAbout);
router.put('/', upload.single('image'), aboutController.updateAbout); // <-- Add this

module.exports = router;
