const Logistics = require('../models/logistics');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');  
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

exports.uploadImage = upload.single('image');

exports.createLogisticsRequest = async (req, res) => {
  try {
    const data = req.body;

    if (req.file) {
      data.imageUrl = req.file.path;  
    }

    if (data.deliverySchedule) {
      try {
        data.deliverySchedule = JSON.parse(data.deliverySchedule);
        if (!data.deliverySchedule.pickup || !data.deliverySchedule.delivery) {
          return res.status(400).json({ message: "Invalid delivery schedule format" });
        }
      } catch (e) {
        return res.status(400).json({ message: "Invalid JSON format for deliverySchedule" });
      }
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

exports.updateLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({ message: "Latitude and longitude are required" });
    }

    const logistics = await Logistics.findByPk(id);
    if (!logistics) {
      return res.status(404).json({ message: "Logistics request not found" });
    }

    logistics.currentLatitude = latitude;
    logistics.currentLongitude = longitude;
    await logistics.save();

    res.status(200).json(logistics);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating location", error: err.message });
  }
};

exports.updateSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const { pickup, delivery } = req.body;

    if (!pickup || !delivery) {
      return res.status(400).json({ message: "Pickup and delivery times are required" });
    }

    const logistics = await Logistics.findByPk(id);
    if (!logistics) {
      return res.status(404).json({ message: "Logistics request not found" });
    }

    logistics.deliverySchedule = { pickup, delivery };
    await logistics.save();

    res.status(200).json(logistics);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating schedule", error: err.message });
  }
};