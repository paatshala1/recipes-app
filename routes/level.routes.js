const express = require('express');
const router = express.Router();

const levelController = require('../controllers/levelController');


router.delete('/delete/:id', levelController.delete_level);

router.get('/list', levelController.get_levelList);

router.post('/create', levelController.create_level);

router.put('/update/:id', levelController.update_level);


module.exports = router;
