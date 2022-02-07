const express = require('express');
const router = express.Router();

const recipeController = require('../controllers/recipeController');

router.get('/detail/:id', recipeController.get_recipeDetail);

router.get('/list/:category', recipeController.get_recipeList);

router.post('/create', recipeController.create_recipe);

router.put('/update/:id', recipeController.update_recipe);

router.delete('/delete/:id', recipeController.delete_recipe);

module.exports = router;
