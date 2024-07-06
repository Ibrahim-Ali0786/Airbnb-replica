const express = require("express");
const app = express();
const port = 8080;
const expressError = require('./errorHandler/error.js');
const mongoose = require('mongoose');
const path = require('path');
const listing = require('./models/listing.js');
const ejsMate = require('ejs-mate');
const MONGO_URL = 'mongodb://localhost:27017/WanderLust';
const methodOverride = require("method-override");
const wrapAsync = require('./utils/wrapAsync.js');
const expressError = require('./utils/ExpressError.js');
async function main()
{
    await mongoose.connect(MONGO_URL);
}
main()
.then((res)=>{ 
    console.log("Connected to DB");
})
.catch(err=>{
    console.log(err);
});
app.engine('ejs',ejsMate);
app.use(methodOverride("_method"));
app.set('view engine',"ejs");
app.set("views",path.join(__dirname,"/views"));
app.listen(port,()=>{
    console.log(`listening on port : ${port}`);
});
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,"/public")));
app.get("/",(req,res)=>{
   res.redirect('/listings')
});
app.get("/listings",wrapAsync(async(req,res,next)=>{
    try{
        const allLists = await listing.find({});
        res.render("listings/index.ejs",{lists:allLists});
    }
    catch(err){
        next(new expressError(401,'not'));
    }
}));
app.get("/listings/new",wrapAsync(async(req,res)=>{
    res.render('listings/new.ejs');
}));
app.get('/listings/:id',wrapAsync(async(req,res)=>{
    let {id} = req.params;
    const list = await listing.findById(id);
    res.render("listings/show.ejs",{list});
}));
app.put("/listings/:id",wrapAsync(async(req,res)=>{
    let {id} = req.params;
    await listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
}));
app.get('/listings/:id/edit',wrapAsync(async(req,res)=>{
    let {id} = req.params;
    const list = await listing.findById(id);
    res.render("listings/edit.ejs",{list});
}));
app.post("/listings/new",wrapAsync(async(req,res)=>{
  const newlisting = new listing(req.body.listing);
  await newlisting.save();
  res.redirect('/listings');
}));
app.delete("/listings/:id",wrapAsync(async(req,res)=>{
    let {id} = req.params;
    await listing.findByIdAndDelete(id);
    res.redirect('/listings');
}));
app.use((err,req,res,next)=>{
    let {status=404,message="Page Not Found"} = err;
    res.status(status).send(message);
})