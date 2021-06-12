// 配置路由相关
import Vue from 'vue'
import VueRouter from 'vue-router'

// 1. 使用插件
Vue.use(VueRouter)

//获取原型对象上的push函数,这是防止路由连续跳同一个位置会报错
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

import movie from './routers/movie'
import cinema from './routers/cinema'
import message from './routers/message'
import profile from './routers/profile'
import details from './routers/details'
import citys from './routers/citys'
import login from './routers/login'
import register from './routers/register'
// 2. 配置路由映射关系
const routes = [
  {
    path : '/',
    redirect : '/movie',
  },
  movie,
  cinema,
  message,
  profile,
  details,
  citys,
  login,
  register
 
]

const router = new VueRouter({
  // 把配置好的路由挂到Vuerouter对象上
  routes,
  // 配置url模式，默认为hash
  mode: 'history',
  // 更改路由活跃时添加的class
  linkActiveClass: 'active'
})


// 添加路由守卫，登录用户和不登录用户的异同
router.beforeEach((to,from,next)=>{
  
  // 没登陆的用户不能去的地方在这个数组里
  const arr = ['/cinema']

  // 不去影院页的时候，让同行
  if(!arr.includes(to.path)){
    next()
  }else{
  //去影院的话 如果有token，也可以通行
    if(localStorage.getItem('token')){
      next()
    }else{
      // 没有只能去登录
      next('/login')
    }
  }
})

// 3. 导出路由
export default router
