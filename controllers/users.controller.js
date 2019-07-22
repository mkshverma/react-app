const Users = require('../models/user.model')
const UserContoller = {
    getUsers: function(req, res){
        const limit = req.query.limit || 10;
        const offset = req.query.offset || 0;
        Users.find({}).limit(limit).skip(offset).exec(function(err, users){
            if(err) res.status(200).json({status: false, error: err, message: 'Something went wrong'});
            if(!users) res.status(200).json({status: false, message: 'No records found!'});
            res.status(200).json({status: true, users: users});
        });
    },
    addUser: function(req, res){
        // 
    }
};

module.exports = UserContoller;