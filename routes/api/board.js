var express = require('express');
var router = express.Router();

const BoardModel = require('../../models/BoardModel')
const CardModel=require('../../models/CardModel')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//获取当前所有事件
router.get('/cards', function(req, res, next) {
    let boardArr=[]
    let cardArr=[]
  BoardModel.find().select({_id:0}).lean().then((data)=>{
    // console.log(data)
    //创建cards空数组，用于存放card内容
    boardArr=data.map(board=>({ ...board, cards: [] }))
     
    CardModel.find().select({_id:0}).lean().then(response=>{
        cardArr=response
        cardArr.forEach(card=>{
            boardArr.map(board=>{
                if(card.boardID===board.id){
                    board.cards.unshift(card)
                }
            })
        })
        res.json({
            code:0,
            msg:'read success',
            data:boardArr
        })
    }).catch(err=>{
        console.error(err)
        res.json({
            code:1001,
            msg:'get cards fail',
            err:err
        })
    })
    
  }).catch(err=>{
    res.json({
        code:1001,
        msg:'get boards fail',
        err:err
    })
  })
 
});


//新增记录
router.post('/cards',function(req,res,next){
  //插入数据库
  CardModel.create(req.body).then((data,err)=>{
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
router.put('/cards',function(req,res,next){
    //插入数据库
    CardModel.findOneAndUpdate({id:req.query.id},req.body,{new:true}).then((data)=>{
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
router.delete('/cards',function(req,res,next){
  let id=req.query.id;
  CardModel.deleteOne({id:id}).then((data)=>{
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
