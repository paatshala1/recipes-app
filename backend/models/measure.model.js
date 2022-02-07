const { Schema, model } = require('mongoose');

const measureSchema = new Schema({
  name:{type:String, required:true}
},
{
  versionKey:false
});

module.exports = model('Measure', measureSchema);
