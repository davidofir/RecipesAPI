const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;



app.get('/', (req, res) => {
    res.send("Hello Again!")
});


app.get('/recipes', (req, res) => {

    res.json({recipe:"pasta"})

})


app.listen(port, () => {
    console.log(`the server is running on port ${port}`);
});