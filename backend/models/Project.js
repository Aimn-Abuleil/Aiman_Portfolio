const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Project = sequelize.define('Project', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  bodyText: {
    type: DataTypes.TEXT
  },
  image: {
    type: DataTypes.STRING
  },
  links: {
    type: DataTypes.JSON
  },
  tags: {
    type: DataTypes.JSON
  }
}, {
  tableName: 'projects',
  timestamps: false
});

module.exports = Project;
