const { User } = require('../models/user.model');
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');
const jwt = require('jsonwebtoken');

const userExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: { id, status: 'active' },
    attributes: { exclude: ['password'] },
  });

  if (!user) {
    return next(new AppError('User does not exist with given Id', 404));
  }
  req.user = user;

  next();
});

const protectToken = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('Session invalid', 403));
  }

  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findOne({
    where: { id: decoded.id, status: 'active' },
  });

  if (!user) {
    return next(
      new AppError('The owner of this token is no longer available', 403)
    );
  }

  req.sessionUser = user;
  next();
});

const protectEmployee = catchAsync(async (req, res, next) => {
  if (req.sessionUser.role !== 'employee') {
    return next(new AppError('Acces not granted', 403));
  }
  next();
});

const protectAccountOwner = catchAsync(async (req, res, next) => {
  // desestructuramos estas variables de la req (las obtuvimos en userExists y en protect token)
  const { sessionUser, user } = req;

  if (sessionUser.id !== user.id) {
    return next(new AppError('You do not own this account', 403));
  }
  next();
});

module.exports = {
  userExists,
  protectToken,
  protectEmployee,
  protectAccountOwner,
};
