const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');
require('dotenv/config');

// Middlewares -- Functions that execute when a route is hit
app.use('/post-transactions', () => {
    console.log("Middleware is running.");
});


app.use(cors());
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import Routes
const postsRoute = require('./routes/posts');

app.use('/posts', postsRoute);

app.get('/', (req, res) => {
    res.send('Welcome home.');
});

// Connect to databasee
mongoose.connect(process.env.DB_CONNECTION, 
{ useNewUrlParser: true, useUnifiedTopology: true },
() => console.log('Connected to database!'));

//Start server listening
app.listen(3001);