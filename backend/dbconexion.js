const mongoose = require('mongoose');
require('dotenv').config();


// dbUrl = process.env.MONGODB_URI;
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', _ =>{
  console.log(`Mongoose has stablished a conexion to mongodb+srv`);
});


module.exports = db;
