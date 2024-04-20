var express = require('express');
var router = express.Router();

const shortid=require('shortid')
const moment=require('moment')
const EventsModel=require('../../models/EventsModel')

let todayStr = moment().format("YYYY-MM-DD")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//获取当前所有事件
router.get('/calendar', function(req, res, next) {
  EventsModel.find().select({_id:0,id:1,title:1,start:1,end:1}).then((data)=>{
    res.json({
        code:0,
        msg:'read ok',
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
router.post('/calendar',function(req,res,next){
  //插入数据库
  EventsModel.create(req.body).then((data,err)=>{
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
router.put('/calendar',function(req,res,next){
    //插入数据库
    EventsModel.findOneAndUpdate({id:req.query.id},req.body,{new:true}).then((data)=>{
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
router.delete('/calendar',function(req,res,next){
  let id=req.query.id;
  EventsModel.deleteOne({id:id}).then((data)=>{
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
