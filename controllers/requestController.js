const Request = require('../models/request');
const Volunteer = require('../models/volunteer');
const Notification = require('../models/notification');

exports.createRequest = async (req, res) => {
  try {
    const { title, description, required_skills } = req.body;

    const newRequest = await Request.create({ title, description, required_skills });


    const skillKeywords = required_skills.toLowerCase().split(',').map(s => s.trim());

    const volunteers = await Volunteer.findAll();

    for (let volunteer of volunteers) {
      const volunteerSkills = volunteer.skills.toLowerCase();
      const hasMatch = skillKeywords.some(skill => volunteerSkills.includes(skill));

      if (hasMatch) {
        await Notification.create({
          volunteer_id: volunteer.id,
          message: `فرصة تطوع جديدة: ${title} - ${description}`
        });
      }
    }

    res.status(201).json({ message: 'Request created and notifications sent.', request: newRequest });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Request.findAll();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};