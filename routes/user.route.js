const express=require("express")
const UserRouter=express.Router()
const jwt=require("jsonwebtoken")
const {UserModel}=require("../model/register.model")
const bcrypt=require("bcrypt")
UserRouter.post("/register",(req,res)=>{
    const {name,email,gender,password,age,city,is_married}=req.body
    try{
        bcrypt.hash(password,5,async(err,hash)=>{
            const user=new UserModel({name,password:hash,email,gender,age,city,is_married})
            await user.save()
            res.status(200).send({"msg":"Registration Done"})
        })
    }catch(err){
        res.status(400).send({"msg":err})
    }
})

UserRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    res.status(200).send({"msg":"Login Success","token": jwt.sign({"userId":user._id},"deva")})

                }else{
                    res.status(400).send({"msg":"Wrong Details"})
                }
            })
        }
    }catch(err){
        res.status(400).send({"msg":err})
    }
})

module.exports={UserRouter}