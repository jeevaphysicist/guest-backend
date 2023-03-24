const express = require('express');
const paymentroutes =require('../controllers/Paymentcontoller');

const route = express.Router();

// @post method 
// create order in razorpay
route.post('/',paymentroutes.createoreder);

// @post method
// save transcation details in database
route.post('/savetransaction',paymentroutes.saveTransaction);
  
// @post method send email to client after the payment
route.post('/sendemail',paymentroutes.sendemail);

module.exports= route;