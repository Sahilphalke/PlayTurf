const userService = require("../services/userService");

const register = async (req, res) => {
  try {
    const { name, email, password, role, timezone } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Name, email and password are required",
      });
    }

    const userData = {
      name,
      email,
      password,
      role,
      timezone,
    };

    const user = await userService.createUser(userData);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  register,
};
