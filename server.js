const { app } = require('./app');

//dataBase conection
const { db } = require('./utils/database');

//Database relations
const { Repair } = require('./models/repairs.model');
const { User } = require('./models/user.model');

User.hasMany(Repair);
Repair.belongsTo(User);

//autenticar conexion a db
db.authenticate()
  .then(() => {
    console.log('conection with database succesfull');
  })
  .catch(err => console.log(err));
// sincronizar modelos
db.sync()
  .then(() => {
    console.log('sync with models succesfull');
  })
  .catch(err => console.log(err));

//port
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Express app server running on port: ${PORT}`);
});
