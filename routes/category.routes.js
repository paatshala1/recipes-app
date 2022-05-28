const express = require('express');
const router = express.Router();

const { uploadForCategory } = require('../libs/multer')

const categoryController = require('../controllers/categoryController');


router.post('/create', uploadForCategory.single('catImage'), categoryController.create_category);

router.get('/list', categoryController.get_categoryList);

router.get('/list/:cat', categoryController.get_categoryRecipes);

router.delete('/delete/:id', categoryController.delete_category);

router.put('/update/:id', categoryController.update_category);


module.exports = router;
