const getcordinates = require('../utils/loaction');
const listing = require('../models/listing');
const expressError = require('../utils/ExpressError');
module.exports.index = async(req,res,next)=>{
    try{
        const allLists = await listing.find({});
        res.render("listings/index.ejs",{lists:allLists});
    }
    catch(err)
    {
        next(new expressError(400," No listing is found"))
    }
        
}
module.exports.show = async(req,res)=>{
    let {id} = req.params;
    let maptoken = process.env.MAP_Token;
    const list = await listing.findById(id).populate({path:'reviews' , populate : {path:"author"}}).populate('owner');
    if(!list)
    {
        req.flash('error',"The post is no longer available");
        res.redirect("/listings");
    }
    let coordinates = list.geometry.coordinate;
    res.render("listings/show.ejs",{list,maptoken,coordinates});
}
module.exports.update = async(req,res,next)=>{
    let {id} = req.params;
    let list = await listing.findByIdAndUpdate(id,{...req.body.listing});
    if(typeof req.file!="undefined")
    {
        let url = req.file.path;
        let filename = req.file.filename;
        list.image = {url,filename};
       await list.save();
    }
    req.flash('success',"Post has been successfully updated");
    res.redirect(`/listings/${id}`);
}
module.exports.edit = async(req,res,next)=>{
    let {id} = req.params;
    const list = await listing.findById(id);
    if(!list)
        {
            req.flash('error',"The post is no longer available to be edited");
            res.redirect("/listings");
            next();
        }
        let originalImageUrl  = list.image.url;
        originalImageUrl = originalImageUrl.replace('/upload','/upload/w_250');
    res.render("listings/edit.ejs",{list,originalImageUrl});
}
module.exports.delete = async(req,res,next)=>{
    let {id} = req.params;
    await listing.findByIdAndDelete(id);
    req.flash('success',"Post has been deleted successfully");
    res.redirect('/listings');
}
module.exports.new = async(req,res,next)=>{
   if(!req.file)
   {
    let filename = "NEW LISTING"
    let coordinate = await getcordinates(req.body.listing.location);
    const newlisting = new listing(req.body.listing);
    newlisting.owner = req.user._id;
    newlisting.image.filename= filename;
    newlisting.geometry.coordinate = coordinate;
    await newlisting.save();
    req.flash('success',"New post added");
    res.redirect('/listings');
    console.log(newlisting);
   }
   else
   {
    let url = req.file.path;
    let filename = req.file.filename
    let coordinate = await getcordinates(req.body.listing.location);
    const newlisting = new listing(req.body.listing);
    newlisting.owner = req.user._id;
    newlisting.image = {url,filename};
    newlisting.geometry.coordinate = coordinate;
    await newlisting.save();
    req.flash('success',"New post added");
    res.redirect('/listings');
    console.log(newlisting);
   }
  }
  
  module.exports.renderNewForm = async(req,res)=>{
    res.render('listings/new.ejs');
}