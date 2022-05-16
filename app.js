const express = require('express');

const cors = require('cors');

const rateLimit = require('express-rate-limit');

const app = express();

app.use(cors());

const { usersRouter } = require('./routes/user.routes');
const { repairsRouter } = require('./routes/repairs.routes');

app.use(express.json());

const limiter = rateLimit({
  max: 10000, //peticiones
  windowMs: 1 * 60 * 60 * 1000, //1 hr
  message: 'too many request', //mensaje devuelto
});
app.use(limiter);

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/repairs', repairsRouter);

module.exports = { app };
