const express = require('express');
const {createaroom,updateroom, deleteroom} = require("../controllers/roomcontrollers");


// create router 
const router = express.Router(); 

// @post method
// create room data
router.post("/createroom/:id",createaroom);

// @put method
// update room data
router.put('/update/:roomid',updateroom);

// @put method
// delete room data
router.put('/delete/:roomid',deleteroom);






// export route
module.exports = router ;