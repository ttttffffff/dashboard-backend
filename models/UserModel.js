const mongoose=require('mongoose')
let UserSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    name:{
        type:Object,
        children:{
            firstName:{
                type:String,
                required:true,
            },
            lastName:{
                type:String,
                required:true,
            }
        }
    },
    address:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    }
  });
  let UserModel = mongoose.model('user_data', UserSchema,'user_data');
  module.exports=UserModel