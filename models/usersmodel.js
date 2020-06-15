const mongoose= require('mongoose');

const userSchema=mongoose.Schema({
   name: {
       type:String,
       required:true
   },
   profilePic:{
       type:String,
       required:true
   },
   group:{
       type:String,
       required:true
   }
});
module.exports=mongoose.model('Users',userSchema);