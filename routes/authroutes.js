const express = require('express');
const {createaccount,login,updateuser} = require("../controllers/authcontrollers");
const {verifyUser} = require('../utils/VerifyToken');



// create router 
const router = express.Router(); 

// @post method
// createaccount data
router.post("/createaccount",createaccount);

// @post method
// login data
router.post("/login",login);

// // @put method
// // update user data
router.put('/update/:id',verifyUser,updateuser);

// // @put method
// // delete user data
// router.put('/delete/:id',deleteuser);



// export route
module.exports = router ;