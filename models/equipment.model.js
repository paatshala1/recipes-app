const { Schema, model } = require('mongoose');

const equipmentSchema = new Schema({
  name:{type:String, required:true}
},
{
  versionKey:false
});

module.exports = model('Equipment', equipmentSchema);
