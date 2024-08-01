const express = require("express");
const route = express.Router({mergeParams:true});
//Index route
route.get("/",(req,res)=>{
    res.send('Post Index Route is working');
});
//Update route
route.post("/:id",(req,res)=>{
    res.send('Post Update Route is working');
});
//Delete route
route.delete("/",(req,res)=>{
    res.send('Post Delete Route is working');
});
//Show Route
route.get("/:id",(req,res)=>{
    res.send('Post Show Route is working');
});
module.exports = route;