const { date } = require('joi');
const mongoose = require('mongoose');
const {Schema} = mongoose;
const reviewSchema = new Schema({
    comment:{
        type:String
    },
    rating:{
        type:Number,
        min:0,
        max:5,
    },
    created_at:{
        type:Date,
        default:Date.now(),
    },
    author:{
        type: Schema.Types.ObjectId,
        ref:"user",
    }
});
module.exports = mongoose.model("review",reviewSchema);