const userModel = require("../models/userModel");
const { hashPassword, comparePassword } = require("../utils/hash");
const { signAccessToken, signRefreshToken } = require("../utils/jwt");

const register = async (data) => {
  const { name, email, password, contactNo, role, timezone } = data;

  // Existing user check
  const existingUser = await userModel.getUserByEmail(email);
  if (existingUser) throw new Error("User already exists");

  // Hash password
  const hashedPassword = await hashPassword(password);

  const userData = {
    name,
    email,
    password: hashedPassword,
    contactNo,
    role: role || "USER",
    timezone: timezone || "UTC",
  };

  return await userModel.createUser(userData);
};

const login = async (email, password) => {
  // Find user
  const user = await userModel.getUserByEmail(email);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  // Compare password
  const valid = await comparePassword(password, user.password);
  if (!valid) {
    throw new Error("Invalid credentials");
  }

  if (user.status === false) {
    throw new Error("User is inactive");
  }

  // Generate tokens
  const accessToken = signAccessToken({
    id: user.id,
    role: user.role,
  });

  const refreshToken = signRefreshToken({
    id: user.id,
  });

  // Remove password before sending
  delete user.password;

  return {
    accessToken,
    refreshToken,
    user,
  };
};

const getProfile = async (userId) => {
  const user = await userModel.getUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

const findUser = async (email) => {
  return await userModel.findUser(email);
};

const getAllUsers = async () => {
  return await userModel.getAllUsers();
};

const updateUser = async (id, data) => {
  return await userModel.updateUser(id, data);
};

const deleteUser = async (id) => {
  return await userModel.deleteUser(id);
};

module.exports = {
  register,
  login,
  findUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getProfile,
};
