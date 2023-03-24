// Date.prototype.addDay = function(days) {
//     var date = new Date(this.valueOf());
//     date.setDate(date.getDate() + days);
//     return date;
// }
  
// function getDate(strDate, stpDate) {
//     var dArray = new Array();
//     var cDate = strDate;
//     while (cDate <= stpDate) {
          
//         // Adding the date to array
//         dArray.push(new Date (cDate)); 
          
//         // Increment the date by 1 day
//         cDate = cDate.addDay(1); 
//     }
//     return dArray;
// }
  

//     var startDate = new Date("2022-10-17");
//     var days =  new Date("2022-10-20") - startDate ;
//        let age = days/(1000*60*60*24) ;
//     console.log("days",age);
      
//     // Making lastDate equal to 4 more days
//     // from startDate.
//     var endDate = startDate.addDay(age); 
//     var date = getDate(startDate, endDate);
//     JSON.stringify(date);
//     console.log('dates',date);

   




    // nodemailer
// const nodemailer = require('nodemailer');
// const dotenv = require('dotenv');

// dotenv.config();

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user:process.env.email,
//     pass:process.env.password
//   }
// });

// const mailOptions = {
//   from:process.env.email,
//   to: 'vboopathi57@gmail.com',
//   subject: 'Sending Email using Node.js',
//   html: `<div>
//              <h1>your reservation details</h1>
//               <img src="./models/house3.jpg" alt="image" />
//          </div>`
// };


// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log("",error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });


//  Here I practice contruct and deconstruct hte array of objects 

//   let house = {
//      housename:"awesome house",
//      price:100,
//      address:"1/67, periyapallipalayam ,unniyur post",
//      rooms:["a","b","c"],
//      location:"coimbatore"   
//     }  

//     let room = [{
//       roomid:"a",
//       price:100,
//      address:"1/67, periyapallipalayam ,unniyur post",
//      location:"coimbatore" 
//     },
//     {
//     roomid:"b",
//     price:100,
//    address:"1/67, periyapallipalayam ,unniyur post",
//    location:"coimbatore" 
//   },
//   {
//   roomid:"c",
//   price:100,
//  address:"1/67, periyapallipalayam ,unniyur post",
//  location:"coimbatore" 
// } ]

//     let roomimages =[
//       {
//           roomid:"a",
//           images:"jojo"
//       },
//       {
//         roomid:"c",
//         images:"yoyo"
//     },
//     {
//       roomid:"a",
//       images:"rara"
//   },
//   {
//     roomid:"a",
//     images:"rara"
// },
//   {
//     roomid:"b",
//     images:"vava"
// },
// {
//   roomid:"c",
//   images:"gogo"
// },
// {
//   roomid:"b",
//   images:"hoho"
// }
//   ]
//   let object = [];


//   for(let i=0 ;i< house.rooms.length;i++){
//     // console.log("rooms = ",house.rooms[i]);
//     // console.log("room" ,roomimages[i].roomid)
//     let rooms = roomimages.filter(element=>{     
//       // console.log(arr)
//         if(element.roomid.includes(house.rooms[i])){
//           return element
//         }
//     });
//     console.log("rooms",rooms);
//     let image = [];
//     for(var k=0 ;k< rooms.length;k++){
//       // console.log("img",rooms[k].images);
//        image.push(rooms[k].images);
//     }
//     let room1={
//       id: rooms[0].roomid,
//       images :image
//     }
//     object.push(room1);
    
//   }

//   // console.log("object",object);
 
//   let object2 = [];
//   for(let i=0;i<room.length ;i++){
//       for(let j=0;j<object.length;j++){
//         if(room[i].roomid == object[j].id ){
//           room[i].images = object[j].images; 
//           break;
//         }
//       }
//       object2.push(room);  
//   }

//   // console.log("object2",object2[0]);

//   house.rooms = object2[0];

//   console.log("house",house);





// Returns an array of dates between the two dates
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

let totaldates = [];
// Usage
const dates = getDates(new Date(2013, 10, 22), new Date(2013, 10, 25))
//  console.log("unavailable dates",dates);
  totaldates.push(dates);
const date = getDates(new Date(2013, 10, 26), new Date(2013, 10, 27))
// console.log("date",date);
totaldates.push(date);




// 2D array into 1D Array
var newArr = [];


for(var i = 0; i < totaldates.length; i++)
{
    newArr = newArr.concat(totaldates[i]);
}


// filter the unavailabel dates
let filterdates = date.filter(element=>newArr.includes(element))

console.log("filter dates",filterdates);







