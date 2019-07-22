const router = require('express').Router()
const DefaultController = require('../controllers/default.controller')
const UserController = require('../controllers/users.controller')

router.get('/', DefaultController.welcome)
router.get('/users', UserController.getUsers)

module.exports = router;