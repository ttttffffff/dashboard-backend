const mongoose=require('mongoose')
let BoardSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    }

  });
  let BoardModel = mongoose.model('board', BoardSchema,'board_data');
  module.exports=BoardModel