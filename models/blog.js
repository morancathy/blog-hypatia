const {model, Schema} = require('mongoose');  //need to require, but already installed

// Make schema - bouncer at the club
const blogSchema = new Schema({
  title: {type: String, required: true, unique: true},    //requirements
  body: String,
  comments: [ {type: Schema.Types.ObjectId, ref: 'Comment'} ]

}, {
  timestamps: true                                       //options
});

module.exports = model('Blog', blogSchema)  //dont ever change 'Blog'


/*how to  connect "one to many" models.
Data will exists in comment.js, but id is stored in this database */

//dont have to 'import' Comment; mongoose takes care of it with "ref:'Comment'"
