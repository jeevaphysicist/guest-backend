const jwt = require('jsonwebtoken');

// verify cookies created token is correct or not 
exports.verifytoken = (req,res,next)=>{
    const token = req.cookies.Access_token;
    console.log("tokens",token);
    if(!token){
        return res.status(401).json({
            message:"user not authenticated"
        })
    }
    jwt.verify(token,process.env.JWT,(err,user)=>{
        if(err){
            return res.status(402).json({
                message:"token is not valid"
            })
        }
       req.userdata = user ;
       next();
    });
}

// verify user by using cookies
exports.verifyUser = (req,res,next)=>{
    this.verifytoken(req,res, ()=>{
        // console.log(req.userdata.id ,  req.params.id);
    if(req.userdata.id == req.params.id && req.userdata.isAdmin){
        next()
    }
    else{
        return res.status(403).json({
            message:"user not authorized"
        })
    }                                                                                                                  
    })
}

// verify admin by using cookies
exports.verifyadmin = (req,res,next)=>{
    this.verifytoken(req,res, ()=>{
    if(req.userdata.isAdmin){
        next()
    }
    else{
        return res.status(403).json({
            message:"user not authorized"
        })
    }
    })
}