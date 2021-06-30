const express = require('express');
const app = express();
//const importData = require("./data.json");
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send("Hello Again!")
});


app.get('/recipes', (req, res) => {
    res.send('recipes');
});


app.listen(port, () => {
    console.log(`the server is running on port ${port}`);
});