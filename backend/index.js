const express=require("express")
const app =express()
const bodyParser = require("body-parser")

require("dotenv").config({ path: ".env" });

const {userRoute} =require("../backend/src/route/index")
require("../backend/src/config/connection")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); 
app.use("/todo",userRoute)


app.listen(9000,()=>{
    console.log('server fire on 9000...port :>> ', );
})