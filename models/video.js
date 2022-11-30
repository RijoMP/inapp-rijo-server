import mongoose, {Schema} from 'mongoose'

const schema = new Schema({
  name:{
    type:String,
    required:true
  },
  sourceUrl:{
    type:String,
    required:true
  },
  size:{
    type:Number,
    required:true
  },
  localUrl:{
    type:String,
    required:true
  },
  uploadedBy:{
    type:String,
    required:true
  },
  isDeleted:{
    type:Boolean,
    required:true
  }
}, {
  timestamps:true
}) 

const Video = mongoose.model('video', schema)

export default Video;