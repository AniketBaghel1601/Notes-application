const express = require('express');
const mongoose = require('mongoose');
const {UserModel} = require('../models/UserModel');
const  bcrypt  = require('bcrypt');
const jwt = require('jsonwebtoken');

const userRoute = express.Router();

userRoute.post('/register',async(req,res)=>{
    const {name,email,password} = req.body;
    const user = await UserModel.findOne({email});
    if(user){
        res.status(200).json({msg : "You are already registered please login!"})
    }
    else{
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                res.status(200).json({error : err});
            }
            else{
                const newUser =  new UserModel({name,email,password:hash});
               await newUser.save();
                res.status(200).json({msg : "new user got registered"});
            }
        })
    }
})

userRoute.post('/login',async(req,res)=>{
    const {email,password} = req.body;
    const user = await UserModel.findOne({email});
    if(user){
        bcrypt.compare(password,user.password,(err,result)=>{
            if(err){
                res.status(200).json({error : err});
            }
            else{
                const token = jwt.sign({userId : user._id, username : user.name},"Aniket");
                res.status(200).json({msg : "login successful!", token});
            }
        })
    }
    else{
        res.status(200).json('please register');
    }
})

userRoute.get('/usersData',(req,res)=>{
    res.status(200).json({msg : "All users data..."});
})

module.exports = {
    userRoute
}