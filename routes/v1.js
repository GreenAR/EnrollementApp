const express 			= require('express');
const router 			= express.Router();

const UserController 	= require('./../controllers/UserController');
const CustomerController 	= require('./../controllers/CustomerController');
const HomeController 	= require('./../controllers/HomeController');


const passport      	= require('passport');
const path              = require('path');


require('./../middleware/passport')(passport)
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({status:"success", message:"Parcel Pending API", data:{"version_number":"v1.0.0"}})
});


router.post(    '/users',           UserController.create);                                                    // C
router.get(     '/users',           passport.authenticate('jwt', {session:false}), UserController.get);        // R
router.put(     '/users',           passport.authenticate('jwt', {session:false}), UserController.update);     // U
router.delete(  '/users',           passport.authenticate('jwt', {session:false}), UserController.remove);     // D
router.post(    '/users/login',     UserController.login);


router.post(    '/customer',      CustomerController.create);
router.post(    '/customer/staffmember', passport.authenticate('jwt', {session:false}),     CustomerController.createWithStaffmember);
router.get('/dash', passport.authenticate('jwt', {session:false}),HomeController.Dashboard)


module.exports = router;
