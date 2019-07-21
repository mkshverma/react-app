const router = require('express').Router()
const DefaultController = require('../controllers/default.controller')

router.get('/', DefaultController.welcome)

module.exports = router;