const { body, validationResult } = require('express-validator');

const createUserValidations = [
  body('name').notEmpty().withMessage('Debes proporcionar un nombre'),
  body('email')
    .notEmpty()
    .withMessage('Debes proporcionar un email')
    .isEmail()
    .withMessage('correo no valido'),
  body('password')
    .notEmpty()
    .withMessage('Proporciona una contraseña')
    .isLength({ min: 8 })
    .withMessage('Contraseña corta'),
  body('role').notEmpty().withMessage('Debes proporcionar tipo de rol'),
];

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const messages = errors.array().map(error => {
      return error.msg;
      //tambien puedes desestructurar .map({msg}=>msg)
    });
    const errorMsg = messages.join('. ');
    return res.status(400).json({
      status: 'error',
      message: errorMsg,
    });
  }
  next();
};

module.exports = {
  createUserValidations,
  checkValidations,
};
