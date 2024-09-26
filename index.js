const express = require("express");
const env = require("dotenv").config({path:'port.env'});

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

//in memory data
var users = [{
    name:"ranjit",
    kidneys:[
        {
            healthy:true
        },
        {
            healthy:false
        }
    ]
}]
// done with in memory data setting

app.get("/", (req, res)=>{
    let numberOfKidneys = null;
    let numberOfHealthyKidneys = null;
    let numberOfUnhealthyKidneys = null;
    users.forEach(kindney => {
        numberOfKidneys = kindney.kidneys.length;
    })

    users.forEach(kidneys => {
        numberOfHealthyKidneys = kidneys.kidneys.filter(kidney =>{
            return kidney.healthy == true;
        })
    })
    
    users.forEach(kidneys => {
        numberOfUnhealthyKidneys = kidneys.kidneys.filter(kidney =>{
            return kidney.healthy == false;
        })
    });
    toString(numberOfKidneys)
    res.send(`you have a <span style="font-size:20px;font-weight:bold">${numberOfKidneys}</span> kidneys and <span style="color:green;font-size:20px;font-weight:bold">${numberOfHealthyKidneys.length}</span> are healthy and <span style="color:red; font-size:20px;font-weight:bold">${numberOfUnhealthyKidneys.length}</span> are unhealthy`)
});

app.post("/", (req,res)=>{
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy:isHealthy
    });
    console.log(req.body)
    res.json({
        msg:"Done!"
    })
})

app.put("/", (req, res)=>{
    users.forEach(kidney =>{
        kidney.kidneys.forEach(health => {
            if(health.healthy == false){
                health.healthy = true;
            }
        })
    });
    console.log(users[0])
    res.send("ok")
})

app.delete("/", (req, res)=>{
    if(!isTheirAnyUnhelthyKidneys){
        const newKidneys = [];
        for(let i = 0; i < users[0].kidneys.length; i++){
            if(users[0].kidneys.healthy){
                newKidneys.push({
                    healthy:true
                })
            }
        }
        users[0].kidneys = newKidneys;
        res.send("Done!")
    }else{
        res.sendStatus(411).json({
            msg:"you are fit and fine human"
        })
    }
}
)

function isTheirAnyUnhelthyKidneys(){
    let atLeastOneUnhealthyKidney = false;
    for(let i= 0; i < users[0].kidneys.length; i++){
        if(!users[0].kidneys[i].healthy){
            atLeastOneUnhealthyKidney = true;
        }
    }
    return atLeastOneUnhealthyKidney;
}

app.listen(port, ()=>{
    console.log(`listing on port ${port}`)
})