const bcrypt = require('bcryptjs/dist/bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
//Models
const { User } = require('../models/user.model');
const { AppError } = require('../utils/appError');
//Utils
const { catchAsync } = require('../utils/catchAsync');

dotenv.config({ path: './config.env' });

// Listar Usuarios
const getAllUsers = catchAsync(async (req, res) => {
  const users = await User.findAll();
  res.status(200).json({
    users,
  });
});

//crear Usuario
const createUser = catchAsync(async (req, res) => {
  const { name, email, password, role } = req.body;
  const salt = await bcrypt.genSalt(16);
  const hashPassword = await bcrypt.hash(password, salt);
  const newUser = await User.create({
    name,
    email,
    password: hashPassword,
    role,
  });
  res.status(201).json({ status: 'success', newUser });
});

//traer usuario por id
const getUserById = catchAsync(async (req, res) => {
  const { id } = req.params; // { id, postId, comentId }
  //busca algo segun el parametro pasado
  const user = await User.findOne({ where: { id } });

  res.status(200).json({
    user,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  // await User.update({name},{where:{id}})

  const user = await User.findOne({ where: { id } });

  user.update({ name });

  res.status(200).json({ status: 'succes' });
});

const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;

  // await User.update({name},{where:{id}})

  const user = await User.findOne({ where: { id } });

  await user.update({ status: 'deleted' });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate that user exists with given email
  const user = await User.findOne({
    where: { email, status: 'active' },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    console.log(user);
    return next(new AppError('Invalid credentials', 400));
  }

  // Generate JWT
  const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  user.password = undefined;

  res.status(200).json({ token, user });
});

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  login,
};
