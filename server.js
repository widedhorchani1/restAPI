const express=require("express")
const mongoose=require("mongoose")
const app=express()
require('dotenv').config()
app.use(express.json())
app.use(require('./routes/index'))
mongoose.connect(process.env.url).then(console.log("connection with success")).catch((err)=>console.log(err))

app.listen(5000,(err=>{
    if(err){
        console.log(err)
    }
    console.log("server is running up")
}))