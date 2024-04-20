const mongoose=require('mongoose')

let EventsSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
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
    },
    durationEditable:{
        type:Boolean,
        default:true
    }
  });
  let EventsModel = mongoose.model('events', EventsSchema);
  module.exports=EventsModel  