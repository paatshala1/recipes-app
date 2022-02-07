const Ingredient = require('../models/ingredient.model');
const { body, validationResult } = require('express-validator');

exports.list_get = async function(req, res, next){
  let ingList = await Ingredient.find({}).sort({name:'asc'});
  // console.log(ingList);
  res.send(ingList);
}


exports.create_ingredient = [
  body('name').trim()
    .isLength({min: 3}).withMessage('Requerido un mínimo de 3 caracteres')
    .escape(),

  body('notes').trim()
  .escape(),

  (req, res) => {
    errors = validationResult(req),
    
    console.log(req.body);
    let newIngredient = new Ingredient(req.body);

    if(!errors.isEmpty()) {
      console.log(errors);
      res.send(errors);
      return
    }
    else {
      Ingredient.findOne({name:req.body.name})
      .then(ingFound => {
        if (ingFound) {
          res.send('Ingrediente ya existe');
        }
        else {
          newIngredient.save(err => {
            if (err) {
              return next(err);
            }
            res.send();
          })
        }
      })
      .catch(err => {
        return next(err);
      })
    }
  }
]

exports.delete_ingredient = async function(req, res) {
  console.log(`ID a eliminar, recibido en server: ${req.params.id}`);
  await Ingredient.findByIdAndDelete(req.params.id);
  let ingList = await Ingredient.find({}).sort({name: 'asc'});
  res.send(ingList);
}

exports.find_get = function(req, res, next) {
  Ingredient.findById(req.params.id)
    .then(ing => {
      console.log(ing.name);
    })
    .catch(err => {
      return next(err);
    })
  res.send('Ingrediente encontrado');
}

exports.update_ingredient = async function(req, res) {
  console.log('SERVER MODIFICATION');
  await Ingredient.findByIdAndUpdate(req.params.id, req.body);
  let ingList = await Ingredient.find({}).sort({name:'asc'});
  res.send(ingList);
}
