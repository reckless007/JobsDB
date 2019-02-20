const express = require('express');
const mysql = require('mysql');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var logger = require('morgan');
var cors = require('cors');

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());


var con = mysql.createConnection({
    // properties
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'JobDB'
});
con.connect(function (error) {
    if (!!error) {
        console.log('Error');
    } else {
        console.log('Connected');
    }
    app.post('/add', (req, res) => {
        //res.send('Hello World');

        var Name = req.body.text1;
        var Quali = req.body.quali1;
        var Email = req.body.mail1;
        var Contact = req.body.num1;

        var sql = 'INSERT INTO JobTB (Name,Quali,Contact,Mail) VALUES ("' + Name + '","' + Quali + '","' + Contact + '","' + Email + '")';

        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });

    });
    app.post('/add1', (req, res) => {
        //res.send('Hello World');

        var Company = req.body.text1;
        var Require = req.body.req1;
        var Email = req.body.mail1;

        var sql = 'INSERT INTO JobTB (Company,Requirements,Email) VALUES ("' + Company + '","' + Require + '","' + Email + '")';

        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });

    });
    app.get('/getUser/:id', (req, res) => {


        var sql = `SELECT * FROM JobTB WHERE Quali = "${req.params.id}"`;

        con.query(sql, function (err, result) {
            res.send(result)

            console.log(sql);
        });
    })
    app.get('/getUser1/:id', (req, res) => {


        var sql = `SELECT * FROM CompanyTB WHERE Requirements = "${req.params.id}" `

        con.query(sql, function (err, result) {
            res.send(result)

            console.log(sql);
        });
    })


});
const port1 = process.env.PORT || 3000;
var server = app.listen(port1, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})
