const Measure = require('../models/measure.model');
const { body, validationResult } = require('express-validator');


exports.get_measureList = async function (req, res) {

  let measureList = await Measure.find({}).sort({name: 'asc'});
  console.log(measureList);
  res.send(measureList);

}


exports.create_measure = [

  body('name').trim()
    .escape(),

  (req, res) => {

    let errors = validationResult(req);

    let newMeasure = new Measure(req.body);

    if (!errors.isEmpty()) {
      console.log(errors);
      res.send(errors);
    }
    else {
      Measure.findOne({name: req.body.name})
        .then(measureFound => {
          if (measureFound) {
            console.log('Medida ya existe');
          }
          else {
            newMeasure.save(err => {
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


exports.delete_measure = async function (req, res) {

  await Measure.findByIdAndDelete(req.params.id);
  let measureList = await Measure.find({}).sort({name: 'asc'});
  res.send(measureList);

}
