const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// GET contact info
router.get('/', contactController.getContactInfo);

// POST contact form submission
router.post('/', contactController.submitForm);
router.put('/', contactController.updateContactInfo);
router.get('/form', contactController.getAllForms);



module.exports = router;
