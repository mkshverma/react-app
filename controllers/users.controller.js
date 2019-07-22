const Users = require('../models/user.model')
const UserContoller = {
    getUsers: function(req, res){
        Users.find({}, function(err, users){
            if(err) res.status(200).json({status: false, error: err, message: 'Something went wrong'});
            if(!users) res.status(200).json({status: false, message: 'No records found!'});
            res.status(200).json({status: true, users: users});
        });
    }
};

module.exports = UserContoller;