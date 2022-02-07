const express = require('express');
const router = express.Router();

const levelController = require('../controllers/levelController');


router.get('/list', levelController.get_levelList);

router.post('/create', levelController.create_level);


module.exports = router;
