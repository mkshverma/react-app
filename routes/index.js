const router = require('express').Router()
const DefaultController = require('../controllers/default.controller')
const UserController = require('../controllers/users.controller')
const PostController = require('../controllers/posts.contoller')

router.post('/login', DefaultController.validate('login'), DefaultController.login)
router.post('/signup', DefaultController.validate('signup'), DefaultController.signup)
router.get('/posts', PostController.getPosts)

// will check if jwt-token is authorized
// routes after this middleware will require a valid Authorization Header
router.use(DefaultController.authorize)

router.get('/users', UserController.getUsers)
router.post('/posts', PostController.validate('addPost'), PostController.addPost)

module.exports = router;