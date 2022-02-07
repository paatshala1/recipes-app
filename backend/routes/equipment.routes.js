const express = require('express');
const router = express.Router();

const equipmentController = require('../controllers/equipmentController');


router.get('/list', equipmentController.get_equipmentList);

router.post('/create', equipmentController.create_equipment);


module.exports = router;
