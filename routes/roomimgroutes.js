const express = require('express');
const {uploadimages} = require('../controllers/imagecontrollers');


const router = express.Router();


// @post method
// upload images 
router.post('/uploadimage',uploadimages);







module.exports = router ;