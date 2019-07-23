const router = require('express').Router()
const DefaultController = require('../controllers/default.controller')
const UserController = require('../controllers/users.controller')

router.post('/login', DefaultController.validate('login'), DefaultController.login)
router.post('/signup', DefaultController.validate('signup'), DefaultController.signup)

// will check if jwt-token is authorized
router.use(DefaultController.authorize)

router.get('/users', UserController.getUsers)

module.exports = router;