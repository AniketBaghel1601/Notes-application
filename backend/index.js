const express = require('express');
const {connection} = require('./db');
const {userRoute} = require('./routes/UserRoute');
const {notesRoute} = require('./routes/notesRoute');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.cors());

app.get('/',(req,res)=>{
    res.status(200).json({msg : "this is the homepage"});
})

app.use('/users',userRoute);
app.use('/notes',notesRoute);


app.listen(8080,async()=>{
    await connection;
    console.log("connected to db");
    console.log("server is running at port 8080");
})