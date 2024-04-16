const express=require('express')
const router=express.Router()
const UserModel=require('../../models/UserModels')
const md5=require('md5')


router.get('/reg',function(req,res,next){
    res.render('reg.ejs')
})
router.post('/reg',function(req,res,next){
    UserModel.create({...req.body,password:md5(req.body.password)}).then((data,err)=>{
        if(err){
            res.status(500).send('reg fail ,try later')
            return
        }
        res.render('success.ejs',{msg:'reg success',url:'/login'})
    })
})
router.get('/login',function(req,res,next){
    res.render('login.ejs')
})
router.post('/login',function(req,res,next){
    //查询数据库
    let {username,password}=req.body
    UserModel.findOne({username:username,password:md5(password)}).then((data,err)=>{
        if(err){
            res.status.send('login fail,try again')
            return
        }
        if(!data){
            return res.send('incorrect')
        }
        req.session.username=data.username
        req.session._id=data._id
        res.render('success.ejs',{msg:'login success',url:'/account'})
    })
})
//这里改成post方式csrf跨站请求
router.post('/logout',function(req,res,next){
    req.session.destroy(()=>{
        res.render('success.ejs',{msg:'logout success',url:'/login'})
    })
})
module.exports=router