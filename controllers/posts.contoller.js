const { validationResult, body } = require('express-validator');
const Post = require('../models/post.model')
const PostContoller = {
    getPosts: function(req, res){
        const limit = req.query.limit || 10;
        const offset = req.query.offset || 0;
        Post.find({}).limit(limit).skip(offset).exec(function(err, posts){
            if(err) return res.status(200).json({status: false, error: err, message: 'Something went wrong'});
            if(!posts.length) return res.status(200).json({status: false, message: 'No records found!'});
            res.status(200).json({status: true, posts: posts});
        });
    },
    addPost: function(req, res){
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
        let newPost = new Post();
        newPost.title = req.body.title;
        newPost.body = req.body.body;
        newPost.tags = req.body.tags;
        newPost.author = req.decoded._id;
        newPost.generateSlug();
        newPost.save(function(err, post){
            if(err) return res.json({error: err.message, status: false})
            res.json({status: true, message: 'Post created successfully'})
        })
    },
    validate: function(method){
        switch (method) {
            case 'addPost': {
                return [
                    body('title', ['Title is required']).escape().trim().exists(),
                    body('body').exists().escape().trim(),
                    body('tags').toArray(),
                ]
            }
            case 'signup': {
                return [
                    body('firstname', 'Invalid First Name').isString(),
                    body('lastname', 'Invalid Last Name').isString(),
                    body('email',  'A valid Email is required').exists().isEmail(),
                    body('password').exists(),
                    body('confirm-password', 'confirm password must have the same value as the password').exists().custom((value, { req }) => value === req.body.password),
                ]
            }
        }
    }
};

module.exports = PostContoller;