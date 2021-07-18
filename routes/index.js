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
router.get('/', (req, res) => {
  res.send("Hello Again!")
});


module.exports = router;
