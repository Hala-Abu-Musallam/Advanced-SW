const Orphan = require('../models/orphan');
exports.createOrphan = (req, res) => {
  Orphan.create(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(result);
  });
};
exports.getAllOrphans = (req, res) => {
  Orphan.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
exports.getOrphanById = (req, res) => {
  const orphanId = req.params.id;
  Orphan.getById(orphanId, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!result) return res.status(404).json({ error: "Orphan not found" });
    res.json(result);
  });
};
exports.updateOrphan = (req, res) => {
  const orphanId = req.params.id;
  Orphan.update(orphanId, req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Orphan updated", orphan: result });
  });
};

exports.deleteOrphan = (req, res) => {
  const orphanId = req.params.id;
  Orphan.delete(orphanId, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Orphan deleted" });
  });
};
exports.createSponsorshipRequest = (req, res) => {
  const { orphan_id, sponsor_name, sponsor_email, message } = req.body;

  if (!orphan_id || !sponsor_name || !sponsor_email) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const requestData = {
    orphan_id,
    sponsor_name,
    sponsor_email,
    message
  };

  Orphan.createSponsorshipRequest(requestData, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Sponsorship request submitted", request: result });
  });
};

exports.getSponsorshipRequests = (req, res) => {
  Orphan.getSponsorshipRequests((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.updateRequestStatus = (req, res) => {
  const requestId = req.params.id;
  const { status } = req.body;

  if (!['Pending', 'Approved', 'Rejected'].includes(status)) {
    return res.status(400).json({ error: "Invalid status value" });
  }

  Orphan.updateSponsorshipRequestStatus(requestId, status, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Request status updated", request: result });
  });
};
