const mongoose = require('mongoose');
let Schema = mongoose.Schema;
//define new schema

var commentSchema = new Schema({
    "authorName":  String,
    "authorEmail": String,
    "subject": String,
    "commentText": String,
    "postedDate": {
        type: Date,
        default: Date.now
      },
    "replies": [{ 
        comment_id: String,  
        authorName: String, 
        authorEmail: String, 
        commentText: String, 
        repliedDate: Date }]
  });
  
  let Comment; // to be defined on new connection (see initialize


  //connect to db
module.exports.initialize = function () {
    return new Promise(function (resolve, reject) {
    let db = mongoose.createConnection("mongodb://ekhoroshun:cite13ur@ds053778.mlab.com:53778/web322_a6");
    db.on('error', (err)=>{
    reject(err); // reject the promise with the provided error
    });
    db.once('open', ()=>{
    Comment = db.model("comments", commentSchema);
    resolve();
    });
    });
   };

var addComment = function(data) {
    return new Promise (function(resolve, reject)
{
    data.postedDate = Date.now();
    let newComment = new Comment(data);
    newComment.save ((err)=>
{if (err){
console.log("fail"+err);
reject;
}
else{
resolve(newComment._id);
}
});
});
};

//return all comments
var getAllComments = function(){
    return new Promise(function(resolve, reject){
        Comment.find()
        .sort({ postedDate : 1 })
        .exec()
        .then((data)=>
    {
        resolve(data);
    }).catch( (err)=>{
        reject(err);
    });
    });
}

var addReply = function(data){
    return new Promise(function(resolve,reject){
data.repliedDate = Date.now();
Comment.update({_id: data.comment_id}
    ,
    { $addToSet: { replies: data } }
    ,
    { multi: false })
.exec()
.then(()=>{
resolve();
}).catch((err)=>{
    reject(err);
});
})
}

exports.addComment = addComment;
exports.getAllComments = getAllComments;
exports.addReply = addReply;