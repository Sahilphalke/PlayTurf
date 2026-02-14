const userModel = require("../models/userModel");
const { hashPassword, comparePassword } = require("../utils/hash");

const createUser = async (data) => {
  const { name, email, password, role, timezone } = data;

  // Existing user check
  const existingUser = await userModel.findUserByEmail(email);
  if (existingUser) throw new Error("User already exists");

  // Hash password
  const hashedPassword = await hashPassword(password);

  const userData = {
    name,
    email,
    password: hashedPassword,
    role: role || "USER",
    timezone: timezone || "UTC",
  };

  return await userModel.createUser(userData);
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
  createUser,
  findUser,
  getAllUsers,
  updateUser,
  deleteUser,
};
