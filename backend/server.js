const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const sequelize = require('./config/db'); // Sequelize connection

// Routes
const userRoutes = require('./routes/userRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const projectRoutes = require('./routes/projectRoutes');
const contactRoutes = require('./routes/contactRoutes');
const loginRoutes = require('./routes/loginRoutes');
const skillRoutes = require('./routes/skillRoutes');

const app = express();
const PORT = 3001;

// Enable CORS
app.use(cors());

// Serve static images
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware
app.use(bodyParser.json());

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/skills', skillRoutes);

// Test Sequelize DB connection
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.error('DB connection error:', err));

// Sync Sequelize models (exclude skills)
const User = require('./models/User');
const About = require('./models/About');
const Project = require('./models/Project');
const ContactInfo = require('./models/ContactInfo');
const ContactForm = require('./models/ContactForm');

// Only sync Sequelize models, not skills table
sequelize.sync({ alter: true })
  .then(() => console.log('Sequelize models synced with DB'))
  .catch(err => console.error('DB sync error:', err));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
