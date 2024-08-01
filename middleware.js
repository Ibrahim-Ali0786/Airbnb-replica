const listing = require('./models/listing');
const review = require('./models/review');
const expressError = require("./utils/ExpressError.js");
const { listingSchema,reviewSchema} = require('./schema.js');
module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated())
    {
      req.session.redirectUrl = req.originalUrl;
        req.flash('error','you must logged in to create listing!');
        return  res.redirect('/login');
    }
    next(); 
}

module.exports.redirectUrl = (req,res,next)=>{
  if(req.session.redirectUrl)
  {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
}
module.exports.isowner = async (req,res,next) =>
{
  let {id} = req.params; 
  const list = await listing.findById(id);
  if(!list.owner._id.equals(res.locals.CurrUser._id))
  {
    req.flash('error',"you are not the owner of this listing");
    return res.redirect(`/listings/${id}`);
  }
  next();
}
module.exports.listingValidator =  (req,res,next) => 
  {
      let {error} = listingSchema.validate(req.body);
      if(error)
      {
          let errmsg = error.details.map((el)=>el.message).join(',');
       throw new expressError(400,errmsg);
      }
      else
      {
          next();
      }
  }
  module.exports.reviewValidator = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error)
    {
        let ermsg = error.details.map((el)=>el.message).join(",");
        throw new expressError(400,ermsg);
    }
    else
    {
        next();
    }
}
module.exports.isReviewAuthor = async (req,res,next) =>
  {
    let {id,reviewId} = req.params; 
    const rev = await review.findById(reviewId);
    if(!rev.author._id.equals(res.locals.CurrUser._id))
    {
      req.flash('error',"you are not the author of this review");
      return res.redirect(`/listings/${id}`);
    }
    next();
  }