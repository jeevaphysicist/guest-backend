const express = require('express');
const { createahouse, updatehouse, deletehouse,gethouse, getallhouse,gethousebylocation, gethousebyid, getroomsdetails } = require("../controllers/housecontrollers");


// create router 
const router = express.Router(); 

// @post method
// create house data
router.post("/createhouse/:id",createahouse);

// @get method
// gethouse for house owner reference house data
router.get('/gethouse/:id',gethouse);

// @get method
// gethouse for house owner reference house data
router.get('/getdetails/:id',getroomsdetails)

// @put method
// update house data
router.put('/update/:id/:houseid',updatehouse);

// @get method
// delete house data
router.get('/delete/:houseid',deletehouse);

// @get method
//  get house data
router.get('/all',getallhouse);

// @post method
//  get individual house  data
router.post('/find',gethousebyid);

// @get method
//  get house data by Location
router.get('/location/:name',gethousebylocation)





// export route
module.exports = router ;