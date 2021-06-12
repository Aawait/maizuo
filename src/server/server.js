
// 创建临时服务器用来连接数据库发请求
const express = require('express')

// 引入第三方包解决跨域请求
const cors = require('cors')

// 引入token
const jwt = require('jsonwebtoken')

// 引入数据库
const db = require('./db')

const app = express()
app.use(cors())

// 使用express的方法 接收post请求参数
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/',function(req,res){
    res.send("hello world")
})


app.post('/register',function(req,res){
     console.log("收到客户的的注册请求了");
     
     // 先查找有没有这个手机号
     db.findOne({mobile:req.body.mobile}).exec(function(err,data){
       
         if(err){
             throw err
         }
       
         // 有的话返回注册失败
         if(data){
             res.send({
                 msg: "用户已存在请重新输入",
                 code:0,
                 state:"注册失败"
             })
             return
         }
       
         // 没有再给注册
         db.insertMany({
             mobile: Number(req.body.mobile),
             password: req.body.password
         },function(err,data){
         
             if(err){
                 console.log(err);
                 return
             }
             if(data.length){
                 res.send({
                     msg:"用户注册成功",
                     code:1,
                     data,
                     state: "注册成功",
                 })
             }
             
             
         })


     })
})


app.post('/login',function(req,res){
    console.log("收到客户端的登录请求了");
 
    db.findOne({
        mobile: req.body.mobile*1,
        password: req.body.password
    }).exec((err,data)=>{
      
        if(err){
           console.log(err);
           return
        }

        if(data){
              // 生成token令牌 加密用户密码 abc是加密算法
           const token = jwt.sign({
            password: req.body.password
            },"abc")
            
            res.send({
                msg: "登录成功",
                code:1,
                data,
                token
            })
        }else{
            res.send({
                msg: "账号或密码错误登录失败",
                code:0,
                data
            })
        }
    })
})



app.listen(3000,function(){
    console.log("app is running at port 3000...");
})