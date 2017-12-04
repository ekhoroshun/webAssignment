//var fs = require('fs');


// var employees = [];
// var departments = [];
// var empCount = 0;

const Sequelize = require('sequelize');

var sequelize = new Sequelize('d2u767tfesl8jp', 'pfsqnmmhjrwyzp', '336d08940f58b4fe6d84d0892bcf323c90f52df993046caac850ea3d550bb3fa', {
    host: 'ec2-23-23-186-157.compute-1.amazonaws.com',
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
    ssl: true
    }
   });
   
   var Employee = sequelize.define('Employee', {
    employeeNum: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: Sequelize.STRING,
    last_name: Sequelize.STRING,
    email: Sequelize.STRING,
    SSN: Sequelize.STRING,
    addressStreet: Sequelize.STRING,
    addresCity: Sequelize.STRING,
    addressState: Sequelize.STRING,
    addressPostal: Sequelize.STRING,
    maritalStatus: Sequelize.STRING,
    isManager: Sequelize.BOOLEAN,
    employeeManagerNum: Sequelize.INTEGER,
    status: Sequelize.STRING,
    department: Sequelize.INTEGER,
    hireDate: Sequelize.STRING
});  

var Department = sequelize.define('Department', {
    departmentId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    departmentName: Sequelize.STRING
});


var initialize = function() { 

    

	return new Promise((resolve, reject) => {
        return new Promise((resolve, reject)=>{
            sequelize.sync().then(()=>{
                resolve();
            }).catch((err)=>{
                reject("unable to sync the database");
            });
        });
    });
};
	// 	fs.readFile('./data/employees.json', (err, data) => {

	// 		if(err) reject("unable to read file employees");

	// 		var parsed_employees = JSON.parse(data);
    //           employees = parsed_employees;
              
              

	// 		fs.readFile('./data/departments.json', (err, data) => {

    //             if(err) reject("unable to read file departments");

	// 		  	var parsed_departments = JSON.parse(data);
    //             departments = parsed_departments;
                  
    //             empCount = employees.length;

	// 		  	resolve("Success")
			  	
	// 		});

	// 	});

	// });



var getEmployeesByDepartment = function(department) {  

    return new Promise((resolve, reject)=>{
        Employee.findAll({
            order: ["employeeNum"],
            where: {
                department: empDepartment
            }
        }).then((data)=>{
            resolve(data);
        }).catch((err)=>{
            reject("no results returned");
        });
    });

    // console.log("Department ID recieved", department)

    // return new Promise((resolve, reject) => {
        
    //     var filtered_employees = [];
    //     for (var i = 0; i < employees.length; i++) { 

    //         if(employees[i].department == department) {
    //             filtered_employees.push(employees[i])
    //         }

    //     }
    //     if(filtered_employees.length > 0) {
    //         resolve(filtered_employees);
    //     }

    //     reject("no results returned");

    // });
	
};

var getEmployeesByStatus = function(status) {  
    
    return new Promise((resolve, reject)=>{
        Employee.findAll({
            order: ["employeeNum"],
            where: {
                status: empStatus
            }
        }).then((data)=>{
            resolve(data);
        }).catch((err)=>{
            reject("no results returned");
        });
    });

    // console.log("Status recieved", status)

    // return new Promise((resolve, reject) => {
        
    //     var filtered_employees = [];
    //     for (var i = 0; i < employees.length; i++) { 

    //         if(employees[i].status == status) {
    //             filtered_employees.push(employees[i])
    //         }

    //     }

    //     if(filtered_employees.length > 0) {
    //         resolve(filtered_employees);
    //     }

    //     reject("no results returned");

    // });
    
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
    
    return new Promise((resolve, reject)=>{        
        Employee.findAll({
            order: ["employeeNum"],
            where: {
                employeeManagerNum: manager
            }
        }).then((data)=>{
            resolve(data);
        }).catch((err)=>{
            reject("no results returned");
        });
    });

    // console.log("Manager ID recieved", manager)

    // return new Promise((resolve, reject) => {
        
    //     var filtered_employees = [];
    //     for (var i = 0; i < employees.length; i++) { 

    //         if(employees[i].employeeManagerNum == manager) {
    //             filtered_employees.push(employees[i])
    //         }

    //     }
    //     if(filtered_employees.length > 0) {
    //         resolve(filtered_employees);
    //     }

    //     reject("no results returned");

    // });
    
};

var getEmployeeByNum = function(employee) {  
    
    return new Promise((resolve, reject)=>{
        Employee.findAll({
            where: {
                employeeNum: num
            }
        }).then((data)=>{
            resolve(data[0]);
        }).catch((err)=>{
            reject("no results returned");
        });
    });

    // console.log("Employee ID recieved", employee)

    // return new Promise((resolve, reject) => {
        
    //     var filtered_employees = [];
    //     for (var i = 0; i < employees.length; i++) { 

    //         if(employees[i].employeeNum == employee) {
    //             filtered_employees.push(employees[i])
    //         }

    //     }
    //     if(
    //         filtered_employees.length >0) {
    //         resolve(filtered_employees);
    //     }

    //     reject("no results returned");

    // });
    
};

var getAllManagers = function(){


    return new Promise((resolve, reject)=>{     
        Employee.findAll({
            where: {
                isManager: true
            }
        }).then((data)=>{
            resolve(data);
        }).catch((err)=>{
            reject("no results returned");
        });
    });


    // return new Promise((resolve, reject) => {
        
    //     var filtered_employees = [];
    //     for (var i = 0; i < employees.length; i++) { 

    //         if(employees[i].isManager) {
    //             console.log(">>>", employees[i])
    //             filtered_employees.push(employees[i])
    //         }

    //     }

    //     console.log("filtered_employees", filtered_employees)
    //     if(filtered_employees.length > 0) {
    //         resolve(filtered_employees);
    //     }

    //     reject("no results returned");

    // });

};

var getAllDepartments = function() { 
    
    // return new Promise((resolve, reject) => {

    //     if ( departments.length > 0 ) {
    //         resolve(departments)
    //     }

    //     reject("no results returned");

    // });
    return new Promise((resolve, reject)=>{
        Department.findAll({
            order: ["departmentId"]
        }).then((data)=>{
            resolve(data);
        }).catch((err)=>{
            reject("no results returned");
        });
    });
    
};

var  addEmployee = function(employeeData) {
    employeeData.isManager = (employeeData.isManager) ? true : false;
    
    for  (let i in employeeData){
        if (employeeData[i]==""){
            employeeData[i]=null;
        }
    }
    
    // return new Promise((resolve, reject) => {
        
    //     empCount++;
    //     console.log(employeeData)
    //     if(employeeData!='undefined') 
    //     {

    //         employeeData.employeeNum = empCount;
    //         employees.push(employeeData);
    //         resolve(employeeData);
    //     }
    //     else
    //       {
    //           reject("no result");
    //       }
    //     })
    return new Promise((resolve, reject)=>{
        Employee.create({
            firstName: employeeData.firstName,
            last_name: employeeData.last_name,
            email: employeeData.email,
            SSN: employeeData.SSN,
            addressStreet: employeeData.addressStreet,
            addresCity: employeeData.addresCity,
            addressState: employeeData.addressState,
            addressPostal: employeeData.addressPostal,
            maritalStatus: employeeData.maritalStatus,
            isManager: employeeData.isManager,
            employeeManagerNum: employeeData.employeeManagerNum,
            status: employeeData.status,
            department: employeeData.department,
            hireDate: employeeData.hireDate
        }).then(()=>{
            resolve();
        }).catch((err)=>{
            reject("unable to create employee");
        });
        
    });
};

var updateEmployee = function (employeeData){

    employeeData.isManager = (employeeData.isManager) ? true : false;
    
    for (let i in employeeData){
        if (employeeData[i] == ""){
            employeeData[i] = null;
        }
    }
    return new Promise((resolve, reject)=>{
        Employee.update({
            firstName: employeeData.firstName,
            last_name: employeeData.last_name,
            email: employeeData.email,
            SSN: employeeData.SSN,
            addressStreet: employeeData.addressStreet,
            addresCity: employeeData.addresCity,
            addressState: employeeData.addressState,
            addressPostal: employeeData.addressPostal,
            maritalStatus: employeeData.maritalStatus,
            isManager: employeeData.isManager,
            employeeManagerNum: employeeData.employeeManagerNum,
            status: employeeData.status,
            department: employeeData.department,
            hireDate: employeeData.hireDate
        }, {
            where: {
                employeeNum: employeeData.employeeNum
            }
        }).then(()=>{
            resolve();
        }).catch((err)=>{
            reject("unable to update employee");
        });
    });   
}
// return new promise((resolve, reject) => {
//     for (var i = 0; i < employees.length; i++){
//         if (employeeNum.employeeData = employees[i].employeeNum)
//         {
//             employees[i] = employeeData;
//         }
//         resolve(employeeData);
//     }


var addDepartment = function (departmentData){
    for (let i in employeeData){
        if (employeeData[i] == ""){
            employeeData[i] = null;
        }
    }
   return new Promise((resolve, reject)=>{
       Department.create({
           departmentName: departmentData.departmentName}).then(()=>{
               resolve();
           }).catch((err)=>{
               reject("unable to create department");
           });
           });
}

var updateDepartment = function(departmentData){
    for (let i in employeeData){
        if (employeeData[i] == ""){
            employeeData[i] = null;
        }
    }
return new promise ((resolve, reject)=>{
    Department.update({
        departmentName: departmentData.departmentName},
        {
            where: {
                departmentId:departmentData.departmentId
            }
        }).then(()=>{
        resolve();
    }).catch((err)=>{
        reject("unable to upd departm");
    });
    });
 
}


var getDepartmentById = function(id){
    return new Promise((resolve, reject)=>{
        Department.findAll({
            where: {
                departmentId: id
            }
        }).then((data)=>{
            resolve(data[0]);
        }).catch((err)=>{
            reject("no results returned");
        });
    });
}

var deleteEmployeeByNum = function(empNum){
    return new Promise((resolve, reject)=>{
        Employee.destroy({
            where: {
                employeeNum: empNum
            }
        }).then(()=>{
            resolve();
        }).catch((err)=>{
            reject("Unable to remove employee / Employee not found");
        });
    });
}
    

exports.initialize = initialize;
exports.getEmployeesByStatus = getEmployeesByStatus;
exports.getAllEmployees = getAllEmployees;
exports.getEmployeesByDepartment = getEmployeesByDepartment;
exports.getEmployeesByManager = getEmployeesByManager;
exports.getEmployeeByNum = getEmployeeByNum;
exports.getAllManagers = getAllManagers;
exports.getAllDepartments = getAllDepartments;
exports.addEmployee = addEmployee;
exports.updateEmployee = updateEmployee;
exports.deleteEmployeeByNum = deleteEmployeeByNum;
exports.getDepartmentById = getDepartmentById;
exports.updateDepartment = updateDepartment;
exports.addDepartment = addDepartment;