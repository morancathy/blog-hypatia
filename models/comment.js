const {model, Schema}  require('mongoose');

const commentSchema = new Schema({
  name: {type: String, required: true},
  message: {type: String, required: true}
}, {
  timestamps: true
});

module.exports = model('Comment', commentSchema);


//just fyi, comments dont need to know where it belongs, but the blog doees
