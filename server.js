/*********************************************************************************
 * WEB322 – Assignment 05
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this
 * assignment has been copied manually or electronically from any other source (including web sites) or
 * distributed to other students.
 *
 * Name: Elena Khoroshun Student ID: 101908168 Date: 08/12/2017
 *
 * Online (Heroku) Link: https://lit-retreat-28570.herokuapp.com/
 *
 ********************************************************************************/
var dataService = require('./data-service.js');
const dataServiceComments = require("./data-service-comments.js");

var express = require('express');
var app = express();
var path = require('path');
var http = require('http');
const pg = require('pg');
const Sequelize = require("sequelize");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
var HTTP_PORT = process.env.PORT || 8080;

app.use(express.static('public'));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.engine(".hbs", exphbs({
    extname: ".hbs",
    defaultLayout: 'layout',
    helpers: {
        equal: function(lvalue, rvalue, options) {
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

    if (req.query.status) {

        dataService.getEmployeesByStatus(req.query.status).then((resolve) => {
            //res.send(resolve);
            res.render("employeeList", {
                data: resolve,
                title: "Employees"
            });
        }, (reject) => {
            res.render("employeeList", {
                data: null,
                title: "Employees"
            });
            res.send(500);
        });

    } else if (req.query.department) {

        dataService.getEmployeesByDepartment(req.query.department).then((resolve) => {
            res.render("employeeList", {
                data: resolve,
                title: "Employees"
            });

            // res.send(resolve);
        }, (reject) => {
            res.render("employeeList", {
                data: null,
                title: "Employees"
            });
            res.send(500);
        });

    } else if (req.query.manager) {

        dataService.getEmployeesByManager(req.query.manager).then((resolve) => {
            res.render("employeeList", {
                data: resolve,
                title: "Employees"
            });
            //res.send(resolve);
        }, (reject) => {
            res.render("employeeList", {
                data: null,
                title: "Employees"
            });

            res.send(500);
        });

    } else {

        dataService.getAllEmployees().then((resolve) => {
            res.render("employeeList", {
                data: resolve,
                title: "Employees"
            });
            // res.send(response)

        }, (err) => {
            res.send(500)
            res.render("employeeList", {
                data: null,
                title: "Employees"
            });
        });

    }

});

app.get('/managers', function(req, res) {

    dataService.getAllManagers().then((resolve) => {
        //res.send(resolve);
        res.render("employeeList", {
            data: resolve,
            title: "Employees (Managers)"
        });
    }, (reject) => {
        res.render("employeeList", {
            data: null,
            title: "Employees (Managers)"
        });
        res.send(500);
    });

});

app.get('/employee/', function(req, res) {

    dataService.getEmployeeByNum(req.param('id')).then((resolve) => {
        res.send(resolve);
    }, (reject) => {
        res.sendStatus(500);
    });

});

app.get('/departments', function(req, res) {

    dataService.getAllDepartments().then((resolve) => {

        res.render("departmentList", {
            data: resolve,
            title: "Departments"
        });
        //res.send(resolve);
    }, (reject) => {
        res.send(500);

        res.render("departmentList", {
            data: null,
            title: "Departments"
        });

    });

});






app.get("/departments/add", (req, res)=>{
    res.render("addDepartment");
});//new

app.post("/departments/add", (req, res)=>{
    dataService.addDepartment(req.body).then(()=>{
        res.redirect("/departments");
    }).catch((err)=>{
        res.json(err);
    });
});//new

app.post("/department/update", (req, res)=>{
    dataService.updateDepartment(req.body).then(()=>{
        res.redirect("/departments");
    }).catch((err)=>{
        res.json(err);
    });
});

app.get("/department/:departmentId", (req,  res)=>{
    dataService.getDepartmentById(req.params.departmentId).then((data)=>{
        res.render("department", {data: data});
    }).catch(()=>{
        res.status(404).send("Department Not Found");
    });
});

//EMPLOYEES

app.get("/employees/add", (req, res)=>{
    dataService.getAllDepartments().then((data)=>{
        res.render("addEmployee", {departments: data});
    }).catch((err)=>{
        res.render("addEmployee", {departments: []});
    });
});

app.post("/employees/add", (req, res) => {

  dataService.addEmployee(req.body).then(()=> {
         res.redirect("/employees");

    })
});


app.get("/employee/delete/:empNum", (req, res)=>{
    dataService.deleteEmployeeByNum(req.params.empNum).then(()=>{
        res.redirect("/employees");
    }).catch((err)=>{
        res.status(500).send(err);
    });
});


app.get("/employee/:empNum", (req, res) => {
    // initialize an empty object to store the values
    let viewData = {};
    dataService.getEmployeeByNum(req.params.empNum)
        .then((data) => {

            viewData.data = data; //store employee data in the "viewData" object as "data"

        }).catch(() => {

            viewData.data = null; // set employee to null if there was an error

        }).then(dataService.getDepartments).then((data) => {

            viewData.departments = data; // store department data in the "viewData" object as "departments"

            // loop through viewData.departments and once we have found the departmentId that matches
            // the employee's "department" value, add a "selected" property to the matching
            // viewData.departments object
            for (let i = 0; i < viewData.departments.length; i++) {
                if (viewData.departments[i].departmentId == viewData.data.department) {
                    viewData.departments[i].selected = true;
                }
            }
        }).catch(() => {
            viewData.departments = []; // set departments to empty if there was an error
        }).then(() => {
            if (viewData.data == null) { // if no employee - return an error
                res.status(404).send("Employee Not Found");
            } else {

                res.render("employee", {data: viewData.data});

            }
        });
});

/*
app.post("/department/update", (req, res)=>{
    dataService.updateDepartment(req.body).then(()=>{
        res.redirect("/departments");
    }).catch((err)=>{
        res.json(err);
    });
});
*/

app.post("/employee/update", (req, res) => {

    dataService.updateEmployee(req.body).then(()=>{
        res.redirect("/employees");
    }).catch((err)=>{
        res.status(404).send("Employee cant be upd");
    });
});


app.post("/about/addComment", (req, res)=>{
    dataServiceComments.addComment(req.body).then(()=>
{
    res.redirect("/about");
}).catch((err)=>
{
    console.log(err);
});
});

app.post("/about/addReply", (req, res)=> {
    dataServiceComments.addReply(req.body).then(()=>
    {
        res.redirect("/about");
    }).catch((err)=>
    {
        console.log(err);
    });
    });

app.get("/about", function (req, res) {
    dataServiceComments.getAllComments().then( (dataFromPromise)=>
{
    res.render("about", {data: dataFromPromise});
})
.catch ((err)=>
{
    res.render("about");
})
})
// dataService.initialize().then( (resolve) => {
   
//     app.listen(HTTP_PORT, function() {
//         console.log('listening on...', HTTP_PORT );
//     });

// });

app.use((req, res)=>{
    res.status(404).send("Page Not Found");
});

dataService.initialize()
.then(dataServiceComments.initialize())
.then(()=>{
    app.listen(HTTP_PORT, () =>{
        console.log("server listening on " + HTTP_PORT);
    }); 
}).catch((err)=>{
    console.log("unable to start data_service");
});


