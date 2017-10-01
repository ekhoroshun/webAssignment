var fs = require('fs');


var employees = [];
var departments = [];

var initialize = function() { 

	return new Promise((resolve, reject) => {

		fs.readFile('./employees.json', (err, data) => {

			if(err) reject("unable to read file employees");

			var parsed_employees = JSON.parse(data);
	  		employees = parsed_employees;

			fs.readFile('./departments.json', (err, data) => {

                if(err) reject("unable to read file departments");

			  	var parsed_departments = JSON.parse(data);
			  	departments = parsed_departments;

			  	resolve("Success")
			  	
			});

		});

	});

};

var getEmployeesByStatus = function(status) { 
	console.log("getEmployeesByStatus", status)

    // employees 
	
};

var getAllEmployees = function() { 

    return new Promise((resolve, reject) => {
        if ( employees.length > 0 )
        resolve(employees)
        reject("no results returned")
    })
	//console.log("CALLED", employees)
	//return employees;
	

};

exports.initialize = initialize;
exports.getEmployeesByStatus = getEmployeesByStatus;
exports.getAllEmployees = getAllEmployees;