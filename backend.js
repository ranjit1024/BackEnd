const express = require("express");
const cors = require('cors')
const env = require("dotenv").config({path:"./port.env"});

const port = process.env.PORT || 3000;
const app = express();
app.use(cors());


app.get("/sum", (req, res)=>{
    const a = Number(req.query.a);
    const b = Number(req.query.b);
    const result = a+b;
    let value = String(result);
    res.send(value)
})

app.listen(port, ()=>{
    console.log(`listing on port number ${port}`)
})