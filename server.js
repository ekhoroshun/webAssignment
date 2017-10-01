/*********************************************************************************
*		WEB322	– Assignment	02
*		I	declare	that	this	assignment	is	my	own	work	in	accordance	with	Seneca		Academic	Policy.		No	part	
*		of	this	assignment	has	been	copied	manually	or	electronically	from	any	other	source	
*		(including	3rd	party	web	sites)	or	distributed	to	other	students.
*	
*		Name: elena khoroshun	Student	ID:	101908168	Date:	18 september 2017
*
*		Online	(Heroku)	Link:	https://lit-retreat-28570.herokuapp.com/
*
********************************************************************************/	
var dataService = require('./data-service.js');

var express = require('express');
var app = express();
var path = require('path');
var http = require('http');

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/home.html'));
});

app.get('/about', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/about.html'));
});

app.get('/employees', function(req, res) {

    dataServer.initialize().then( (resolve) => {
        
        console.log(resolve);

        if(req.query.status) {

            console.log("Filter data by Status")

            /*
            dataServer.getEmployeesByStatus(req.query.status).then( (resolve) => {
                console.log(resolve)
                res.json(resolve)
            }, (reject) => {
                console.log(reject)
            } )
            */

            res.send(200);

        } else if(req.query.department) {

            console.log("Filter data by Department")

            res.send(200);

        } else if(req.query.manager) {

            console.log("Filter data by Manager")

            res.send(200);

        } else {

            var data = dataServer.getAllEmployees();
            console.log("Show all", data)
            res.send(data)

        }

    }, (reject) => {

        res.send(500);

    } );
    /*
    console.log(req.query);

    if(req.query.status) {
        
        console.log("Filter data by Status")
        
    } else if(req.query.department) {
        
        console.log("Filter data by Department")
        
    } else if(req.query.manager) {
        
        console.log("Filter data by Manager")
        
    } else {
        
        console.log("Show all")
        res.sendFile(path.join(__dirname + '/data/employees.json'));

    }
        
    //res.sendFile(path.join(__dirname + '/data/employees.json'));
    */

});

app.get('/employee/:value', function(req, res) {

    res.sendFile(path.join(__dirname + '/data/employee.json'));

});


var HTTP_PORT = process.env.port || 8080;

app.listen(process.env.PORT || 8080, function(){
    console.log('listening on', app.port);
});

function onHttpStart() {
console.log("Express http server listening on: " + HTTP_PORT);
}

