/*********************************************************************************
*		WEB322	– Assignment	02
*		I	declare	that	this	assignment	is	my	own	work	in	accordance	with	Seneca		Academic	Policy.		No	part	
*		of	this	assignment	has	been	copied	manually	or	electronically	from	any	other	source	
*		(including	3rd	party	web	sites)	or	distributed	to	other	students.
*	
*		Name: elena khoroshun	Student	ID:	101908168	Date:	18 september 2017
*
*		Online	(Heroku)	Link:	https://calm-dawn-61855.herokuapp.com/
*
********************************************************************************/	

var express = require('express');
var app = express();
var path = require('path');

app.use(express.static('public'));


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/home.html'));
});

app.get('/about', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/about.html'));
});


var port = process.env.port || 8080;

app.listen(port, function () {
  console.log('Express http server listening on ' + port)
})