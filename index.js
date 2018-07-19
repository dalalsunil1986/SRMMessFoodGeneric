'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.set('port', (process.env.PORT || 2050))

//serve static files in the public directory
app.use(express.static('public'));

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
	extended: false
}));

// Process application/json
app.use(bodyParser.json());


// Index route
app.get('/', function (req, res) {
	res.send('Hello world, I am a generic API')
});
// Spin up the server
app.listen(app.get('port'), function () {
	console.log('running on port', app.get('port'))
});
