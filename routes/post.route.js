const express=require("express")
const PostRouter=express.Router()
const {PostModel}=require("../model/post.model")
const jwt=require("jsonwebtoken")

PostRouter.get("/",async(req,res)=>{
    const token=req.headers.authorization
    const decoded=jwt.verify(token,"deva")
    try{
        if(decoded){
            const posts=await PostModel.find({"userId":decoded.userId})
            res.status(200).send(posts)
        }
    }catch(err){
        res.status(400).send({"msg":err})
    }
})

PostRouter.post("/add",async(req,res)=>{
    try{
        const posts=new PostModel(req.body)
        await posts.save()
        req.status(200).send({"msg":"New Post Added"})
    }catch(err){
        res.status(400).send({"msg":err})
    }
})

module.exports=PostRouter;