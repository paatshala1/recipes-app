const Category = require('../models/category.model');
const { body, validationResult } = require('express-validator');


exports.get_categoryList = async function (req, res) {

  try {
    catList = await Category.find({});
    if (catList) {
      res.send(catList);
      console.log(catList);
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


exports.create_category = [

  body('name').trim()
    .escape(),

  (req, res) => {

    let errors = validationResult(req);

    let newCategory = new Category(req.body);

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
                return
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
