const express = require("express");
const app = express();
const port = 8080;
const mongoose = require('mongoose');
const path = require('path');
const listing = require('./models/listing.js');
const ejsMate = require('ejs-mate');
const MONGO_URL = 'mongodb://localhost:27017/WanderLust';
const methodOverride = require("method-override");
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
    res.send("working")
});
app.get("/listings",async (req,res)=>{
    const allLists = await listing.find({});
    res.render("listings/index.ejs",{lists:allLists});
});
app.get("/listings/new", async(req,res)=>{
    res.render('listings/new.ejs');
});
app.get('/listings/:id', async(req,res)=>{
    let {id} = req.params;
    const list = await listing.findById(id);
    res.render("listings/show.ejs",{list});
});
app.put("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    await listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
});
app.get('/listings/:id/edit',async(req,res)=>{
    let {id} = req.params;
    const list = await listing.findById(id);
    res.render("listings/edit.ejs",{list});
})
app.post("/listings/new",async(req,res)=>{
  const newlisting = new listing(req.body.listing);
   console.log(newlisting)
  await newlisting.save().then(()=>{
    console.log("successfull");
  })
  .catch((err)=>{
    console.log(err);
  });
  res.redirect('/listings');
});
app.delete("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    await listing.findByIdAndDelete(id);
    res.redirect('/listings');
})