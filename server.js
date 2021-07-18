const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');

var recipesRouter = require('./routes/recipes');
var ingredientsRouter = require('./routes/ingredients');
var indexRouter = require('./routes/index');

app.use(express.json());
app.use('/uploads/',express.static('uploads'));
app.use(express.urlencoded({extended:true}));
app.use(cors());

const port = process.env.PORT || 3000;

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

const connection = mysql.createPool({
  host: 'us-cdbr-east-04.cleardb.com',
  user: 'bad8b023ef60ea',
  password: '2e405a5e',
  database: 'heroku_080948200542108',
  debug:'false'
});

app.use('/recipes', recipesRouter);
app.use('/ingredients', ingredientsRouter);
app.use('/', indexRouter);

app.listen(port, () => {
  console.log(`the server is running on port ${port}`);
});


//!!!!

// app.get('/ingredients/:id',(req,res)=>{
//   connection.query('SELECT * FROM ingredient WHERE (recipeID=?)',[req.params.id],(err,response)=>{
//       if(err) throw err;
//       res.json(response);
//   })
// })
// app.get('/ingredients',(req,res)=>{
//   connection.query('SELECT * FROM ingredient',(err,response)=>{
//       if(err) throw err;
//       res.json(response);
//   })
// })


module.exports = app;