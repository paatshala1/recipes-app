const { Schema, model } = require('mongoose');

const elementSchema = new Schema({
  ingredient:{type:Schema.Types.ObjectId, ref:'Ingredient', required:true},
  quantity:{type:Number, required:true},
  measure:{type:Schema.Types.ObjectId, ref:'Measure', required:true}
},
{
  versionKey:false
});

module.exports = elementSchema;
