// 这是配置vuecli3 的文件路径别名
const path = require('path');

function resolve(dir){
    // path.join(__dirname)  设置绝对路径
    return path.join(__dirname,dir)
}


module.exports = {
    chainWebpack:(config)=>{
        config.resolve.alias
        //set第一个参数：设置的别名，第二个参数：设置的路径
        .set('@',resolve('./src'))
        .set('components',resolve('./src/components'))
        .set('assets',resolve('./src/assets'))
        .set('views',resolve('./src/views'))
        .set('network',resolve('./src/network'))
        //注意 store 和 router 没必要配置
　　　　
    }
}