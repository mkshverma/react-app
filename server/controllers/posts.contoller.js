const { validationResult } = require('express-validator')
const Post = require('../models/post.model')

const PostContoller = {
  // get all posts
  getPosts: function (req, res) {
    const limit = req.query.limit || 10
    const offset = req.query.offset || 0
    const conditions = {}
    if (req.query.author) {
      conditions.author = req.query.author
    }
    if (req.query.tag) {
      conditions.tags = req.query.tag
    }
    Post.find(conditions)
      .limit(limit)
      .skip(offset)
      .populate('author')
      .exec(function (err, posts) {
        if (err) {
          return res.status(200).json({
            status: false,
            error: err,
            message: 'Something went wrong'
          })
        }
        if (!posts.length) {
          return res.status(200).json({
            status: false,
            message: 'No records found!'
          })
        }
        res.status(200).json({
          status: true,
          posts: posts
        })
      })
  },
  // add a Post
  addPost: function (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      })
    }
    const newPost = new Post()
    newPost.title = req.body.title
    newPost.body = req.body.body
    newPost.tags = req.body.tags.split(',')
    newPost.published = req.body.published? req.body.published: false
    newPost.author = req.decoded._id
    newPost.generateSlug()
    console.log(newPost)
    newPost.save(function (err, post) {
      if (err) {
        return res.json({
          error: err.message,
          status: false
        })
      }
      res.json({
        status: true,
        message: 'Post created successfully'
      })
    })
  },
  // add a Post
  updatePost: function (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
        status: false
      })
    }
    Post.findById(req.params.id, function(err, newPost){
      newPost.title = req.body.title
      newPost.body = req.body.body
      newPost.tags = req.body.tags.split(',')
      newPost.published = req.body.published? req.body.published: false
      newPost.save(function (err, post) {
        if (err) {
          return res.json({
            message: err.message,
            status: false
          })
        }
        res.json({
          status: true,
          message: 'Post updated successfully'
        })
      })
    })
  },
  // add a Post
  deletePost: function (req, res) {
    Post.deleteOne({_id:req.params.id}, function(err, deletedPost){
        if (err) {
          return res.json({
            message: err.message,
            status: false
          })
        }
        return res.json({
          status: true,
          message: 'Post deleted successfully'
        })
    })
  },
  // get single post via slug
  getPostBySlug: function (req, res) {
    const slug = req.params.slug
    Post.findOne({ slug: slug })
      .exec(function (err, post) {
        if (err) {
          return res.status(200).json({
            status: false,
            error: err,
            message: 'Something went wrong'
          })
        }
        if (!post) {
          return res.status(200).json({
            status: false,
            message: 'Not found!'
          })
        }
        res.status(200).json({
          status: true,
          post: post
        })
      })
  },
  // get single post via slug
  getTags: function (req, res) {
    Post.distinct('tags')
      .exec(function (err, posts) {
        if (err) {
          return res.status(200).json({
            status: false,
            error: err,
            message: 'Something went wrong'
          })
        }
        res.status(200).json({
          status: true,
          tags: posts
        })
      })
  }
}

module.exports = PostContoller
