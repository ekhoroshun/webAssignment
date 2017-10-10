/*********************************************************************************
* WEB322 – Assignment 03
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this
* assignment has been copied manually or electronically from any other source (including web sites) or
* distributed to other students.
*
* Name: Elena Khoroshun Student ID: 101908168 Date: 1/10/2017
*
* Online (Heroku) Link: https://lit-retreat-28570.herokuapp.com/
*
********************************************************************************/ 	
var dataService = require('./data-service.js');

var express = require('express');
var app = express();
var path = require('path');
var http = require('http');

const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.engine(".hbs", exphbs({
 extname: ".hbs",
 defaultLayout: 'layout',
 helpers: {
 equal: function (lvalue, rvalue, options) {
 if (arguments.length < 3)
 throw new Error("Handlebars Helper equal needs 2 parameters");
 if (lvalue != rvalue) {
 return options.inverse(this);
 } else {
 return options.fn(this);
 }
 }
 }
}));
app.set("view engine", ".hbs");

app.get('/', function(req, res) {
    // res.sendFile(path.join(__dirname + '/views/home.hbs'));
    res.render("home");
});

app.get('/about', function(req, res) {
    // res.sendFile(path.join(__dirname + '/views/about.hbs'));
    res.render("about");
});

app.get('/employees', function(req, res) {

    if(req.query.status) {
        
        dataService.getEmployeesByStatus(req.query.status).then( (resolve) => {
            //res.send(resolve);
            res.render("employeeList", { data: data, title: "Employees" });
        }, (reject) => {
            res.render("employeeList", { data: {}, title: "Employees" });
           //res.send(500);
        } );

    } else if(req.query.department) {

        dataService.getEmployeesByDepartment(req.query.department).then( (resolve) => {
            res.render("employeeList", { data: data, title: "Employees" });
            
           // res.send(resolve);
        }, (reject) => {
            res.render("employeeList", { data: {}, title: "Employees" });
           // res.send(500);
        } );

    } else if(req.query.manager) {

        dataService.getEmployeesByManager(req.query.manager).then( (resolve) => {
            res.render("employeeList", { data: data, title: "Employees" });
            //res.send(resolve);
        }, (reject) => {
            res.render("employeeList", { data: {}, title: "Employees" });
            
           //res.send(500);
        } );

    } else {

        dataService.getAllEmployees().then( (resolve) => {
            res.render("employeeList", { data: data, title: "Employees" });
           // res.send(response)
            
        }, (err) => {
          // res.send(500)
            res.render("employeeList", { data: {}, title: "Employees" });
        });

    }

});

app.get('/managers', function(req, res) {

    dataService.getAllManagers().then( (resolve) => {
        //res.send(resolve);
    res.render("employeeList", { data: data, title: "Employees (Managers)" });    
    }, (reject) => {
        res.render("employeeList", { data:{}, title: "Employees (Managers)" });
       // res.send(500);
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

        res.render("departmentList", { data: data, title:
            "Departments" });
        //res.send(resolve);
    }, (reject) => {
        //res.send(500);

        res.render("departmentList", { data: {}, title:
        "Departments" });

    } );
    
});
    


dataService.initialize().then( (resolve) => {

    app.listen(process.env.PORT || 8080, function() {
        console.log('listening on...', app.get('port') );
    });

})


