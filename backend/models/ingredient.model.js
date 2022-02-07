const { Schema, model } = require('mongoose');

const ingredientSchema = new Schema({
  name: {type:String, required:true},
  notes: {type:String, required:false}
},
{
  versionKey:false
});

module.exports = model('Ingredient', ingredientSchema);
