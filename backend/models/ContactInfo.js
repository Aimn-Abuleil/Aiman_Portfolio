const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ContactInfo = sequelize.define('ContactInfo', {
  phone: {
    type: DataTypes.STRING,
    allowNull: true   // ← now optional
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true   // ← now optional
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true   // ← now optional
  }
}, {
  tableName: 'contact_info',
  timestamps: true
});

module.exports = ContactInfo;
