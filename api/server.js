const express = require('express');
const bodyParser = require('body-parser');

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
 }) 

app.get('/', (req, res) => {
    res.json({"message": "Welcome"});
});

const api = require('./APIroutes');
app.use('/api', api); 



// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

// Configuring the database
