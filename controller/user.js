const user = require("../models/user.js");
module.exports.signUp =async (req,res)=>{
    res.render('users/signup.ejs');
}
module.exports.signUpPost = async(req,res)=>{
    try
    {
    let {username,email,password} = req.body;
    let newUser =  new user({email,username});
    let registeredUser = await user.register(newUser,password);
    req.login(registeredUser,(err)=>{
        if(err)
        {
          return next(err);
        }
        req.flash('success',"Welcome to WanderLust!");
        res.redirect('/listings');
    })
    }
    catch(err){
        req.flash('failure',err.message);
        res.redirect('/signUp');
    }
}
module.exports.login = async(req,res)=>{
    res.render('users/login.ejs');
}
module.exports.loginPost = async(req,res)=>{
    let {username} = req.body;
    req.flash(`success`,`Welcome back to Wanderlust! ${username}`);
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}
module.exports.logout = async(req,res)=>{
    req.logout((err)=>{
        if(err)
        {
            return next(err);
        }
        req.flash('success',"you are logged out");
        res.redirect('/listings');
    });
}