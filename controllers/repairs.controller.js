const { Repair } = require('../models/repairs.model');
const { User } = require('../models/user.model');
const { catchAsync } = require('../utils/catchAsync');
// Listar Usuarios
const getAllRepairs = catchAsync(async (req, res) => {
  const repairs = await Repair.findAll({
    where: { status: 'pending' },
    include: [{ model: User }],
  });
  res.status(200).json({
    repairs,
  });
});

//crear Usuario
const createRepairs = catchAsync(async (req, res) => {
  const { date } = req.body;
  const { sessionUser } = req;
  const newDate = await Repair.create({ date, userId: sessionUser.id });
  res.status(201).json({ newDate });
});

//traer usuario por id
const getRepairsById = catchAsync(async (req, res) => {
  const { id } = req.params; // { id, postId, comentId }
  //busca algo segun el parametro pasado
  const repair = await Repair.findOne({
    where: { id },
  });

  res.status(200).json({
    repair,
  });
});

const updateRepairs = catchAsync(async (req, res) => {
  const { id } = req.params;

  // await User.update({name},{where:{id}})

  const repair = await Repair.findOne({ where: { id } });

  repair.update({ status: 'completed' });

  res.status(200).json({ status: 'succes' });
});

const deleteRepairs = catchAsync(async (req, res) => {
  const { id } = req.params;

  // await User.update({name},{where:{id}})

  const repair = await Repair.findOne({ where: { id } });

  await repair.update({ status: 'cancelled' });
});

module.exports = {
  getAllRepairs,
  createRepairs,
  getRepairsById,
  updateRepairs,
  deleteRepairs,
};
