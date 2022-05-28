const { v4: uuidv4} = require('uuid');
const path = require('path');

const multer = require('multer');

const storageForRecipe = multer.diskStorage({
    destination: 'public/uploads/',
    filename: (req, file, cb) => {
      cb(null, uuidv4() + path.extname(file.originalname));
    }
});

const storageForCategory = multer.diskStorage({
  destination: 'public/uploads/',
  filename: (req, file, cb) => {
    cb(null, path.basename(file.originalname) + path.extname(file.originalname));
  }
});


const uploadForRecipe = multer({storage: storageForRecipe})

const uploadForCategory = multer({storage:storageForCategory})


module.exports = {
  uploadForRecipe,
  uploadForCategory
};


