var express = require('express');
var router = express.Router();
const mysql = require('mysql2');

// var connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'mike_J97w',
//   database: 'recipeapp'
// });

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with resource');
  // console.log('respond with a resource');
  connection.query('SELECT * FROM recipe', (req, resp) => {
      res.json(resp);
  })
});

module.exports = router;
