const ContactInfo = require('../models/ContactInfo');
const ContactForm = require('../models/ContactForm');

// GET contact info from DB
exports.getContactInfo = async (req, res) => {
  try {
    const info = await ContactInfo.findOne(); // Assuming only 1 record
    if (!info) return res.status(404).json({ error: 'Contact info not found' });
    res.json(info);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// POST form submission
exports.submitForm = async (req, res) => {
  try {
    const { firstName, lastName, email, message } = req.body;

    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newSubmission = await ContactForm.create({
      firstName,
      lastName,
      email,
      message
    });

    res.status(201).json({
      message: 'Form submitted successfully',
      data: newSubmission
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
// GET all contact form submissions
// GET all contact form submissions (Sequelize)
exports.getAllForms = async (req, res) => {
  try {
    const forms = await ContactForm.findAll({
      order: [['createdAt', 'DESC']]   // Correct for Sequelize
    });

    res.json(forms);
  } catch (err) {
    console.error("GET FORM ERROR:", err);
    res.status(500).json({ error: 'Server error' });
  }
};



// PUT method to update contact info
// PUT method to update contact info
exports.updateContactInfo = async (req, res) => {
  try {
    const { phone, email, address } = req.body;

    const info = await ContactInfo.findOne();
    if (!info) return res.status(404).json({ error: 'Contact info not found' });

    // Only update provided fields
    if (phone !== undefined) info.phone = phone;
    if (email !== undefined) info.email = email;
    if (address !== undefined) info.address = address;

    await info.save();

    res.json({ message: 'Contact info updated successfully', data: info });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
