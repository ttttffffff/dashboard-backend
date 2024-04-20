const express=require('express')
const router=express.Router()
const AdminModel=require('../../models/AdminModel')

router.post('/reg',function(req,res,next){
    AdminModel.create(req.body).then((data)=>{
        res.json({
            code:0,
            msg:'admin add ok',
            data:data,
        })
        
    }).catch(err=>{
        res.json({
            code:1001,
            msg:'create admin fail',
            err:err
        })
    })
})

router.post('/login',function(req,res,next){
    //查询数据库
    let {email,password}=req.body
    AdminModel.findOne({email:email,password:password}).then((data)=>{
        
        if(!data){
            res.json({
                code:1003,
                msg:'incorrect admin!'
            })
        }
        else{
            req.session.email=data.email
            req.session._id=data._id
            res.json({
                code:0,
                msg:'login success',
            })
            
        }
        
    })
})
//这里改成post方式csrf跨站请求
router.post('/logout',function(req,res,next){
    req.session.destroy(()=>{
        res.json({
            code:0,
            msg:'logout success'
        })
    })
})
module.exports=router