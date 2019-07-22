const express = require('express')
const path = require('path')
const helmet = require('helmet')
const compression = require('compression')
const app = express()
const port = 3000
const api = require('./routes')
const  bodyParser = require('body-parser')
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/blog-app',{useNewUrlParser: true})
.catch(error => {
    console.log(error);
});
mongoose.connection.on('error', err => {
    console.log(err);
});
app.use(helmet())
app.use(compression())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// app.use('/', express.static(path.join(__dirname, 'frontend/build')))

app.use('/api',api);

// app.get('*', (req, res) => res.sendFile(path.join(__dirname+'/frontend/build/index.html')))

app.use(function (err, req, res, next) {
    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json({ message: err });
    }

    if (err.name === 'ValidationError') {
        // mongoose validation error
        return res.status(400).json({ message: err.message });
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).json({ message: 'Invalid Token' });
    }

    // default to 500 server error
    return res.status(500).json({ message: err.message });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))