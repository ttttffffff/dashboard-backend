const mongoose=require('mongoose')
let BoardSchema = new mongoose.Schema({
    id:Number,
    title:{
        type:String,
        required:true
    }

  });
  let BoardModel = mongoose.model('board', BoardSchema,'board_data');
  module.exports=BoardModel