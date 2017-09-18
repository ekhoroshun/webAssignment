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

var express = require('express');

var app = express();
var http = require('http');
var url = require('url');
var HTTP_PORT = process.env.PORT || 8080;

var path = require('path');

app.use(express.static("public"));
//app.use('public', express.static(__dirname + 'public'));
// call this function after the http server starts listening for requests

function onHttpStart() {
 console.log("Express http server listening on: " + HTTP_PORT);
}
// setup a 'route' to listen on the default url path (http://localhost)
app.get("/", function(req, res){
res.sendFile(path.join(__dirname + '/home.html'));
//res.render('home');
  });

// setup another route to listen on /about
app.get("/about", function(req, res){
 //res.render('about');
 res.sendFile(path.join(__dirname + '/about.html'));
});

// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, onHttpStart);