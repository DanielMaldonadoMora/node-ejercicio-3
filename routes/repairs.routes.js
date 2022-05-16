const express = require('express');

const { repairExist } = require('../middlewares/repairs.middleware');

const {
  getAllRepairs,
  createRepairs,
  getRepairsById,
  updateRepairs,
  deleteRepairs,
} = require('../controllers/repairs.controller');

const {
  protectToken,
  protectEmployee,
} = require('../middlewares/user.middleware');

const router = express.Router();

router.use(protectToken);

router.route('/').get(protectEmployee, getAllRepairs).post(createRepairs);

router
  .use('/:id', repairExist, protectEmployee)
  .route('/:id')
  .get(getRepairsById)
  .patch(updateRepairs)
  .delete(deleteRepairs);

module.exports = { repairsRouter: router };
