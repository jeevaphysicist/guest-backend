const Room = require('../models/room');
const House = require('../models/house');

// @post method 
// create Room data 
exports.createaroom = (req,res)=>{
    let {houseid,name,price,amenities,Aboutrooms,maxDays,minDays,bed,floorsize} =req.body;
    let Data  =  {
        houseid,
        name,
        price,
        amenities,
        Aboutrooms,
        maxDays,
        minDays,
        bed,
        floorsize
    };
//   console.log("data",Data);
    Room.create(Data).then(result=>{
         let query={_id:houseid};
         let newdata = {$push: {rooms:result._id}}
         House.updateOne(query,newdata).then(result=>{
            console.log("result",result);
         }).catch(err=>console.log("error",err)) ;
        res.status(201).json({
            message:"Room created successfully",
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
// update room data 

exports.updateroom = (req,res)=>{
    let query = {_id:req.params.roomid};
    console.log("query",query);
   let  value =  req.body ; 
    console.log("value",value);
    let data = {$set: value};
    Room.updateOne(query,data).then(result=>{
        res.status(201).json({
            message:"room data update successfully",
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
// Delete room data 

exports.deleteroom = (req,res)=>{
    let query = {_id:req.params.roomid};
    Room.deleteOne(query).then(result=>{
        res.status(201).json({
            message:"room data deleted successfully",
        });
    })
    .catch(err=>{
        res.status(500).json({
            message:"something err went wrong in database",
            Error:err
        })
    })  
}



