const mongoose = require('mongoose');

// create user schema 
const houseSchema = mongoose.Schema({
                   houseownerid:{
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
                   rooms:{
                    type:Array
                   },
                   address:{
                    type:String,
                    required:true
                   },
                   phoneNo:{
                    type:Number,
                    required:true
                   },
                   features:{
                    type:Boolean,
                    default:true
                   },
                   location:{
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
                   ratings:{
                        type:Number
                   },
                   distance:{
                        type:String,
                        required:true
                   },
                   picture:{
                    type:String,
                    required:true
                   }
},{timestamps:true});

module.exports = mongoose.model("House",houseSchema,"House");