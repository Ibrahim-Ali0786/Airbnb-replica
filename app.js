if(process.env.NODE_ENV !='Production')
{
    require('dotenv').config();
}
const express = require("express");
const app = express();
const port = 8080;
const expressError = require("./utils/ExpressError.js");
const mongoose = require('mongoose');
const path = require('path');
const ejsMate = require('ejs-mate');
const MONGO_URL = 'mongodb://localhost:27017/WanderLust';
const methodOverride = require("method-override");
const reviewRouter = require('./routes/review.js');
const listingRouter = require('./routes/listing.js');
const userRouter = require('./routes/user.js');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const user = require('./models/user.js');
const sessionValues = 
 {
 secret:"mysupersecretcodethatinevershare",
 resave:false,
 saveUninitialized:true,
 cookie:
 {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge : 7 * 24 * 60 * 60 * 1000,
    httpOnly : true,
 }
 }
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

//INDEX ROUTE REDIRECT ROUTE
app.get("/",(req,res)=>{
    res.redirect('/listings');
 });
 
app.use(session(sessionValues));
 const flash = require('connect-flash');
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(user.authenticate()));

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

// app.use('/demouser', async(req,res)=>{
//     let fakeUser = new user({
//         email:'john123@gmail.com',
//         username:'johnny'
//     });
//     let registeredUser = await user.register(fakeUser,"123456789");
//     res.send(registeredUser);
// });

//flash middleware
app.use((req,res,next)=>{
    res.locals.success = req.flash('success');
    res.locals.failure = req.flash('error');
    res.locals.error = req.flash('failure');
    res.locals.CurrUser = req.user;
    next();
})
 //Redirect all the listings routes
app.use("/listings",listingRouter);
//Redirect all the reviews routes
app.use("/listings/:id/reviews",reviewRouter);
//user route
app.use('/',userRouter);

//IF ANY ROUTE DOESNT MATCH IT WILL BE EXECUTED
app.all('*', (req,res,next)=>{
    next(new expressError(404,"Page not found"));   
});
//ERROR HANDLER
app.use((err,req,res,next)=>{
    let {statusCode=500,message="Something Went Wrong"} = err;
    res.status(statusCode).render('error/error.ejs',{message});
    console.log(err);
    next();
})
