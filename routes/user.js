const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { redirectUrl } = require("../middleware.js");
const userController = require('../controller/user.js');

router.route('/signUp').get(wrapAsync(userController.signUp))
.post(redirectUrl,wrapAsync(userController.signUpPost));

router.route('/login').get(wrapAsync(userController.login))
.post(redirectUrl,passport.authenticate("local",{ failureRedirect: '/login' , failureFlash: true,}),wrapAsync(userController.loginPost));

router.get('/logout',wrapAsync(userController.logout));
module.exports = router;