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


app.use('/recipes', recipesRouter);
app.use('/ingredients', ingredientsRouter);
app.use('/', indexRouter);

app.listen(port, () => {
  console.log(`the server is running on port ${port}`);
});

//?

module.exports = app;