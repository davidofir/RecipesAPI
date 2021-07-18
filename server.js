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
var recipesRouter = require('./routes/recipes');
var ingredientsRouter = require('./routes/ingredients');

var app = express();

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
app.use('/recipes', recipesRouter);
app.use('/ingredients', ingredientsRouter);


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