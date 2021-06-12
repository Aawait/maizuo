
// 配置连接mangodb数据库
const mongoose = require('mongoose')

// 连接云数据库
mongoose.connect('mongodb+srv://zlc007:654321QWER@cluster0.hm4nf.mongodb.net/cici?retryWrites=true&w=majority',{ useNewUrlParser: true,useUnifiedTopology: true } )

mongoose.connection.on('connected',function(){
    console.log("云数据库连接成功");
})

mongoose.connection.on('disconnected',function(){
    console.log("云数据库连接断开");
})

mongoose.connection.on('error',function(){
    console.log("云数据库连接失败");
})


const userSchema = mongoose.Schema({
    "mobile": {type:Number},
    "password": {type:String}
})

module.exports = mongoose.model('vue-movies',userSchema)
