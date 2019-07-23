const { validationResult, body } = require('express-validator');
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const config = require('../config')

const DefaultContoller = {
    signup: function(req, res){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
        }
        const { firstname, lastname, email, password } = req.body
        const user = new User({
            name:{
                first: firstname,
                last: lastname
            },
            email: email
        });
        user.setPassword(password)
        user.save(function(err){
            if(err){
                res.status(200).json({status: false, message: err.message});
                return;
            }
            res.status(200).json({status: true, message: 'User created successfully'});
        })
    },

    login: function(req, res){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
        }
        const { email, password } = req.body
        User.findOne({email: email}, function(err, user){
            if(err){
                res.status(200).json({status: false, message: err.message});
                return;
            }
            if(!user){
                res.status(200).json({status: false, message: 'Invalid Email address or password'});
                return;
            }
            if(!user.validPassword(password)){
                res.status(200).json({status: false, message: 'Invalid Email address or password'});
                return;
            }
            let token = jwt.sign(user.toObject(), config.jwtSecret,{expiresIn: 604800});
            res.status(200).json({status: true, token: token, message: 'success'});
        })
    },

    authorize: function(req, res, next){
        let token = req.headers['authorization'];
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
        token = token.slice(7, token.length)
        jwt.verify(token, config.jwtSecret, function(err, decoded) {
          if (err){
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
          }
          req.decoded = decoded
          next();
        });
    },

    validate: function(methodName){
        switch (methodName) {
            case 'login': {
                return [
                    body('email', ['Email is required','Invalid email']).exists().isEmail(),
                    body('password').exists(),
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

module.exports = DefaultContoller;