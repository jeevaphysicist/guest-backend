const mongoose = require('mongoose');

// create user schema 
const roomimgSchema = mongoose.Schema({
                   houseid:{
                         type:String,
                         required:true
                   },
                   roomid:{
                    type:String,
                    required:true
                   },
                  image:{
                    type:String,
                    required:true
                  }
},{timestamps:true});

module.exports = mongoose.model("Roomimages",roomimgSchema,"Roomimages");