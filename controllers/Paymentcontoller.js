const Razorpay = require('razorpay');
const shortid = require('shortid');
const Transaction = require('../models/payment');
const crypto =require('crypto');
const Room = require('../models/room');

var instance = new Razorpay({ key_id: 'rzp_test_BsGSW4LpkffpL9',
                              key_secret: '0qEB17FzJM6xwv9DkRQ6aosV' });

exports.createoreder =async(req,res)=>{
     let options ={  amount: req.body.amount * 100,
                     currency: "INR", 
                     receipt: shortid.generate(), 
                     notes: { key1: "value3", 
                              key2: "value2"  }

     }

       try{
         let response = await instance.orders.create(options);
           console.log(response)
         res.json(response);
      }
      catch(error){
          console.log(error);
      }
       }



       exports.saveTransaction=(req,res)=>{
        // console.log("save Transcation !!!! ");

        //create signature in backend for checking purpose
           const generatedsignature = crypto.createHmac('sha256',instance.key_secret) ;
           generatedsignature.update(req.body.razorpay_orderid+"|"+req.body.razorpay_paymentid) ;

        // compare frontend and backend signature
        if(req.body.razorpay_signature == generatedsignature.digest('hex')){
          console.log("create transcation object !!!!");
          console.log("req.body",req.body);
          let transaction ={
            Transaction_id :  req.body.razorpay_paymentid ,
            Transaction_amount  : req.body.razorpay_amount
            }; 

            // console.log("transaction",transaction);
           
           Transaction.create(transaction).then(
            result=>{
            //   console.log("result",result);
                res.status(201).json({data:result})
            }
           )                                  
        }
       }


     
exports.sendemail = (req,res)=>{
 console.log("send mail");
 let {email,name,totalprice,location,housename,roomno, checkin, checkout  ,address,roomid} = req.body;
       
 // nodemailer
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user:process.env.email,
    pass:process.env.password
  }
});

const mailOptions = {
  from:process.env.email,
  to: email,
  subject: 'Guest room booking details',
  html: `<div>
             <h1>your reservation details</h1>
             <p>Dear ${name}</p>
             <div>you are booked Room NO : ${roomno} from House ${housename} in ${location}</div> 
             <div>Address : ${address}</div>
             <div>Total amount : ${totalprice}</div>
             <div>Booked dates :${checkin} - ${checkout}</div>
         </div>`
};
 
//  before sending email update booked dates in database
updatebookings(req.body);
console.log("after update");

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
   
    res.status(500).json({
        message:"send email is failed"
    })
  } else {
    res.status(201).json({
        message:"send email is succeed",
         data:info.response
    })
  }
});
       }

  const updatebookings = (data)=>{
        console.log("update bookings !!!!");
        let {email , name, totalprice, location, housename ,roomno, checkin, checkout  ,address,roomid} = data;

        function getDates (startDate, endDate) {
            const dates = []
            let currentDate = startDate
            const addDays = function (days) {
              const date = new Date(this.valueOf())
              date.setDate(date.getDate() + days)
              return date;
            }
            while (currentDate <= endDate) {
              dates.push(currentDate.toLocaleDateString())
              currentDate = addDays.call(currentDate, 1)
            }
            return dates
          }

          if( new Date(checkin) > new Date()){
              console.log("checkin greater then curennt date");
          }





          
          // Usage
          const dates = getDates(new Date(checkin), new Date(checkout))
           console.log("unavailable dates",dates);
        let query = {_id:roomid};
        let newdata = {$push :{unavialableDates: dates,records:{
                       name:name,
                       email:email,
                       dates:dates
                      }
        }
        }

   console.log("new data",newdata);

   Room.updateOne(query,newdata).then(result=>{
    console.log("result",result);
   })
   .catch(err=>{
   console.log('error',err);
   });
  }