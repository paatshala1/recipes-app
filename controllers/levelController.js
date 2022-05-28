const Level = require('../models/level.model');
const { body, validationResult } = require('express-validator');



exports.get_levelList = async function (req, res) {

  let levelList = await Level.find({}).sort({_id: 'asc'});
  res.send(levelList);

}

exports.create_level = [

  body('name').trim()
    .escape(),

  (req, res) => {

    let errors = validationResult(req);

    let newLevel = new Level(req.body);

    if (!errors.isEmpty()) {
      console.log(errors);
      return
    }
    else {
      Level.findOne({name: req.body.name})
        .then(levelFound => {
          if (levelFound) {
            res.send('Nivel ya existe');
          }
          else {
            newLevel.save(err => {
              console.log(err);
              res.send(err);
            })
          }
        })
        .catch(err => {
          return next(err);
        })
    }
  }
]


exports.delete_level = async function (req, res) {

  await Level.findByIdAndDelete(req.params.id);
  let levelList = await Level.find({}).sort({_id: 'asc'});
  res.send(levelList);
}


exports.update_level = async function (req, res) {

  await Level.findByIdAndUpdate(req.params.id, req.body);
  const levelList = await Level.find({}).sort({_id: 'asc'});
  res.send(levelList);
}
