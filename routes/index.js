const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/*', function(req, res, next) {
  res.send(path.join(__dirname + '/index.html'))
  // res.send(path.join(__dirname + '/angela-kitchen-app/index.html'))

})


module.exports = router;
