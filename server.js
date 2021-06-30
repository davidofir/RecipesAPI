const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;
//mysql://bad8b023ef60ea:2e405a5e@us-cdbr-east-04.cleardb.com/heroku_080948200542108?reconnect=true
const connection = mysql.createConnection({
    host: 'us-cdbr-east-04.cleardb.com',
    user: 'bad8b023ef60ea',
    password: '2e405a5e',
    database: 'heroku_080948200542108'

})

app.get('/', (req, res) => {
    res.send("Hello Again!")
});


app.get('/recipes', (req, res) => {

    connection.query('SELECT * FROM recipe', (req, resp) => {
        res.json(resp);
    });

})


app.listen(port, () => {
    console.log(`the server is running on port ${port}`);
});