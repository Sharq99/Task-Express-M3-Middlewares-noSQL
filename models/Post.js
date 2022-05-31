const { model, Schema } = require('mongoose');

const PostSchema = new Schema({
  title: String,
  body: String,
  slug:{
    type:String,
    lowercase: true
  }
});

module.exports = model('Post', PostSchema);
