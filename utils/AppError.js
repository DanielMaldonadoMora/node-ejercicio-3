class AppError extends Error {
  constructor(message, statusCode) {
    //crear el objeto error para poder extender sus metodos, y le pasamos el mensaje al objeto error base
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    // 4** -> client error -> 'error'
    // 5** -> server error -> 'fail'
    this.status = `${statusCode}`.startsWith('4') ? 'error' : 'fail';
    //metodo poor el que extendimos el objeto error
    //nos trae  todo el paquete de errores
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = { AppError };
