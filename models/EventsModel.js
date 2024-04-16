const mongoose=require('mongoose')

let EventsSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    start:{
        type:String,
        required:true
    },
    end:{
        type:String,
        required:false
    },
    allDay:{
        type:Boolean,
        default:false,
        require:false
    }
  });
  let EventsModel = mongoose.model('events', EventsSchema);
  module.exports=EventsModel  