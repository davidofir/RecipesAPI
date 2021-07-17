const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// const connection = mysql.createPool({
//     host: 'us-cdbr-east-04.cleardb.com',
//     user: 'bad8b023ef60ea',
//     password: '2e405a5e',
//     database: 'heroku_080948200542108',
//     debug:'false'
// });

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mike_J97w',
    database: 'recipeapp'
});

router.post('/ingredients',(req,res,next)=>{
    connection.query('LAST_INSERT_ID()',(err,result)=>{
        req.lastID = 55;
        next();
    })
},

(req,res)=>{
        req.body.ingredients.map((item,index)=>{
            console.log(item)
        connection.query('INSERT INTO ingredient(recipeID,name,qty,unit) VALUES (?,?,?,?)',[req.lastID,req,item.name,item.qty,item.unit],(err,result)=>{
            if(err) throw err;
            res.sendStatus(200);
        })
})})

module.exports = router;