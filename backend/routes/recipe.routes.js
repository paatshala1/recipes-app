const express = require('express');
const router = express.Router();



const recipeController = require('../controllers/recipeController');


// Routes to delete config related to recipes
router.get('/category/:id', recipeController.canDeleteCategory);

router.get('/level/:id', recipeController.canDeleteLevel);




// Recipes routes
router.get('/detail/:id', recipeController.get_recipeDetail);

router.post('/detail/:id/upload', recipeController.upload_image);

router.get('/list/:cat', recipeController.get_recipeList);

router.post('/create', recipeController.create_recipe);

router.put('/update/:id', recipeController.update_recipe);

router.delete('/delete/:id', recipeController.delete_recipe);


module.exports = router;
