const Skill = require("../models/Skill");
const fs = require("fs");

// GET all skills grouped by category
exports.getSkills = async (req, res) => {
  try {
    const skills = await Skill.findAll();
    const grouped = {};

    skills.forEach(skill => {
      if (!grouped[skill.category]) grouped[skill.category] = [];
      grouped[skill.category].push({
        id: skill.id,
        icon: skill.icon,
        title: skill.title
      });
    });

    res.json(grouped);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST add new skill
exports.addSkill = async (req, res) => {
  try {
    const { category, title } = req.body;
    const icon = req.file ? req.file.path : null;

    if (!category || !title || !icon)
      return res.status(400).json({ error: "All fields required" });

    const newSkill = await Skill.create({ category, title, icon });
    res.status(201).json(newSkill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT update skill
exports.updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, title } = req.body;
    const icon = req.file ? req.file.path : null;

    const skill = await Skill.findByPk(id);
    if (!skill) return res.status(404).json({ error: "Skill not found" });

    skill.category = category || skill.category;
    skill.title = title || skill.title;
    if (icon) skill.icon = icon;

    await skill.save();
    res.json(skill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE skill
exports.deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const skill = await Skill.findByPk(id);
    if (!skill) return res.status(404).json({ error: "Skill not found" });

    // Delete icon file
    if (skill.icon && fs.existsSync(skill.icon)) fs.unlinkSync(skill.icon);

    await skill.destroy();
    res.json({ message: "Skill deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
