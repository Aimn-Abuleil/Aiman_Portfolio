const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const About = sequelize.define('About', {
  about: {
    type: DataTypes.TEXT,
    allowNull: true   // ← now optional
  },
  imageSource: {
    type: DataTypes.STRING,
    allowNull: true   // ← image can be empty
  }
}, {
  tableName: 'about',
  timestamps: false
});

module.exports = About;
