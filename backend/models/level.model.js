const { Schema, model } = require('mongoose');

const levelSchema = new Schema({
  name:{type:String, required:true}
},
{
  versionKey:false
});

module.exports = model('Level', levelSchema);
