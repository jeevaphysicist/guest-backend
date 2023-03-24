const mongoose = require('mongoose');

// create user schema 
const roomSchema = mongoose.Schema({
                  houseid:{
                         type:String,
                         required:true
                   },
                   name:{
                    type:String,
                    required:true
                   },
                   price:{
                    type:Number,
                    required:true
                   },
                   amenities:{
                        type:String,
                        required:true
                   },
                   bed:{
                    type:String,
                    required:true
                   },
                   floorsize:{
                    type:String,
                    required:true
                   },
                   maxDays:{
                   type:String,
                   default:true
                  },
                  minDays:{
                   type:String,
                   required:true
                  },
                   features:{
                    type:Boolean,
                    default:true
                   },
                   unavialableDates:{  
                    type:Array
                   },
                   records:{
                    type:Array
                   },
                   images:{
                    type:Array
                   }              
                   
               },{timestamps:true});

module.exports = mongoose.model("Room",roomSchema,"Room");