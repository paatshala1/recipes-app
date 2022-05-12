const express = require('express');
const router = express.Router();

const equipmentController = require('../controllers/equipmentController');


router.get('/list', equipmentController.get_equipmentList);

router.post('/create', equipmentController.create_equipment);

router.delete('/delete/:id', equipmentController.delete_equipment);

router.put('/update/:id', equipmentController.update_equipment);


module.exports = router;
