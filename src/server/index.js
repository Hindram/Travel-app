// Setup empty JS object to act as endpoint for all routes
const dotenv = require('dotenv');
dotenv.config();
let projectData = {};
// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();
var path = require('path');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

// GET
app.get('/getAll', function(req, res) {
    res.send(projectData);
})
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})
app.get('/test_server', function (req, res) {
    res.status(200).json({
        message: 'Welcome to the travel planner app!'
    });
});

// POST
app.post('/addEntry', function (req, res) {
    let entry = req.body;
    projectData["temperature"] = entry.temperature; 
    projectData["userResponse"] = entry.userResponse;
    projectData["date"] = entry.date;
    res.send('POST received');
});

app.listen(4000, function () {
    console.log('Example app listening on port 4000!')
});


module.exports = app
