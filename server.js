const express = require('express');
const app = express();
const session = require('express-session');
const cors = require('cors');
const mysql = require('mysql2');
const multer = require('multer');
const port = process.env.PORT || 3000;
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/uploads',express.static('uploads'));
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'uploads');
    },
    filename: function(req,file,cb){
        cb(null,Date.now() + file.originalname);
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
const connection = mysql.createConnection({
    host:'localhost',
    user:'newuser',
    password:'Secret123',
    database:'recipes'

})

app.use(cors());

app.get('/recipes',(req,res)=>{
 
    connection.query('SELECT * FROM recipe',(req,resp)=>{
        res.json(resp);
    });

})
app.get('/',(req,res)=>{
    res.send("<h1>Hello Recipe API</1>")
})


app.listen(port,()=>{
    console.log(`the server is running on port ${port}`);
});