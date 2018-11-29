const express=require("express");
const Router=express.Router();

const userModel=require('../model/userModel.js');
const mail=require('../email.js');
const util=require('../utils/util.js');
let obj={};

Router.post("/login",(req,res)=>{
     // res.send("登录OK");
    let{user,password}=req.body;
    userModel.find({user,password})
    .then((data)=>{
        console.log(data);
        if(data.length>=1){
            return res.send("登录成功");
        }
        res.send("登录失败");
    });
});

Router.post("/reg",(req,res)=>{
    // res.send("注册OK！");
    
    let{user,password,code}=req.body;
    if(obj[user]!=code){
        return res.send(util.sendData(-1,'验证码错误',null) );
    }
    userModel.insertMany({user,password})
    .then((data)=>{
      res.send(util.sendData(0,'注册成功 请登录',null));
        
    })
    .catch((err)=>{
        console.log(err);
        res.send(util.sendData(-1,'注册失败',null))
    })
});



Router.post('/getcode',(req,res)=>{
    let email=req.body.email
    console.log(email)
    if (!email||email=="") {return res.send(util.sendData(-1,'参数错误',null))}

    let num1=(parseInt(Math.random()*(9999-1000))+1000).toString();
    //生成验证码
    //
    mail.sendmail(email,num1)
    .then((resolve)=>{
        obj[email]=num1
        //保存验证码信息
        // console.log(obj);成功
        res.send(util.sendData(0,'验证码发送成功',null));
    })
    .catch((err)=>{
        console.log(err)
        res.send(util.sendData(-1,'验证码发送失败',null))
    })
    
})
module.exports=Router;