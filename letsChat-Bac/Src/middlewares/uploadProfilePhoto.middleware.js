const multer = require('multer');
const path = require('path');
const fs = require('fs');
const AppError = require('../errors/appError');
const statusCodes = require('../constants/statusCodes');

// Define upload directory path

const folderMap = {
  profilePic: 'uploads/profile_photos',
  groupPic: 'uploads/group_photos',
  chatMedia: 'uploads/chat_media',
  statusPic: 'uploads/status_photos',
};


// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = folderMap[file.fieldname]
    if(!folder){
      return cb(new AppError('Invalid folder name', statusCodes.BAD_REQUEST));
    }
    const uploadDir = path.join(__dirname, '..', folder);
    //insure directory should exist
    if(!fs.existsSync(uploadDir)){
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const random = Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const filename = `photo-${timestamp}-${random}${ext}`;
    cb(null, filename);
  },
});

// File filter for only allowing images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedTypes.test(ext)) {
    cb(null, true);
  } else {
    cb(new AppError('Only image files (jpeg, jpg, png, webp) are allowed!', statusCodes.BAD_REQUEST));
  }
};

// Multer middleware
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

module.exports = upload;
