var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with resource');
  alert('respond with a resource');
  console.log('respond with a resource');
});

module.exports = router;
