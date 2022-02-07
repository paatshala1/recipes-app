const { Schema, model } = require('mongoose');
const elementSchema = require('./element.schema');

// const elementSchema = new Schema({
//   ingredient:{type:Schema.Types.ObjectId, ref:'Ingredient', required:true},
//   quantity:{type:Number, required:true},
//   measure:{type:Schema.Types.ObjectId, ref:'Measure', required:true}
// },
// {
//   versionKey:false
// });

const recipeSchema = new Schema({
  category:{type:Schema.Types.ObjectId, ref:'Category', required:true},
  name:{type:String, required:true},
  description:[{type:String, required:true}],
  elements: [elementSchema],
  instructions:[{type:String, required:true}],
  tips:[{type:String, required:false}],
  equipment:[{  
    type:Schema.Types.ObjectId, ref:'Equipment', required:false
  }],
  urlPhoto:{type:String, required:false},
  level:{type:Schema.Types.ObjectId, ref:'Level', required:true}
},
{
  timestamps:true,
  versionKey:false
});

module.exports = model('Recipe', recipeSchema);
