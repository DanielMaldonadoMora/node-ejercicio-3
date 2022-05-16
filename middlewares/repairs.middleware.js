const { Repair } = require('../models/repairs.model');
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const repairExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const repair = await Repair.findOne({ where: { id } });
  if (!repair) {
    return next(new AppError('Repair not found ', 404));
  }
  req.repair = repair;
  next();
});

module.exports = {
  repairExist,
};
