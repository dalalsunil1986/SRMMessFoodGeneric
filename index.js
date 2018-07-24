'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var mysql = require('mysql');
var con = mysql.createConnection({
	host: "13.127.11.236",
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
        var messNamesArray = [];
        if (err) throw err;
        for (var key in result) {
            messNamesArray.push(result[key].name);
        }
        res.setHeader(`Access-Control-Allow-Origin` , `*`);
        res.setHeader(`Access-Control-Allow-Methods`, `POST, GET, OPTIONS, PUT`);
        res.send(JSON.stringify(messNamesArray));
    });
})
//send particular day
app.get('/:messName/:day', function(req, res){
    var messName = req.params.messName;
    var day = req.params.day;
    con.query(`SELECT * FROM ${messName} where day = '${day}'`, function (err, result, fields) {
        var messNamesArray = [];
        if (err) throw err;
        for (var key in result) {
            messNamesArray.push(result[key].breakfast);
            messNamesArray.push(result[key].lunch);
            messNamesArray.push(result[key].snacks);
            messNamesArray.push(result[key].dinner);
        }
        res.setHeader(`Access-Control-Allow-Origin` , `*`);
        res.setHeader(`Access-Control-Allow-Methods`, `POST, GET, OPTIONS, PUT`);
        res.send(JSON.stringify(messNamesArray));
    });
})//send particular day
app.post('/feedback', function(req, res){
    var messName = req.body.messName;
    var feedback = req.body.feedback;
    con.query(`insert into feedback(MessName,Feedback) VALUES('${messName}','${feedback}')`, function (err, result, fields) {
        //res.setHeader(`Access-Control-Allow-Origin` , `*`);
        //res.setHeader(`Access-Control-Allow-Methods`, `POST, GET, OPTIONS, PUT`);
        res.send("1");
    });
})
// Spin up the server
app.listen(app.get('port'), function () {
	console.log('running on port', app.get('port'))
});
