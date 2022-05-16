const express = require('express');

const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  login,
} = require('../controllers/user.controller');

//Middlewares
const {
  userExists,
  protectToken,
  protectEmployee,
  protectAccountOwner,
} = require('../middlewares/user.middleware');

const {
  createUserValidations,
  checkValidations,
} = require('../middlewares/validations.middlewares');

const router = express.Router();

router.post('/', createUserValidations, checkValidations, createUser);
router.post('/login', login);

router.use(protectToken);

router.get('/', protectEmployee, getAllUsers);

router
  .use('/:id', userExists)
  .route('/:id')
  .get(protectEmployee, getUserById)
  .patch(protectAccountOwner, updateUser)
  .delete(protectAccountOwner, deleteUser);

module.exports = { usersRouter: router };
