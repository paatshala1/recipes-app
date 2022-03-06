const Equipment = require('../models/equipment.model');
const { body, validationResult } = require('express-validator');


exports.get_equipmentList = async function (req, res) {

  let equipList = await Equipment.find({}).sort({name: 'asc'});
  console.log(equipList);
  res.send(equipList);

}


exports.create_equipment = [

  body('name').trim()
    .escape(),

  (req, res) => {

    let errors = validationResult(req);

    let newEquipment = new Equipment(req.body);

    if (!errors.isEmpty()) {
      console.log(errors);
      res.send(errors);
      return
    }
    else {
      Equipment.findOne({name: req.body.name})
        .then(equipFound => {
          if (equipFound) {
            console.log('Equipo ya existe');
            res.send('Equipo ya existe');
          }
          else {
            newEquipment.save(err => {
              if (err) {
                return next(err);
              }
              res.send()
            })
          }
        })
    }
  }

]


exports.delete_equipment = async function (req, res) {

  await Equipment.findByIdAndDelete(req.params.id);
  let equipList = await Equipment.find({}).sort({name: 'asc'});
  res.send(equipList);

}
