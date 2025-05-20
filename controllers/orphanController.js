const Orphan = require('../models/Orphan');
const SponsorshipRequest = require('../models/sponsorshipRequest');

exports.createOrphan = async (req, res) => {
  try {
    const orphan = await Orphan.create(req.body);
    res.status(201).json(orphan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllOrphans = async (req, res) => {
  try {
    const orphans = await Orphan.findAll();
    res.json(orphans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOrphanById = async (req, res) => {
  try {
    const orphan = await Orphan.findByPk(req.params.id);
    if (!orphan) return res.status(404).json({ error: "Orphan not found" });
    res.json(orphan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateOrphan = async (req, res) => {
  try {
    const orphan = await Orphan.findByPk(req.params.id);
    if (!orphan) return res.status(404).json({ error: "Orphan not found" });

    await orphan.update(req.body);
    res.json({ message: "Orphan updated", orphan });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteOrphan = async (req, res) => {
  try {
    const orphan = await Orphan.findByPk(req.params.id);
    if (!orphan) return res.status(404).json({ error: "Orphan not found" });

    await orphan.destroy();
    res.json({ message: "Orphan deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createSponsorshipRequest = async (req, res) => {
  const { orphan_id, sponsor_name, sponsor_email, message } = req.body;

  if (!orphan_id || !sponsor_name || !sponsor_email) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const request = await SponsorshipRequest.create({
      orphan_id,
      sponsor_name,
      sponsor_email,
      message
    });
    res.status(201).json({ message: "Sponsorship request submitted", request });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSponsorshipRequests = async (req, res) => {
  try {
    const requests = await SponsorshipRequest.findAll({
      include: [{ model: Orphan }]
    });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateRequestStatus = async (req, res) => {
  const { status } = req.body;
  const requestId = req.params.id;

  if (!['Pending', 'Approved', 'Rejected'].includes(status)) {
    return res.status(400).json({ error: "Invalid status value" });
  }

  try {
    const request = await SponsorshipRequest.findByPk(requestId);
    if (!request) return res.status(404).json({ error: "Request not found" });

    request.status = status;
    await request.save();
    res.json({ message: "Request status updated", request });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};