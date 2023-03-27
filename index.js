const express=require("express")
const { connection } = require("./db")
require('dotenv').config()
const cors=require("cors")
const {UserRouter}=require("./routes/user.route")
const PostRouter = require("./routes/post.route")
const { auth } = require("./middleware/auth.middleware")
const app=express()
app.use(express.json())
app.use(cors())

app.use("/users",UserRouter)
app.use(auth)
app.use("/posts",PostRouter)

app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("Connected To DB")
    }catch(err){
        console.log(err)
    }
    console.log("Server Is Running")
})