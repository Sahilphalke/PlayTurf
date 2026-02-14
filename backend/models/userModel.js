const prisma = require("../config/prisma");

const createUser = async (data) => {
  return await prisma.user.create({
    data,
  });
};

const findUser = async (email) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

const getAllUsers = async () => {
  return await prisma.user.findMany();
};

const updateUser = async (id, data) => {
  return await prisma.user.update({
    where: {
      id,
    },
    data,
  });
};

const deleteUser = async (id) => {
  return await prisma.user.delete({
    where: {
      id,
    },
  });
};

const getUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
};

module.exports = {
  createUser,
  findUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getUserByEmail,
  getUserById,
};
