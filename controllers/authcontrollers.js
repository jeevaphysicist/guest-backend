const user = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.createaccount = async (req,res)=>{
    let {username,password,phoneNo,confrim_password,email} =req.body;
    
    // regular expression for  check given details are correct are not
    let email_pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i ;
    let phone_pattern = /^\d{10,10}$/i ;

    //error collection 
     let error = [];

    //  checking required details correct or not
    if(!username){
       error.push({username:"required"});
    }
    if(!email){
        error.push({email:"required"});
     }
     if(!phoneNo){
        error.push({phoneNo:"required"});
     }
     if(!password || password.length < 8 ){
        error.push({password:"Atleast 8 charc"});
     }
     if(!confrim_password){
        error.push({confrim_password:"required"});
     }
     if(password != confrim_password ){
        error.push({confrim_password:"Mismatch password"});
     }
     if(email_pattern.test(email) == false){
       error.push({email:"Invalid email format"});
     }
     if(phone_pattern.test(phoneNo) == false){
        error.push({phoneNo:"must contain only 10 digits"});
     }

    //  Any error occur return error otherwise execute remaining code 
     if(error.length > 0){
        return res.status(201).json({
            message:"wrong data",
            error:error
        });
     }

    //  hashing password by using bcryptjs module
     const salt = bcrypt.genSaltSync(10);
     const hash = bcrypt.hashSync(password, salt);
     password = hash ;

     const data = {
        username:username,
        email:email,
        password:password,
        phoneNo:phoneNo
     }
    //  console.log(data);

    // check user is exist or not 
    // if user exist its return error  or not exist give message successfully registered
     let filter = {email:email};
    user.find(filter).then(result=>{
          if(result.length > 0){
                   res.status(401).json({
                    message:"User Already exist",
                    create:false
                   })
          }
          else{
            user.create(data).then(output=>{
                res.status(201).json({
                    message:"Successfully registered",
                    create:true
                })

            })
            .catch(err=>{
                res.status(500).json({
                    message:"something went wront in database",
                    error:err
                })
            })
          }
     })
     .catch(err=>{
        res.status(500).json({
            message:"something went wrong in database",
            error:err
        });
     });
}


// first check user is exist or not
//  if exist ,next go to check the password is correct or not  
//  correct means login successfully
exports.login = async (req,res)=>{
    let {email,password} = req.body ;
    let filter = { email:email };

    user.find(filter).then(result=>{
        if(result.length == 0){
            res.status(200).json({
                message:"Invalid Email ID",
                isloggedin:false
            })

        }
        else{
            // check hashing password and user password is correct or not 
            // if it matches , reso is true otherwise reso is false
             bcrypt.compare(password, result[0].password,(err,reso)=>{
                const { password ,admin ,...otherdetails} = result[0]._doc;
                if(reso)
                {
                    const token = jwt.sign({id:result[0]._id,isAdmin:result[0].admin},process.env.JWT);
                  res.cookie("Access_token",token,{
                    httpOnly:true
                  }).status(201).json({
                    message:"user Login successfully",
                    data:otherdetails,
                    isloggedin:true
                  })
                }
                else{
                    res.status(401).json({
                        message:"Invalid password",
                        isloggedin:false
                    })
                }
             });
        }
    })
    .catch(err=>{
        res.status(500).json({
            message:"something went wrong in database",
            error:err
        })
    })
}


// @put method
// update user account 

exports.updateuser = (req,res)=>{

    let query = {_id:req.params.id};
    // console.log("query",query);
    let  value =  req.body ; 
    // console.log("value",value);
    let data = {$set:value};
    user.updateOne(query,data).then(result=>{
        res.status(201).json({
            message:"user data update successfully",
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
// Delete user account 

exports.deleteuser = (req,res)=>{
    let query = {_id:req.params.id};
    user.deleteOne(query).then(result=>{
        res.status(201).json({
            message:"user data deleted successfully",
        });
    })
    .catch(err=>{
        res.status(500).json({
            message:"something err went wrong in database",
            Error:err
        })
    })  
}