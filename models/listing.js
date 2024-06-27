const mongoose = require('mongoose');
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
         default:"https://unsplash.com/photos/a-flock-of-birds-flying-over-the-ocean-at-sunset-C3wnYmz8fGA",
         set: (v)=> v==="" ? "https://unsplash.com/photos/a-flock-of-birds-flying-over-the-ocean-at-sunset-C3wnYmz8fGA" : v,
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
     }
});
const listing = mongoose.model("listing",listeningSchema);
module.exports = listing;
