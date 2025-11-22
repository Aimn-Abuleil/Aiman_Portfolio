const User = require('../models/User');

// GET all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ['name', 'roles'] });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE user
exports.createUser = async (req, res) => {
  try {
    const { name, roles } = req.body;

    if (!name || !roles) {
      return res.status(400).json({ error: 'Name and roles are required' });
    }

    // Split roles by comma, remove extra spaces
    const rolesArray = roles.split(',').map(role => role.trim());

    // Check for empty roles
    if (rolesArray.some(role => role === '')) {
      return res.status(400).json({ error: 'Roles must not be empty or have spaces around commas' });
    }

    const user = await User.create({ name, roles: rolesArray });

    res.status(201).json({ name: user.name, roles: user.roles });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE first user
exports.updateUser = async (req, res) => {
  try {
    const { name, roles } = req.body;
    const user = await User.findOne(); // get first user
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (name) user.name = name;

if (roles) {

  let rolesArray = [];

  // If roles is a STRING → convert to array
  if (typeof roles === "string") {
    rolesArray = roles.split(',').map(r => r.trim());
  }

  // If roles is already an ARRAY → use it directly
  else if (Array.isArray(roles)) {
    rolesArray = roles.map(r => String(r).trim());
  }

  // Prevent invalid data
  if (rolesArray.some(r => r === "")) {
    return res.status(400).json({ error: "Roles must not be empty" });
  }

  user.roles = rolesArray;
}


    await user.save();

    res.json({ name: user.name, roles: user.roles });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
