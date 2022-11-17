const express = require('express');

const { MongoClient }= require('mongodb')

const connectionString = "mongodb://localhost:27017";

async  function init(){
    try{
    const client = new MongoClient(connectionString,{
        useUnifiedTopology: true
    });
    await client.connect();

    const app =express();

    app.get('/get',async(req,res) =>{
        try{
       
        const db = await client.db("student");
        const collection = db.collection('result');

        const cursor = await client.db("student").collection("result").find().toArray();
            console.log(cursor)
        res.json({status:"ok",cursor}).end();
        }catch(err){
            console.log(err)
        }
    })

    const PORT=3000;
    app.use(express.static('./static'));
    app.listen(PORT);
    console.log(`Runnig on ${PORT} `)
}catch(err){
    console.log(err)
}
    
}
init();