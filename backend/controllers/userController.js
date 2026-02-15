const userService = require("../services/userService");

const register = async (req, res) => {
  try {
    const { name, email, password, contactNo, role, timezone } = req.body;

    // Basic validation
    if (!name || !email || !password || !contactNo) {
      return res.status(400).json({
        error: "Name, email and password are required",
      });
    }

    const userData = {
      name,
      email,
      password,
      contactNo,
      role,
      timezone,
    };

    const user = await userService.register(userData);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const data = await userService.login(email, password);

    res.json({
      message: "Login successful",
      ...data,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await userService.getProfile(userId);

    res.json({
      message: "Profile fetched successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  getProfile,
};
