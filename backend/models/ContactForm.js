const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ContactForm = sequelize.define('ContactForm', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'contact_forms',
  timestamps: true
});

module.exports = ContactForm;
