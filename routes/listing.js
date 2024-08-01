const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const review = require('../models/review.js');
const {isLoggedIn , isowner ,listingValidator} = require('../middleware.js');
const listing = require('../models/listing.js');
const listingController = require('../controller/listing.js');
const multer  = require('multer')
const {storage} = require('../cloudConfig.js');
const { route } = require('./review.js');
const upload = multer({ storage })

// INDEX ROUTE // NEW POST ROUTE
router.route('/').get(wrapAsync(listingController.index))
.post(isLoggedIn,upload.single('listing[image]'),listingValidator,wrapAsync(listingController.new));

//   NEW POST REDIRECT ROUTE
router.route('/new').get(isLoggedIn,wrapAsync(listingController.renderNewForm));

// SHOW ROUTE // UPDATE ROUTE //DELETE ROUTE 
router.route('/:id').get(isLoggedIn,wrapAsync(listingController.show))
.put(isLoggedIn,isowner,upload.single('listing[image]'),listingValidator,wrapAsync(listingController.update))
.delete(isLoggedIn,isowner,wrapAsync(listingController.delete));
//EDIT ROUTE 
router.get('/:id/edit',isLoggedIn,isowner,wrapAsync(listingController.edit));

module.exports = router;