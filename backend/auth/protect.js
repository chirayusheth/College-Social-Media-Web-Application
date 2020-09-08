function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.status(400).json('Error: '+err)
    }
}

module.exports = checkAuthentication