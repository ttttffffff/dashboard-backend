let checkloginMiddleware=(req,res,next)=>{
    if(!req.session.email){
    return res.json({
      code:1003,
      msg:'you have not login yet'
    })
  }
  next();
  }
  module.exports=checkloginMiddleware