import express from 'express';
const app=express();
const http=require('http').createServer(app)
const port = process.env.PORT || 3000

http.listen(port,()=>{
    console.log('listening on port :'+port);
})
app.get('/',(req,res)=>{
    res.send()
})