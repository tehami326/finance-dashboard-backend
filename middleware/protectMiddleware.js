const jwt = require("jsonwebtoken")
const protect = async (req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token){
        return res.status(400).json({message:"token doesnot exist"});
    }

    const decode = jwt.verify(token,process.env.JWT_SECRET);
    req.user =  decode;
    next();
}

module.exports = protect;