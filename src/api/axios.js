
// 封装axios网络请求

import axios from 'axios'

// 添加网络请求拦截器 axios请求来之前会经过这里 给请求体添加一些请求头

axios.interceptors.request.use(function(config){

    let host = '';
    let info = config.headers.info
    // 先要明白会进入else 里面请求电影列表的信息  其他info的变换以后会有新axios API学习 

    if ("info" == info) {
        // 详情页面的头
        host = "mall.film-ticket.film.info";
    } else if ("cinema" == info) {
        // 影院列表的请求头
        host = "mall.film-ticket.cinema.list";
    } else if ("city" == info) {
        // 城市列表的请求头
        host = "mall.film-ticket.city.list";
       
    } else if ("message" == info) {
        // 资讯列表的请求头
        host = "mall.act.static-page.info";
    } else {
        // 列表信息的头
        host = "mall.film-ticket.film.list";
    }
    config.headers = {
        "X-Client-Info": '{"a":"3000","ch":"1002","v":"5.0.4","e":"1598087896889693885431809","bc":"110100"}',
        "X-Host": host,
    };

    return config
},function(error){
    return Promise.reject(error)
})



export default axios