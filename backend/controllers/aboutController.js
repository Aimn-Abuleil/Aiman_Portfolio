const About = require('../models/About');
const fs = require('fs');
const path = require('path');

// GET About Section
exports.getAbout = async (req, res) => {
  try {
    const about = await About.findOne({ order: [['id', 'DESC']] });
    res.json(about);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE About Section
exports.createAbout = async (req, res) => {
  try {
    const { about } = req.body;
    let imageSource = req.file ? req.file.path.replace(/\\/g, '/') : null;

    if (!about) {
      return res.status(400).json({ message: 'About text is required' });
    }

    const newAbout = await About.create({ about, imageSource });
    res.status(201).json(newAbout);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// UPDATE About Section
exports.updateAbout = async (req, res) => {
  try {
    const { about } = req.body;
    let newImage = req.file ? req.file.path.replace(/\\/g, '/') : null;

    // Get latest About entry
    const latestAbout = await About.findOne({ order: [['id', 'DESC']] });
    if (!latestAbout) {
      return res.status(404).json({ message: 'About section not found' });
    }

    // Delete old image if a new one is uploaded
    if (newImage && latestAbout.imageSource) {
      const oldImagePath = path.join(__dirname, '..', latestAbout.imageSource);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    // Update About entry
    latestAbout.about = about || latestAbout.about;
    if (newImage) latestAbout.imageSource = newImage;

    await latestAbout.save();
    res.json(latestAbout);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
