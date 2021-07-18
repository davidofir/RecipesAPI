var express = require('express');
var router = express.Router();
const mysql = require('mysql2');

const connection = mysql.createPool({
  host: 'us-cdbr-east-04.cleardb.com',
  user: 'bad8b023ef60ea',
  password: '2e405a5e',
  database: 'heroku_080948200542108',
  debug:'false'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  connection.query('SELECT * FROM recipe', (req, resp) => {
    res.json(resp);
  });
});

/* GET home page. */
router.get('/sorted', function(req, res, next) {
  connection.query('SELECT * FROM recipe ORDER BY creation_date DESC', (req, resp) => {
    res.json(resp);
  });
});

module.exports = router;
