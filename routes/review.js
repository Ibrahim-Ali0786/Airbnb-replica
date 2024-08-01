const express = require('express');
const router = express.Router({mergeParams:true});
const wrapAsync = require('../utils/wrapAsync.js');
const review = require('../models/review.js');
const listing = require('../models/listing.js');
//LISTING ERROR FINDER WITH ERROR THROWER
const expressError = require("../utils/ExpressError.js");
const {reviewValidator ,isLoggedIn, isReviewAuthor} = require('../middleware.js');
const reviewController = require('../controller/review.js')

//  reviews
// post route for review

router.post("/",isLoggedIn, reviewValidator,wrapAsync(reviewController.newReview))

//delete comments
//review delete route
//delete route for review
//pull is used to delete particular thing from the array

router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.deleteReview));

module.exports = router; 