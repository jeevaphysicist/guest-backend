const House = require('../models/house');
const Room = require('../models/room');
const Roomimages = require('../models/roomimg');


// @post method 
// create house data 
exports.createahouse = (req,res)=>{
    let {houseownerid,name,price,address,phoneNo,location,maxDays,minDays,ratings,distance,picture} =req.body;
    // ratings = 5/5 ;
    let Data  =  {
        houseownerid,
        name,
        price,
        address,
        phoneNo,
        location,
        maxDays,
        minDays,
        ratings,
        distance,
        picture
    };
//   console.log("data",Data);
    House.create(Data).then(result=>{
        res.status(201).json({
            message:"house created successfully",
            data:result
        });
    })
    .catch(err=>{
        res.status(500).json({
            message:"something err went wrong in database",
            Error:err
        })
    })  
}


// @post method
// gethouses for house owner reference  

exports.gethouse = (req,res)=>{
    let filter = { houseownerid:req.params.id};
    // console.log("filter",filter);
    House.find(filter).then(result=>{
        res.status(201).json({
            message:"get houses from house owner id",
            data:result
        });
    })
    .catch(err=>{
        res.status(500).json({
            message:"something err went wrong in database",
            Error:err
        })
    })  
}

// @GET method
// gethouse datum by houseid for owner reference

exports.getroomsdetails = async(req,res)=>{
    let data = req.params.id ;
    let filter = {_id:data}; 
    let house , room ,roomimages ;
   await House.find(filter).then(result=>{
       house = result[0];
    //    console.log();
    })
    .catch(err=>{
        res.status(500).json({
           message:"something went wrong in database",
           Error:err
         })
    });
  await Room.find({houseid:data}).then(result=>{
        room = result;
     })
     .catch(err=>{
        res.status(500).json({
            message:"something went wrong in database",
            Error:err
          })
     });
   await Roomimages.find({houseid:data}).then(result=>{
        roomimages = result;
     })
     .catch(err=>{
        res.status(500).json({
            message:"something went wrong in database",
            Error:err
          })
     });

    //  console.log("house",house);
    //  console.log("rooms",room);
    //  console.log("images",roomimages);
   
let object = [];
  for(let i=0 ;i< house.rooms.length;i++){
    // console.log("rooms = ",house.rooms[i]);
    // console.log("room" ,roomimages[i].roomid);
    let rooms = roomimages.filter(element=>{     
      // console.log(arr)
        if(element.roomid.includes(house.rooms[i])){
          return element
        }
    });
    // console.log("rooms",rooms);
    let image = [];
    for(var k=0 ;k< rooms.length;k++){
    //   console.log("img",rooms[k].image);
       image.push(rooms[k].image);
    }
    rooms = rooms[0];
    console.log("rooms",rooms?.roomid);
    let room1={
      id: rooms?.roomid,
      images :image
    }
    object.push(room1);
    
  }
//   console.log("object",object);
  let object2 = [];
  for(let i=0;i<room.length ;i++){
      for(let j=0;j<object.length;j++){
        // console.log("rooid,",room[0]._id);
        if(room[i]._id == object[j].id ){
            //  object.assign(room[i],object[j].images)
            room[i].images = object[j].images;
          break;
        }
      }
    //   console.log("room",room);
      object2.push(room);  
  }
//   console.log("object2",object2);
  house.rooms = object2[0];
 res.status(200).json({
    data:{
        house
    }
 })
}
   

// @GET method
// getallhouse  

exports.getallhouse = (req,res)=>{
    House.find().then(result=>{
        res.status(201).json({
            message:"get houses to all users",
            data:result
        });
    })
    .catch(err=>{
        res.status(500).json({
            message:"something err went wrong in database",
            Error:err
        })
    })  
}

// @GET method
// gethousebylocation  

exports.gethousebylocation = (req,res)=>{
    let location = req.params.name ;
    // console.log("location",location);
    let filter = {location:location}; 
    House.find(filter).then(result=>{
        res.status(201).json({
            message:"get houses by location",
            data:result
        });
    })
    .catch(err=>{
        res.status(500).json({
            message:"something err went wrong in database",
            Error:err
        })
    })  
}


// @GET method
// gethouse by houseid for client reference

exports.gethousebyid = async(req,res)=>{
    let {houseid,checkin,checkout} = req.body ;
    let filter = {_id:houseid}; 
    let house , room ,roomimages ;
   await House.find(filter).then(result=>{
       house = result[0];
    //    console.log();
    })
    .catch(err=>{
       console.log("ERROR",err);
    });
  await Room.find({houseid:houseid}).then(result=>{
        room = result;
     })
     .catch(err=>{
        console.log("ERROR",err);
     });
   await Roomimages.find({houseid:houseid}).then(result=>{
        roomimages = result;
     })
     .catch(err=>{
        console.log("ERROR",err);
     });

    //  console.log("house",house);
    //  console.log("rooms",room);
    //  console.log("images",roomimages);
   
let object = [];
  for(let i=0 ;i< house.rooms.length;i++){
    // console.log("rooms = ",house.rooms[i]);
    // console.log("room" ,roomimages[i].roomid);
    let rooms = roomimages.filter(element=>{     
      // console.log(arr)
        if(element.roomid.includes(house.rooms[i])){
          return element
        }
    });
    // console.log("rooms",rooms);
    let image = [];
    for(var k=0 ;k< rooms.length;k++){
    //   console.log("img",rooms[k].image);
       image.push(rooms[k].image);
    }
    rooms = rooms[0];
    console.log("rooms",rooms?.roomid);
    let room1={
      id: rooms?.roomid,
      images :image
    }
    object.push(room1);
    
  }
//   console.log("object",object);
  let object2 = [];
  for(let i=0;i<room.length ;i++){
      for(let j=0;j<object.length;j++){
        // console.log("rooid,",room[0]._id);
        if(room[i]._id == object[j].id ){
            //  object.assign(room[i],object[j].images)
            room[i].images = object[j].images;
          break;
        }
      }
      console.log("room",room);
      object2.push(room);  
  }
//   console.log("object2",object2);
  house.rooms = object2[0];
 res.status(200).json({
    data:{
        house
    }
 })
}

// // @put method
// // update house data 

exports.updatehouse = (req,res)=>{
    let query = {_id:req.params.houseid};
    // console.log("query",query);
   let  value =  req.body ; 
    // console.log("value",value);
    let data = {$set:value};
    House.updateOne(query,data).then(result=>{
        res.status(201).json({
            message:"house data update successfully",
            data:result
        });
    })
    .catch(err=>{
        res.status(500).json({
            message:"something err went wrong in database",
            Error:err
        })
    })
}

// @put method
// Delete house data 

exports.deletehouse = (req,res)=>{
    let query = {_id:req.params.houseid};
    House.deleteOne(query).then(result=>{
        res.status(201).json({
            message:"house data deleted successfully",
        });
    })
    .catch(err=>{
        res.status(500).json({
            message:"something err went wrong in database",
            Error:err
        })
    })  
}
