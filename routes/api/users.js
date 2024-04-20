var express = require('express');
var router = express.Router();
const checkloginMiddleware=require('../../middlewares/checkLoginMiddleware')

const UserModel=require('../../models/UserModel')

/* GET home page. */
router.get('/', checkloginMiddleware,function(req, res, next) {
  res.send('respond with a resource');
});
//获取当前所有事件
router.get('/users', function(req, res, next) {
  UserModel.find().select({_id:0}).then((data)=>{
    res.json({
        code:0,
        msg:'users read ok',
        data:data,
    })
  }).catch(err=>{
    res.json({
        code:1001,
        msg:'read fail',
        err:err
    })
  })
 
});

//新增记录
router.post('/users',function(req,res,next){
  //插入数据库
  UserModel.create(req.body).then((data,err)=>{
    if(err){
      res.json({
        code:1001,
        msg:"add fail",
        data:null
      })
      return
    }
    res.json({
        code:0,
        msg:"add ok",
        data:data
    })
  })
     
})
//修改记录
router.put('/users',function(req,res,next){
    //插入数据库
    UserModel.findOneAndUpdate({id:req.query.id},req.body,{new:true}).then((data)=>{
      res.json({
          code:0,
          msg:"update ok",
          data:data
      })
    }).catch(err=>{
        res.json({
            code:1001,
            msg:"update fail",
            data:err
          })
    })
       
  })
//删除记录
router.delete('/users',function(req,res,next){
  let id=req.query.id;
  UserModel.deleteOne({id:id}).then((data)=>{
    if(!data.deletedCount){
        res.json({
            code:1001,
            msg:'delete fail, item not exist!',
            data:null
        })
    }else{
        res.json({
            code:0,
            msg:'delete success',
            data:data
    })
    }
    
  }).catch(err=>{
        res.json({
          code:1001,
          msg:'delete fail, server err',
          err:err
        })   
  })
   
})

module.exports = router;
