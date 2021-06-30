const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
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

app.listen(port, () => {
    console.log(`the server is running on port ${port}`);
});

app.get('/', (req, res) => {
    res.send("Hello Again!")
});


app.get('/recipes', (req, res) => {

    connection.query('SELECT * FROM recipe', (req, resp) => {
        res.json(resp);
    });

})
app.get('/recipes/imgs',(req,res)=>{
    connection.query('SELECT * FROM recipeimg',(req,resp)=>{
        res.json(resp)
    })
})
app.post("/upload",upload.fields([{name:"imgs",maxCount:5}]),(req,res,next)=>{
    console.log(req.files.imgs);

    req.files.imgs.foreach((file)=>{
        connection.query('INSERT INTO recipeimg(recipeID,path) VALUES(?,?)',[5,file.path],(err,response)=>{
            if(err) throw err;
        })
    })

    res.sendStatus(200);
})

app.get('/recipes/:id',(req,res)=>{
    var recipe;
    connection.query('SELECT * FROM recipe WHERE (recipe.recipeID=?)',[req.params.id],(err,response)=>{
        if(err) throw err;
        recipe = response;
        res.json(recipe);
    })
})