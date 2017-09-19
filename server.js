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
var path = require('path');
var http = require('http');

app.use(express.static('public'));


app.get('/', function(req, res) {
res.sendFile(path.join(__dirname + '/views/home.html'));
});

app.get('/about', function(req, res) {
res.sendFile(path.join(__dirname + '/views/about.html'));
});






/*app.listen(port, function () {
console.log('Express http server listening on ' + port)
console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
})*/

var HTTP_PORT = process.env.port || 8080;

app.listen(process.env.PORT || 8080, function(){
    console.log('listening on', app.port);
});



function onHttpStart() {
console.log("Express http server listening on: " + HTTP_PORT);
}

