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
  module.exports.initialize = function() {
    return new Promise(function(resolve, reject) {
        let db = mongoose.createConnection("mongodb://ekhoroshun:cite13ur@ds053778.mlab.com:53778/web322_a6");
        db.on('error', (err) => {
            reject(err); // reject the promise with the provided error
        });
        db.once('open', () => {
            Comment = db.model("comments", commentSchema);
            resolve();
        });
    });
};

module.exports.addComment = (data) => {

    return new Promise(function(resolve, reject) {
        data.postedDate = Date.now();
        let newComment = new Comment(data);
        return newComment.save((err) => {
            if (err) {

                reject("was error to save" + err);
            } else {

                resolve(newComment._id);
            }
        });
    });

};

//return all comments
module.exports.getAllComments = () => {
    return new Promise(function(resolve, reject) {
        return Comment.find()
            .sort({
                postedDate: 1
            })
            .exec()
            .then((comments) => {
                resolve(comments);
            }).catch((err) => {
                reject(err);
            });
    });
}

module.exports.addReply = (data) => {
    return new Promise(function(resolve, reject) {
        data.repliedDate = Date.now();
        Comment.update({
                _id: data.comment_id
            }, {
                $addToSet: {
                    replies: data
                }
            }, {
                multi: false
            })
            .exec()
            .then(() => {
                resolve();
            }).catch((err) => {
                reject(err);
            });
    })
}

