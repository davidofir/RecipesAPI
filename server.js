//test


var createError = require('http-errors');
var express = require('express');
const multer = require('multer');
const cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mysql = require('mysql2');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(express.json());
app.use('/uploads/',express.static('uploads'));
app.use(express.urlencoded({extended:true}));
app.use(cors());

const port = process.env.PORT || 3000;


// const connection = mysql.createPool({
//     host: 'us-cdbr-east-04.cleardb.com',
//     user: 'bad8b023ef60ea',
//     password: '2e405a5e',
//     database: 'heroku_080948200542108',
//     debug:'false'
// });


const storage = multer.diskStorage({
  destination: function(req,file,cb){
      cb(null,'uploads');
  },
  filename: function(req,file,cb){
      cb(null, file.originalname);
  }
});

const fileFilter = (req,file,cb) =>{
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
      cb(null,true);
  }else{
      cb(null,false);
  }
}

const upload = multer({storage:storage, limits: {fileSize:1024*1024*5},fileFilter:fileFilter});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.listen(port, () => {
    console.log(`the server is running on port ${port}`);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;





//NEW (not working)







// // //var createError = require('http-errors');
// // var express = require('express');
// // //var path = require('path');
// // //var cookieParser = require('cookie-parser');
// // //var logger = require('morgan');


// // var recipesRouter = require('./routes/recipes');

// // var app = express();

// // // view engine setup
// // //app.set('views', path.join(__dirname, 'views'));
// // //app.set('view engine', 'jade');

// // //app.use(logger('dev'));
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: false }));
// // //app.use(cookieParser());
// // //app.use(express.static(path.join(__dirname, 'public')));

// // app.use('/recipes', recipesRouter);

// // // catch 404 and forward to error handler
// // app.use(function (req, res, next) {
// //   next(createError(404));
// // });

// // // error handler
// // app.use(function (err, req, res, next) {
// //   // set locals, only providing error in development
// //   res.locals.message = err.message;
// //   res.locals.error = req.app.get('env') === 'development' ? err : {};

// //   // render the error page
// //   res.status(err.status || 500);
// //   res.render('error');
// // });

// // module.exports = app;








// // old


// const express = require('express');
// const mysql = require('mysql2');
// const cors = require('cors');
// const multer = require('multer');

// const app = express();

// app.use(express.json());
// app.use('/uploads/', express.static('uploads'));
// app.use(express.urlencoded({extended:true}));
// app.use(cors());

// var recipesRouter = require('./routes/recipes');
// var ingredientsRouter = require('./routes/ingredients');

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// app.use('/recipes', recipesRouter);
// app.use('/ingredients', ingredientsRouter);


// const port = process.env.PORT || 3001;

// const storage = multer.diskStorage({
//     destination: function(req,file,cb){
//         cb(null,'uploads');
//     },
//     filename: function(req,file,cb){
//         cb(null, file.originalname);
//     }
// });

// const fileFilter = (req,file,cb) =>{
//     if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
//         cb(null,true);
//     }else{
//         cb(null,false);
//     }
// }

// const upload = multer({storage:storage, limits: {fileSize:1024*1024*5},fileFilter:fileFilter});

// const connection = mysql.createPool({
//     host: 'us-cdbr-east-04.cleardb.com',
//     user: 'bad8b023ef60ea',
//     password: '2e405a5e',
//     database: 'heroku_080948200542108',
//     debug:'false'
// });


// // var connection = mysql.createConnection({
// //     host: 'localhost',
// //     user: 'root',
// //     password: 'mike_J97w',
// //     database: 'recipeapp'
// // });

// app.listen(port, () => {
//     console.log(`the server is running on port ${port}`);
// });


// app.get('/', (req, res) => {
//     //res.send("Hello Again!")
//     connection.query('SELECT * FROM recipe', (req, resp) => {
//         res.json(resp);
//     });
// });


// // app.get('/recipes', (req, res) => {
// //     connection.query('SELECT * FROM recipe', (req, resp) => {
// //         res.json(resp);
// //     });
// // })
// // app.get('/recipes/imgs',(req,res)=>{
// //     connection.query('SELECT * FROM recipeimg',(req,resp)=>{
// //         res.json(resp)
// //     })
// // })



// // app.post("/upload",upload.fields([{name:"imgs",maxCount:5}]),(req,res,next)=>{
// //     console.log(req.files.imgs);
// //     req.files.imgs.foreach((file)=>{
// //         connection.query('INSERT INTO recipeimg(recipeID,path) VALUES(?,?)',[5,file.path],(err,response)=>{
// //             if(err) throw err;
// //         })
// //     })
// //     res.sendStatus(200);
// // })



// // app.get('/recipes/:id',(req,res)=>{
// //     var recipe;
// //     connection.query('SELECT * FROM recipe WHERE (recipe.recipeID=?)',[req.params.id],(err,response)=>{
// //         if(err) throw err;
// //         recipe = response;
// //         res.json(recipe);
// //     })
// // })



// app.get('/ingredients/:id',(req,res)=>{
//     connection.query('SELECT * FROM ingredient WHERE (recipeID=?)',[req.params.id],(err,response)=>{
//         if(err) throw err;
//         res.json(response);
//     })
// })
// app.get('/ingredients',(req,res)=>{
//     connection.query('SELECT * FROM ingredient',(err,response)=>{
//         if(err) throw err;
//         res.json(response);
//     })
// })



// // app.post('/recipes',(req,res,next)=>{
// //     connection.query('INSERT INTO recipe(title,rating,cooktime,instructions) VALUES(?,?,?,?)',[req.body.title,req.body.rating,req.body.cooktime,req.body.instructions],
// //     (err,resp)=>{
// //         if(err) throw err;
// //         next();
// //     })
// // },(req,res,next)=>{
// //     connection.query('SELECT LAST_INSERT_ID()',(err,result)=>{
// //         console.log(result[0]['LAST_INSERT_ID()']);
// //         req.lastID = result[0]['LAST_INSERT_ID()'];
// //         next();
// //     })
// // }
// // ,(req,res)=>{
// //     for(let i = 0; i < req.body.ingredients.length; i++){
// //         console.log(req.lastID);
// //         connection.query('INSERT INTO ingredient(recipeID,name,qty,unit) VALUES (?,?,?,?)',[req.lastID,req.body.ingredients[i]["name"],req.body.ingredients[i]["qty"],req.body.ingredients[i]["unit"]],(err,result)=>{
// //         res.end();
// //         })
// //         }
// // }
// // )




// // app.post('/ingredients',(req,res,next)=>{
// //     connection.query('LAST_INSERT_ID()',(err,result)=>{
// //         req.lastID = 55;
// //         next();
// //     })
// // },
// // (req,res)=>{
// //         req.body.ingredients.map((item,index)=>{
// //             console.log(item)
// //         connection.query('INSERT INTO ingredient(recipeID,name,qty,unit) VALUES (?,?,?,?)',[req.lastID,req,item.name,item.qty,item.unit],(err,result)=>{
// //             if(err) throw err;
// //             res.sendStatus(200);
// //         })
// // })})

// module.exports = app;