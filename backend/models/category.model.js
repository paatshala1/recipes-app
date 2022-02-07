const { model, Schema } = require('mongoose');

const categorySchema = new Schema({
  
  name:{type: String, required: true},
  imageURL:{type: String, required: false},
  route:{type: String, required: true}
},
{
  versionKey: false
});

module.exports = model('Category', categorySchema);
