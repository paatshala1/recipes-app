const mongoose = require('mongoose');

dbUrl = 'mongodb+srv://Recetario:8MumVySanZon@cluster0.hdhaw.mongodb.net/Cooking?retryWrites=true&w=majority';
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', _ =>{
  console.log(`Mongoose has stablished a conexion to mongodb+srv://Recetario`);
});


module.exports = db;
