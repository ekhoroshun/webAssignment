const bcrypt = require('bcryptjs');//password encryption
const mongoose = require('mongoose');
let Schema = mongoose.Schema;
//define new schema

var userSchema = new Schema({
    "user": {
        type: String,
        "unique": true
    },
    "password": String,
    
});

let User; // to be defined on new connection (see initialize

//connect to db
module.exports.initialize = function() {
    return new Promise(function(resolve, reject) {
        let db = mongoose.createConnection("mongodb://ekhoroshun:cite13ur@ds163806.mlab.com:63806/web322_a7");
        db.on('error', (err) => {
            reject(err); // reject the promise with the provided error
        });
        db.once('open', () => {
            User = db.model("users", userSchema);
            resolve();
        });
    });
};


module.exports.registerUser = function (userData) 
{
    return new Promise(function (resolve, reject) {
        // .password and .password2 do not match
        if(userData.password !== userData.password2)
        {
            reject("Passwords do not match");
        }
        else
        {
            // replace the user entered password to hashed version
            bcrypt.genSalt(10, function(err, salt) { // Generate a "salt" using 10 rounds 
                bcrypt.hash(userData.password, salt, function(err, hash) { // encrypt the password: "myPassword123"
                    // If there was an error 
                    if(err) {
                        reject("There was an error with encrypting the password");
                    }
                    // TODO: Store the resulting "hash" value in the DB
                    else {
                        userData.password = hash;
                        
                        let newUser = new User(userData);
                        newUser.save( (err) => 
                        {
                            if(err) 
                            {
                               
                                // err.code is 11000 (duplicate key), reject 
                                if(err.code === 11000)
                                    reject("User Name already taken");
                                // err.code is not 11000, reject 
                                else
                                    reject("There was an error creating the user: " + err);
                            } 
                            else 
                            {
                                
                                resolve();
                            }
                        });                    
                    }
                });
            });
        };
    });  
};  

module.exports.checkUser = function (userData) 
{
    return new Promise(function (resolve, reject) 
    {
        User.find({user:userData.user})
        .exec()
        .then((user) => 
        {
            //  comments will be an array of objects.
            // Each object will represent a document that matched the query
            
            // if users is an empty array, reject 
            if(user.length == 0)
                reject("Unable to find user: " + userData.user);
            
            // compare value from the DB and input value 
            var passwd = userData.password;
            if(userData.currentPassword) passwd = userData.currentPassword;
            bcrypt.compare(passwd, user[0].password).then((res) => {
                if( res === false)
                    reject("Unable to find user: " + userData.user);
                else
                    resolve();
            });
            // passwords does not match
            // if(user[0].password != userData.password)
            //     reject("Incorrect Password for user: " + userData.user);
            // // passwords match
            // else
            //     resolve();
        }).catch( (err)=> {

            // return promise and pass the error that was "caught" 
            // during the Comment.find() operation
            if (VERBOSE) console.log("data-service-auth:: checkUser():::fail!" + err);                
            reject("Unable to find user: " + userData.user);
        });

    });

};
