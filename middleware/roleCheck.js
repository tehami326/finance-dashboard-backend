
const roleCheck = (...role)=>{
   return (req,res,next)=>{
      if(!role.includes(req.user.role)){
        return res.status(403).json({message:"Role doesnot matched"});
      }
      next();

   }
}

module.exports = roleCheck;