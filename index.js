'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var mysql = require('mysql');
var con = mysql.createConnection({
	host: "localhost",
	user: "srmmess",
	password: "srmmess",
	database: "srmmess"
  });

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
//send mess array
app.get('/messNames', function(req, res){
        con.query(`SELECT name FROM mess`, function (err, result, fields) {
            if (err) throw err;
            for (var key in result) {
                messNamesArray.push(result[key].name);
            }
            res.send(JSON.stringify(messNamesArray));
        });
})
// Spin up the server
app.listen(app.get('port'), function () {
	console.log('running on port', app.get('port'))
});
