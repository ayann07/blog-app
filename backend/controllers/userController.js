const userModel=require('../models/userModel');
const bcrypt=require('bcrypt');


exports.getAllUsers=async(req,res)=>{
  try{
    const users=await userModel.find({})
    return res.status(200).send({
       userCount:users.length,
       success:true,
       message:"All users data", 
       users
    })
  }
  catch(err)
  {
    console.log(err);
    return res.status(500).send({
        message:"Error in get all users function",
        success:false,
        err
      })
  }
}

exports.registerUser=async(req,res)=>{
    try{
        const {username,email,password}=req.body;
        if(!username || !email || !password)
        {
            return res.status(400).send({
                success:false,
                message:"Please fill all the fields"
            })
        }
        const existingUser=await userModel.findOne({email:email})
        if(existingUser)
        {
           return res.status(401).send({
            success:false,
            message:"user already exists"
           })
        }
        const hashedPassword=await bcrypt.hash(password,10); 

        const user=new userModel({username,email,password:hashedPassword})
        await user.save();
        return res.status(201).send({
            success:true,
            message:"New user created!",
            user
        })

    }
    catch(err)
    {
      console.log(err);
      return res.status(500).send({
        message:"Error in user registration",
        success:false,
        err
      })
    }
}

exports.loginUser=async(req,res)=>{
    try{
       const {email,password}=req.body;
       if(!email || !password)
       {
        return res.status(400).send({
            success:false,
            message:"Please fill all the fields"
        })
       }
       const user=await userModel.findOne({email});
       if(!user)
       {
        return res.status(401).send({
            success:false,
            message:"email is not registered"
        })
       }
       const isMatch=await bcrypt.compare(password,user.password)
       if(!isMatch)
       {
        return res.status(401).send({
            success:false,
            message:"Invalid username or password"
        })
       }
       return res.status(200).send({
        success:true,
        message:"login successful",
        user
       })
    }
    catch(err)
    {
        return res.status(500).send({
            message:"Error in login",
            success:false,
            err
          })
    }
}