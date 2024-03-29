const router = require('express').Router()
const DefaultController = require('../controllers/default.controller')
const UserController = require('../controllers/users.controller')
const PostController = require('../controllers/posts.contoller')

const authorize = require('../middleware/authorize')
const validator = require('../middleware/validate')

router.post('/login', validator.login(), DefaultController.login)
router.post('/signup', validator.signup(), DefaultController.signup)
router.get('/posts', PostController.getPosts)
router.get('/post/:slug', PostController.getPostBySlug)
router.get('/tags', PostController.getTags)

// will check if jwt-token is authorized
// routes after this middleware will require a valid Authorization Header
router.use(authorize)

router.get('/is-authenticated', function(req,res){
    res.json({auth:true});
})
router.get('/users', UserController.getUsers)
router.post('/user', validator.createUser, UserController.createUser)
router.get('/user/:id', UserController.getUser)
router.put('/user/:id', UserController.updateUser)
router.delete('/user/:id', UserController.deleteUser)
router.get('/me', UserController.getCurrentUser)
router.post('/posts', validator.addPost(), PostController.addPost)
router.put('/posts/:id', validator.addPost(), PostController.updatePost)
router.delete('/posts/:id', PostController.deletePost)

module.exports = router
