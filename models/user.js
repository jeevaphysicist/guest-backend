const mongoose = require('mongoose');

// create user schema 
const authSchema = mongoose.Schema({
                   username:{
                    type:String,
                    required:true
                   },
                   email:{
                    type:String,
                    required:true
                   },
                   password:{
                    type:String,
                    required:true
                   },
                   phoneNo:{
                    type:Number,
                    required:true
                   },
                   admin:{
                    type:Boolean,
                    default:true
                   },
                   photo:{
                    type:String,
                    default:"avator"
                   }
},{timestamps:true});

module.exports = mongoose.model("user",authSchema,"User");