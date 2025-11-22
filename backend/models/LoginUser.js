const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // your existing Sequelize config

const LoginUser = sequelize.define('LoginUser', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'login_users', // matches SQL table name
  timestamps: true,          // createdAt & updatedAt
});

module.exports = LoginUser;
