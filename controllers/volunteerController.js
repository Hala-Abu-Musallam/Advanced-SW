const Volunteer = require('../models/volunteer');

exports.registerVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.create(req.body);
    res.status(201).json({ message: 'Volunteer registered successfully', volunteer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.findAll();
    res.json(volunteers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
