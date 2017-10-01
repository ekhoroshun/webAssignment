var fs = require('fs');


var employees = [];
var departments = [];

var initialize = function() { 

	return new Promise((resolve, reject) => {

		fs.readFile('./data/employees.json', (err, data) => {

			if(err) reject("unable to read file employees");

			var parsed_employees = JSON.parse(data);
	  		employees = parsed_employees;

			fs.readFile('./data/departments.json', (err, data) => {

                if(err) reject("unable to read file departments");

			  	var parsed_departments = JSON.parse(data);
			  	departments = parsed_departments;

			  	resolve("Success")
			  	
			});

		});

	});

};

var getEmployeesByDepartment = function(department) {  

    console.log("Department ID recieved", department)

    return new Promise((resolve, reject) => {
        
        var filtered_employees = [];
        for (var i = 0; i < employees.length; i++) { 

            if(employees[i].department == department) {
                filtered_employees.push(employees[i])
            }

        }
        if(filtered_employees.length > 0) {
            resolve(filtered_employees);
        }

        reject("no results returned");

    });
	
};

var getEmployeesByStatus = function(status) {  
    
    console.log("Status recieved", status)

    return new Promise((resolve, reject) => {
        
        var filtered_employees = [];
        for (var i = 0; i < employees.length; i++) { 

            if(employees[i].status == status) {
                filtered_employees.push(employees[i])
            }

        }

        if(filtered_employees.length > 0) {
            resolve(filtered_employees);
        }

        reject("no results returned");

    });
    
};

var getAllEmployees = function() { 

    return new Promise((resolve, reject) => {

        if ( employees.length > 0 ) {
            resolve(employees)
        }

        reject("no results returned");

    });
	
};

var getEmployeesByManager = function(manager) {  
    
    console.log("Manager ID recieved", manager)

    return new Promise((resolve, reject) => {
        
        var filtered_employees = [];
        for (var i = 0; i < employees.length; i++) { 

            if(employees[i].employeeManagerNum == manager) {
                filtered_employees.push(employees[i])
            }

        }
        if(filtered_employees.length > 0) {
            resolve(filtered_employees);
        }

        reject("no results returned");

    });
    
};

var getEmployeeByNum = function(employee) {  
    
    console.log("Employee ID recieved", employee)

    return new Promise((resolve, reject) => {
        
        var filtered_employees = [];
        for (var i = 0; i < employees.length; i++) { 

            if(employees[i].employeeNum == employee) {
                filtered_employees.push(employees[i])
            }

        }
        if(filtered_employees.length > 0) {
            resolve(filtered_employees);
        }

        reject("no results returned");

    });
    
};

var getAllManagers = function(){

    return new Promise((resolve, reject) => {
        
        var filtered_employees = [];
        for (var i = 0; i < employees.length; i++) { 

            if(employees[i].isManager) {
                console.log(">>>", employees[i])
                filtered_employees.push(employees[i])
            }

        }

        console.log("filtered_employees", filtered_employees)
        if(filtered_employees.length > 0) {
            resolve(filtered_employees);
        }

        reject("no results returned");

    });

};

var getAllDepartments = function() { 
    
    return new Promise((resolve, reject) => {

        if ( departments.length > 0 ) {
            resolve(departments)
        }

        reject("no results returned");

    });
    
};

exports.initialize = initialize;
exports.getEmployeesByStatus = getEmployeesByStatus;
exports.getAllEmployees = getAllEmployees;
exports.getEmployeesByDepartment = getEmployeesByDepartment;
exports.getEmployeesByManager = getEmployeesByManager;
exports.getEmployeeByNum = getEmployeeByNum;
exports.getAllManagers = getAllManagers;
exports.getAllDepartments = getAllDepartments;
