const { v4: uuidv4} = require('uuid');
const path = require('path');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: 'public/uploads/',
    filename: (req, file, cb) => {
      cb(null, uuidv4() + path.extname(file.originalname));
    }
});


module.exports = multer({storage: storage});


