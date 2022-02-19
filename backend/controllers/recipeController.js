
const Recipe = require('../models/recipe.model');
const Category = require('../models/category.model');
const { body, validationResult } = require('express-validator');

require('dotenv').config();

const cloudinary = require('cloudinary').v2;
const fs = require('fs-extra');



cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
  
});


exports.get_recipeDetail = async function (req, res) {
  
  let recipeDetail = await Recipe.findById(req.params.id)
    .populate('category')
    .populate({
      path:'equipment',
      model: 'Equipment'})
    .populate({
      path: 'elements.ingredient',
      model: 'Ingredient'
    })
    .populate({
      path: 'elements.measure',
      model: 'Measure'
    })
    .populate('level')
    .sort({name: 'asc'});
  console.log(recipeDetail);
  res.send(recipeDetail);

}


exports.get_recipeList = async function(req, res) {

  
  let category = await Category.findOne({_id: req.params.cat}, 'name');

  let recipeList = await Recipe.find({category: req.params.cat})
    .populate('category')
    .populate({
      path:'equipment',
      model: 'Equipment'})
    .populate({
      path: 'elements.ingredient',
      model: 'Ingredient'
    })
    .populate({
      path: 'elements.measure',
      model: 'Measure'
    })
    .populate('level')
    .sort({name: 'asc'});
  
  // console.log(category.name);
  res.send([recipeList, category.name]);
}


exports.create_recipe = [
  body('category').trim()
    .escape(),
  body('name').trim()
    .isLength({min: 3}).withMessage('Requerido un mínimo de 3 caracteres')
    .escape(),
  body('description').trim()
    .escape(),


  (req, res) => {

    errors = validationResult(req);

    let newRecipe = new Recipe(req.body);
    console.log(newRecipe);

    if(!errors.isEmpty()) {
      console.log(errors);
      res.send(errors);
      return
    }
    else {
      Recipe.findOne({name: req.body.name})
        .then(recipeFound => {
          if (recipeFound) {
            res.send({"result": "RECETA YA EXISTE"});
          }
          else {
            newRecipe.save(err => {
              if (err) {
                console.log(err);
                res.send(err);
              }
              res.send({"result": "RECETA CREADA"});
            })
          }
        })
        .catch(err => {
          return next(err);
        })
    }
  }
]


exports.update_recipe = function (req, res) {
  
}


exports.upload_image = async function (req, res) {

  console.log(req.file);
  const uploadResult = await cloudinary.uploader.upload(req.file.path, {width: 300, height: 250, crop: "fill", folder: 'recipe-image'});

  await Recipe.findByIdAndUpdate(req.body.id, {urlPhoto:uploadResult.url, public_id:uploadResult.public_id});
  await fs.unlink(req.file.path);

  res.send({result: 'Photo loaded'});
}


exports.delete_recipe = async function (req, res) {
  const { id } = req.params;
  // console.log(id);
  const deletedRecipe = await Recipe.findByIdAndDelete(id,);
    console.log(`PUBLIC_ID: ${deletedRecipe.public_id}`);
    
  if (deletedRecipe.public_id && deletedRecipe.public_id.startsWith('recipe-image/')) {
    await cloudinary.uploader.destroy(deletedRecipe.public_id)
  }
  
  res.send({result: 'Receta borrada'});
  
}
