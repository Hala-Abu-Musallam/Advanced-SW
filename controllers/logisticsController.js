const Logistics = require('../models/logistics');
const path = require('path');
const multer = require('multer');

// إعداد multer لتخزين الصور في مجلد uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');  // تأكد أن المجلد موجود عندك
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Middleware لرفع صورة واحدة تحت المفتاح 'image'
exports.uploadImage = upload.single('image');

exports.createLogisticsRequest = async (req, res) => {
  try {
    const data = req.body;

    // إذا تم رفع صورة، خزّن مسارها
    if (req.file) {
      data.imageUrl = req.file.path;  // المسار النسبي للصورة
    }

    const newRequest = await Logistics.create(data);
    res.status(201).json(newRequest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating logistics request", error: err.message });
  }
};

exports.getAllLogistics = async (req, res) => {
  try {
    const all = await Logistics.findAll();
    res.status(200).json(all);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching logistics", error: err.message });
  }
};
