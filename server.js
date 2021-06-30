const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');
app.use(cors());
app.use(express.json());
app.use('/uploads/',express.static('uploads'));
const multer = require('multer');
app.use(express.urlencoded({extended:true}));
const port = process.env.PORT || 3000;
const connection = mysql.createPool({
    host: 'us-cdbr-east-04.cleardb.com',
    user: 'bad8b023ef60ea',
    password: '2e405a5e',
    database: 'heroku_080948200542108',
    debug:'false'

});

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

app.get('/', (req, res) => {
    res.send("Hello Again!")
});


app.get('/recipes', (req, res) => {

    connection.query('SELECT * FROM recipe', (req, resp) => {
        res.json(resp);
    });

})

app.post("/upload",upload.fields([{name:"recipeImages",maxCount:5}]),(req,res,next)=>{
    console.log(req.files);
    req.files.forEach((file)=>{
        connection.query('INSERT INTO recipeimg(recipeID,path) VALUES(?,?)',[5,file.path],(err,resp)=>{
            if(err) throw err;
        });
    })
})

app.listen(port, () => {
    console.log(`the server is running on port ${port}`);
});