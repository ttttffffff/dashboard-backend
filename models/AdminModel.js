const mongoose=require('mongoose')
let AdminSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
  });
  let AdminModel = mongoose.model('admin', AdminSchema,'admin');
  module.exports=AdminModel