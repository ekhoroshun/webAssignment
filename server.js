/*********************************************************************************
* WEB322 – Assignment 03
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this
* assignment has been copied manually or electronically from any other source (including web sites) or
* distributed to other students.
*
* Name: Elena Khoroshun Student ID: 101908168 Date: 1/10/2017
*
* Online (Heroku) Link: ________________________________________________________
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

    if(req.query.status) {
        
        dataService.getEmployeesByStatus(req.query.status).then( (resolve) => {
            res.send(resolve);
        }, (reject) => {
            res.send(500);
        } );

    } else if(req.query.department) {

        dataService.getEmployeesByDepartment(req.query.department).then( (resolve) => {
            res.send(resolve);
        }, (reject) => {
            res.send(500);
        } );

    } else if(req.query.manager) {

        dataService.getEmployeesByManager(req.query.manager).then( (resolve) => {
            res.send(resolve);
        }, (reject) => {
            res.send(500);
        } );

    } else {

        dataService.getAllEmployees().then( (response) => {
            res.send(response)
        }, (err) => {
            res.send(500)
        });

    }

});

app.get('/managers', function(req, res) {

    dataService.getAllManagers().then( (resolve) => {
        res.send(resolve);
    }, (reject) => {
        res.send(500);
    } );

});

app.get('/employee/:id', function(req, res) {

    dataService.getEmployeeByNum( req.param('id') ).then( (resolve) => {
        res.send(resolve);
    }, (reject) => {
        res.send(500);
    } );

});

app.get('/departments', function(req, res) {
    
    dataService.getAllDepartments().then( (resolve) => {
        res.send(resolve);
    }, (reject) => {
        res.send(500);
    } );
    
});
    


dataService.initialize().then( (resolve) => {

    app.listen(process.env.PORT || 8080, function() {
        console.log('listening on...', app.get('port') );
    });

})


