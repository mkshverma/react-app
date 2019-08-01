const express = require('express')
const helmet = require('helmet')
const path = require('path')
const compression = require('compression')
const app = express()
const api = require('./routes')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./config')
const cluster = require('cluster')

if (cluster.isMaster) {
  cluster.fork()
  // if the worker dies, restart it.
  cluster.on('exit', function (worker) {
    console.log('Worker ' + worker.id + ' died..')
    cluster.fork()
  })
} else {
  mongoose.connect(config.mongoUrl, { useNewUrlParser: true })
    .catch((error) => {
      console.log(error)
    })
  mongoose.connection.on('error', (err) => {
    console.log(err)
  })
  app.use(helmet())
  app.use(compression())
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }))

  // parse application/json
  app.use(bodyParser.json())
  app.set('json spaces', 2)
  app.use('/', express.static(path.join(__dirname, '../dist/DemoApp')))

  app.use('/api', api)

  app.get('/api/*',
    (req, res) => res.status(404).json({
      status: false,
      message: 'Un-Specified URL'
    })
  )

  app.use(    '*',    express.static('dist/DemoApp')  )
  app.use(function (err, req, res, next) {
    if (typeof (err) === 'string') {
      // custom application error
      return res.status(400).json({ message: err })
    }

    if (err.name === 'ValidationError') {
      // mongoose validation error
      return res.status(400).json({ message: err.message })
    }

    if (err.name === 'UnauthorizedError') {
      // jwt authentication error
      return res.status(401).json({ message: 'Invalid Token' })
    }

    // default to 500 server error
    return res.status(500).json({ message: err.message })
  })

  app.listen(config.port, () => console.log(`Example app
     listening on port ${config.port}!`))
}
