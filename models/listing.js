const mongoose = require('mongoose');
const {Schema} = mongoose;
const review = require('./review.js');
const { string } = require('joi');
const listeningSchema = new  mongoose.Schema ({
     title:
     {
        type:String,
        required:true,
     },
     description:
     {
        type:String,
     },
     image:
     {
      url:{
         type:String,
         default:"https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         set: (v)=> v==="" ? "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,
     },
      filename:{
         type:String,
      }
     },
     price:{
        type:Number,
        required:true,
     },
     location:
     {
        type:String,
     },
     country:{
        type:String,
        required:true,
     },
     reviews:[
      {
         type:Schema.Types.ObjectId,
         ref:'review',
      },
     ],
     geometry:{
      coordinate:
      {
         type:Object,
         required:true
      }
     },
     owner:{
      type:Schema.Types.ObjectId,
      ref:'user',
     }
});
listeningSchema.post("findOneAndDelete",async(list)=>{
   if(list)
   {
      await review.deleteMany({_id:{$in:list.reviews}});
   }
});
const listing = mongoose.model("listing",listeningSchema);
module.exports = listing;
