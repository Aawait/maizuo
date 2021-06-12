

// 封装axios
import axios from '@/api/axios'

// 导出电影首页的网络请求数据
export function hotListData(config){

    const instance = axios.create({
        baseURL: 'https://m.maizuo.com',
        timeout : 10000,
        headers: {
            "X-Client-Info": '{"a":"3000","ch":"1002","v":"5.0.4","e":"1598087896889693885431809","bc":"110100"}',
            "X-Host": "mall.film-ticket.film.list"
        }
    })

    // 2. axios的拦截器
    //  - 请求拦截
    instance.interceptors.request.use(config=>{
        //  config.aaa = 'hello axios'
        // 一般拦截下来发送请求的配置，进行一些操作。比如config里的信息不符合服务器的要求，这时候就要拦截下来添加或者更改一下
        //  拦截操作完后一定要返回config，否则服务器拿不到请求的config配置
       return config

    },err => {
        console.log(err);
    })

    //  - 响应拦截
    instance.interceptors.response.use(res => {
        // res就是服务器返回来的响应结果
        // 一般用来处理数据，有些数据不要或者要过滤
        
        // console.log(res);
        // 拦截操作完后也一定要返回，不然客户端拿不到请求结果
        return res.data
    },err => {
        console.log(err);
    })

    return instance(config)
    
}
