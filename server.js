const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');
app.use(cors());
const port = process.env.PORT || 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'newuser',
    password: 'Secret123',
    database: 'recipes'

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