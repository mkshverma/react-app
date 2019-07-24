const mongoose = require('mongoose')
const slugify = require('slugify')
const postSchema = new mongoose.Schema({
    title:  String,
    slug : String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    body: String,
    tags: [ String ],
    comments: [{
      body: String,
      date: Date,
      user_id:  {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
      }
    }],
    date: { type: Date, default: Date.now },
    hidden: Boolean
  });

  postSchema.methods.generateSlug = function() { 
    this.slug = slugify(this.title, {
      replacement: '-',    // replace spaces with replacement
      remove: null,        // regex to remove characters
      lower: true          // result in lower case
    })
};
  const Post = mongoose.model('Post', postSchema);
  module.exports = Post;