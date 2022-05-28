const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/*', function(req, res, next) {
  res.send(path.join(__dirname + '/client/dist/index.html'))

})


module.exports = router;
