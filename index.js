// imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require("path");
const app = express();
const pantsPath = require('./routes/pants');

// set defaults for content rendering
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.set("static", path.join(__dirname, "static"));
app.use(express.json());
app.use(express.static("/static"))

// load env variables
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME

// set website path
app.use('/find', pantsPath);

// home view
app.get('/', (req, res) => {
    res.send('Hello worllll');
});

// db connection
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.5puig.mongodb.net/${database}?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log("connected to db");
});

const port = process.env.PORT || 3000; 
app.listen(port, () => console.log(`Listening on port ${port}... `))