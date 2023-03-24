// import packages
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const CookieParser = require('cookie-parser') ;

// import routes 
const authroutes = require('./routes/authroutes');
const houseroutes = require('./routes/houseroutes');
const roomroutes = require('./routes/roomroutes');
const roomimgroutes = require('./routes/roomimgroutes');
const paymentroutes =  require('./routes/paymentroutes');


// config env file
dotenv.config();

// Port No for server connection
const PORT = process.env.PORT ||  9090;

// server created
const app = express();

// Database connection 
mongoose.connect(process.env.MONGOURI,()=>console.log("database connected successfully"),err=>console.log("database connection error",err));

mongoose.connection.on("connected",()=>{
    console.log("mongodb connected")
})
mongoose.connection.on("disconnected",()=>{
    console.log("mongodb disconnected")
})


// middlewares 
app.use(cors({ origin: 'https://guest-room-booking.onrender.com', credentials: true, exposedHeaders: ['Set-Cookie', 'Date', 'ETag'] }));
app.use(bodyParser.json({limit:"50mb"}));
app.use(CookieParser());

// API paths
app.use("/api/auth",authroutes);
app.use("/api/house",houseroutes);
app.use("/api/room",roomroutes);
app.use("/api/image",roomimgroutes);
app.use('/api/payment',paymentroutes);



// listening server 
app.listen(PORT,()=>{
    console.log('server running on the port',PORT);
});