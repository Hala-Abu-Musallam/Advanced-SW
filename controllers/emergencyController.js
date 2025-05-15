const sequelize = require("../database");
const { DataTypes } = require("sequelize");
const EmergencyCampaignModel = require("../models/EmergencyCampaign");

const EmergencyCampaign = EmergencyCampaignModel(sequelize, DataTypes);

// تقديم حملة طارئة جديدة
exports.createCampaign = async (req, res) => {
  try {
    const newCampaign = await EmergencyCampaign.create(req.body);
    res.status(201).json(newCampaign);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// عرض كل الحملات الطارئة
exports.getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await EmergencyCampaign.findAll({ order: [["createdAt", "DESC"]] });
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// عرض حملة طارئة حسب الـ ID
exports.getCampaignById = async (req, res) => {
  try {
    const campaign = await EmergencyCampaign.findByPk(req.params.id);
    if (!campaign) return res.status(404).json({ error: "Campaign not found" });
    res.json(campaign);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// تحديث بيانات الحملة
exports.updateCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Updating campaign ID:", id);
    console.log("Update data:", req.body);

    const [updated] = await EmergencyCampaign.update(req.body, {
      where: { id }
    });

    if (updated === 0) {
      return res.status(404).json({ error: "Campaign not found or no changes made" });
    }

    res.json({ message: "Campaign updated successfully" });
  } catch (error) {
    console.error("Error updating campaign:", error);
    res.status(500).json({ error: error.message });
  }
};

// التبرع لحملة طارئة
exports.donateToCampaign = async (req, res) => {
  try {
    const { amount } = req.body;
    const campaign = await EmergencyCampaign.findByPk(req.params.id);
    if (!campaign || !campaign.isActive) {
      return res.status(400).json({ error: "Campaign not found or inactive" });
    }

    campaign.currentAmount += parseFloat(amount);
    if (campaign.currentAmount >= campaign.targetAmount) {
      campaign.isActive = false;
    }

    await campaign.save();
    res.json({ message: "Donation successful", campaign });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// إيقاف الحملة
exports.deactivateCampaign = async (req, res) => {
  try {
    const campaign = await EmergencyCampaign.findByPk(req.params.id);
    if (!campaign) return res.status(404).json({ error: "Campaign not found" });

    campaign.isActive = false;
    await campaign.save();
    res.json({ message: "Campaign deactivated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
