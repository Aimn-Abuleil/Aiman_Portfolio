const LoginUser = require('../models/LoginUser');

// POST /api/login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Find user in DB
    const user = await LoginUser.findOne({ where: { username, password } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Success
    res.json({
      message: 'Login successful',
      user: { username: user.username },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
