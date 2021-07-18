const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const connection = mysql.createPool({
    host: 'us-cdbr-east-04.cleardb.com',
    user: 'bad8b023ef60ea',
    password: '2e405a5e',
    database: 'heroku_080948200542108',
    debug:'false'
});

// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'mike_J97w',
//     database: 'recipeapp'
// });



app.get('/', (req, res) => {

    connection.query('SELECT * FROM recipe', (req, resp) => {
        res.json(resp);
    });
  
  })
  app.get('/imgs',(req,res)=>{
    connection.query('SELECT * FROM recipeimg',(req,resp)=>{
        res.json(resp)
    })
  })
  // app.post("/upload",upload.fields([{name:"imgs",maxCount:5}]),(req,res,next)=>{
  //     console.log(req.files.imgs);
  
  //     req.files.imgs.foreach((file)=>{
  //         connection.query('INSERT INTO recipeimg(recipeID,path) VALUES(?,?)',[5,file.path],(err,response)=>{
  //             if(err) throw err;
  //         })
  //     })
  
  //     res.sendStatus(200);
  // })
  
  app.get('/:id',(req,res)=>{
    var recipe;
    connection.query('SELECT * FROM recipe WHERE (recipe.recipeID=?)',[req.params.id],(err,response)=>{
        if(err) throw err;
        recipe = response;
        res.json(recipe);
    })
  })
  
  app.get('/ingredients/:id',(req,res)=>{
    connection.query('SELECT * FROM ingredient WHERE (recipeID=?)',[req.params.id],(err,response)=>{
        if(err) throw err;
        res.json(response);
    })
  })
  app.get('/ingredients',(req,res)=>{
    connection.query('SELECT * FROM ingredient',(err,response)=>{
        if(err) throw err;
        res.json(response);
    })
  })
  app.post('/',(req,res,next)=>{
    connection.query('INSERT INTO recipe(title,rating,cooktime,instructions) VALUES(?,?,?,?)',[req.body.title,req.body.rating,req.body.cooktime,req.body.instructions],
    (err,resp)=>{
        if(err) throw err;
        next();
    })
  },(req,res,next)=>{
    connection.query('SELECT LAST_INSERT_ID()',(err,result)=>{
        console.log(result[0]['LAST_INSERT_ID()']);
        req.lastID = result[0]['LAST_INSERT_ID()'];
        next();
    })
  }
  ,(req,res)=>{
    for(let i = 0; i < req.body.ingredients.length; i++){
        console.log(req.lastID);
        connection.query('INSERT INTO ingredient(recipeID,name,qty,unit) VALUES (?,?,?,?)',[req.lastID,req.body.ingredients[i]["name"],req.body.ingredients[i]["qty"],req.body.ingredients[i]["unit"]],(err,result)=>{
        res.end();
        })
        }
  }
  )




// router.get('/', (req, res) => {
//     connection.query('SELECT * FROM recipe', (req, resp) => {
//         res.json(resp);
//     })
//     //console.log("got recipes")
// })

// router.get('/sorted', (req, res) => {
//     connection.query('SELECT * FROM recipe ORDER BY creation_date DESC', (req, resp) => {
//         res.json(resp);
//     });
// })

// router.get('/sortedRating', (req, res) => {
//     connection.query('SELECT * FROM recipe ORDER BY rating DESC', (req, resp) => {
//         res.json(resp);
//     });
// })

// router.get('/imgs',(req,res)=>{
//     //res.send("IMGS");
//     connection.query('SELECT * FROM recipeimg',(req,resp)=>{
//         res.json(resp)
//     })
// })

// router.get('/:id',(req,res)=>{
//     var recipe;
//     connection.query('SELECT * FROM recipe WHERE (recipe.recipeID=?)',[req.params.id],(err,response)=>{
//         if(err) throw err;
//         recipe = response;
//         res.json(recipe);
//     })
// })

// router.post('/recipes',(req,res,next)=>{
//     connection.query('INSERT INTO recipe(title,rating,cooktime,instructions) VALUES("FOOD 2","5","30","COOK THEM!");')
//     // connection.query('INSERT INTO recipe(title,rating,cooktime,instructions) VALUES(?,?,?,?)',[req.body.title,req.body.rating,req.body.cooktime,req.body.instructions],
//     // (err,resp)=>{
//     //     if(err) throw err;
//     //     next();
//     // })
// })

// // ,
// // (req,res,next)=>{
// //     connection.query('SELECT LAST_INSERT_ID()',(err,result)=>{
// //         console.log(result[0]['LAST_INSERT_ID()']);
// //         req.lastID = result[0]['LAST_INSERT_ID()'];
// //         next();
// //     })
// // },
// // (req,res)=>{
// //     for(let i = 0; i < req.body.ingredients.length; i++){
// //         console.log(req.lastID);
// //         connection.query('INSERT INTO ingredient(recipeID,name,qty,unit) VALUES (?,?,?,?)',[req.lastID,req.body.ingredients[i]["name"],req.body.ingredients[i]["qty"],req.body.ingredients[i]["unit"]],(err,result)=>{
// //         res.end();
// //         })
// //         }
// // }
// // )

module.exports = router;
