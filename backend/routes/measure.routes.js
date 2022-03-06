const express = require('express');
const router = express.Router();

const measureController = require('../controllers/measureController');


router.delete('/delete/:id', measureController.delete_measure);

router.get('/list', measureController.get_measureList);

router.post('/create', measureController.create_measure);

module.exports = router;
