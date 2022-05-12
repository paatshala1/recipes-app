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



exports.get_categoryList = async function (req, res) {

  try {
    catList = await Category.find({});
    if (catList) {
      res.send(catList);
      // console.log(catList);
    }
    else {
      console.log('No categorías de recetas');
    }
  }
  catch {
    console.log(err);
  }
}

exports.get_categoryRecipes = async function (req, res) {

  try {
    recipeList = await Category.findOne({_id: req.params.cat});
    if (recipeList) {
      res.send(recipeList);
      console.log(recipeList);
    }
    else {
      res.send('No hay recetas en esta Categoría');
    }
  }
  catch {
    console.log(err);
  }
}


// THIS IS FOR CREATING A CATEGORY...UPLOADING IMAGE
exports.upload_image = async function (req, res) {

  console.log(req.file);
  const uploadResult = await cloudinary.uploader.upload(req.file.path, {width: 300, height: 250, crop: "fill", folder: 'recipe-image'});

  await Recipe.findByIdAndUpdate(req.body.id, {urlPhoto:uploadResult.url, public_id:uploadResult.public_id});
  await fs.unlink(req.file.path);

  res.send({result: 'Photo loaded'});
}


exports.create_category = [


  body('name').trim()
  .escape(),

  async function(req, res) {

    const uploadResult = await cloudinary.uploader.upload(req.file.path, {width: 300, height: 250, crop: "fill", folder: 'category-image'});

    let errors = validationResult(req);

    let newCategory = new Category({
      name: req.body.name,
      imageURL: uploadResult.url,
      route: req.body.route
    });

    if(!errors.isEmpty()) {
      console.log(errors);
      res.send(errors);
      return
    }
    else {
      Category.findOne({name: req.body.name})
        .then(catFound => {
          if (catFound) {
            res.send('Categoría ya existe');
          }
          else {
            newCategory.save(err => {
              if (err) {
                console.log(err);
                return {result: 'Created & uploaded image'}
              }
              res.send();
            })
          }
        })
    }
  }

]


exports.delete_category = async function (req, res) {

  await Category.findByIdAndDelete(req.params.id);
  let catList = await Category.find({}).sort({name: 'asc'});
  res.send(catList);

}


exports.update_category = async function (req, res) {

  await Category.findByIdAndUpdate(req.params.id, req.body);
  let catList = await Category.find({}).sort({name:'asc'});
  res.send(catList);

}
