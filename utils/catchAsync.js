//hacer todo esto es para poder usar el .catch en funciones con asyn await
//y asi limpiar mas el codigo
const catchAsync = fn => {
  return (req, res, next) => {
    //fn(req,res,next).catch(err=>next(err))  lo de abajo es igual
    fn(req, res, next).catch(next);
  };
};

module.exports = { catchAsync };
