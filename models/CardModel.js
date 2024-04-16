const mongoose=require('mongoose')
let CardSchema = new mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:String,
    boardID:{
        type:Number,
        required:true
    }
    
  });
  let CardModel = mongoose.model('card', CardSchema,'cards');
  module.exports=CardModel