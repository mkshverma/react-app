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

router.get('/users', UserController.getUsers)
router.post('/posts', validator.addPost(), PostController.addPost)

module.exports = router
