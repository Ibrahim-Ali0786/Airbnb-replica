const review = require('../models/review.js');
const listing = require("../models/listing");
module.exports.newReview = async(req,res)=>{
    let list = await listing.findById(req.params.id);
    let reviewlisting = new review(req.body.review);
    reviewlisting.author = req.user._id;
    list.reviews.push(reviewlisting);
    await list.save();
    await reviewlisting.save();
    req.flash("success","comment is added");
    res.redirect(`/listings/${list._id}`);
}
module.exports.deleteReview = async(req,res)=>{
    let {id,reviewId} = req.params;
    console.log(id,reviewId);
    let rev = await review.findById(reviewId);
    await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await review.findByIdAndDelete(reviewId);
    req.flash('success',"comment is deleted");
    res.redirect(`/listings/${id}`); 
}