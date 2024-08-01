const express = require('express');
const session = require('express-session');
const path = require('path');
const port = 3000;
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const app = express();
const posts = require('./routes/posts.js');
const users = require('./routes/user.js');
const sessionValues = 
        {
        secret:"mysupersecretcodethatinevershare",
        resave:false,
        saveUninitialized:true,
        }
app.use(session(sessionValues));
app.use(flash());
app.set('view engine',"ejs");
app.set('views',path.join(__dirname,"/views"));
app.get('/maker',(req,res)=>{
    if(req.session.count)
    {
        req.session.count++;
    }
    else
    {
        req.session.count = 1;
    }
    res.send(`session refresh count ${req.session.count}`);
});
app.get('/register',(req,res)=>{
   let {name = 'anonomus'} = req.query;
   req.session.name = name;
   if(name==="anonomus")
   {
    req.flash("error","user not register");
   }
   else
   {
    req.flash("success","user has been successfully register");
   }
   res.redirect('/greet');
});
app.use((req,res,next)=>{
    res.locals.errorMsg = req.flash('error');
    res.locals.successMsg = req.flash('success');
    next();
})
app.get('/greet',(req,res)=>{
    res.render('page.ejs',{name:req.session.name});
})
// app.use(cookieParser("secretcode"));
// app.use('/user',users);
// app.use("/post",posts);
// app.get('/getcookies',(req,res)=>{
//     res.cookie('greet',"hello",{signed:true});
//    res.send('hello');
// })
// app.get('/',(req,res)=>{
//     res.send('I am root');
//     console.log(req.signedCookies);
// })
app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});