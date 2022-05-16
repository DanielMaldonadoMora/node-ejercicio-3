const { Sequelize } = require('sequelize');
//sequelize para conectar con la base de datos de postgress solo una vez
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const db = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  port: 5432,
  logging: false,
});

module.exports = { db };
