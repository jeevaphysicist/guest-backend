const Roomimages = require('../models/roomimg');


// @POST method 
// upload images

exports.uploadimages = (req,res)=>{
      let {houseid,roomid,image} = req.body; 
      let data = {
        houseid,
        roomid,
        image
      };
      // console.log("data",data);
      Roomimages.create(data).then(result=>{
        res.status(201).json({
          message:"image upload successfully",
          data:result
        })
      })       
      .catch(err=>{
        res.status(500).json({
          message:"something went wrong in data upload",
          Error:err
        })
      })
}


// for my checking purpose 
exports.getimagesbyhouseid = (req,res)=>{
      let filter = req.params.id;

      Roomimages.find({filter}).then(result=>{
        console.log("result",result);
      })
      .catch(err=>{
        res.status(500).json({
            message:"Something went wrong in database",
            error:err
        })
      })
}

