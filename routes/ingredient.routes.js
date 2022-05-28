const express = require('express');
const router = express.Router();

const ingredientController = require('../controllers/ingredientController');

router.get('/', ingredientController.list_get);

router.post('/create', ingredientController.create_ingredient);

router.delete('/delete/:id', ingredientController.delete_ingredient);

router.get('/find/:id', ingredientController.find_get);

router.put('/update/:id', ingredientController.update_ingredient)

module.exports = router;
