const DefaultContoller = {
    welcome: function(req, res){
        res.status(200).json({status: true, message: 'Welcome'});
    }
};

module.exports = DefaultContoller;