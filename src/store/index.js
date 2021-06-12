import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/api/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    city:{
      cityId: 440100,
      isHot: 1,
      name: "广州",
      pinyin: "guangzhou"
    },
    cinemaList: [],
    actId: "ElzMZU125260",
    messageData: '',
    login: {
      username: '',
      mobile: '',
      token: ''
    }
  },
  mutations: {
     // 变异器函数 调用时会传递过来一个城市对象 然后更改state里面的city数据
     getCity(state,payload){

       state.city = payload
     },
     // 获取cinemaList参数并保存到state中
     getCinemaData(state,payload){

        state.cinemaList = payload.data.data.cinemas
  
     },
     // 获取资讯列表的数据
     getMessageData(state,payload){
       
         state.messageData = payload.data.data.data
     },

     // 登录成功后更改state里面的login.mobile
     userlogin(state,payload){
       state.login.mobile = payload
       localStorage.setItem('mobile',payload)
     },
     // 登陆成功后将token推入state
     addtoken(state,payload){
       state.login.token = payload
       localStorage.setItem('token',payload)
     }
  },
  actions: {
     asyncCinemaData(context){
        // 请求cinema列表数据
        axios.defaults.headers.info = "cinema"
         axios({
          url : "https://m.maizuo.com/gateway",
          method: 'GET',
          params: {
              ticketFlag: 1,
              k: 6734744,
              cityId: context.state.city.cityId
          }
        })
        .then(res=>{
          context.commit('getCinemaData',res)
        })
     },

     asyncMessageData(context){
    
       // 请求新闻列表数据
       axios.defaults.headers.info = "message"
       axios({
         url: "https://m.maizuo.com/gateway",
         method: "GET",
         params: {
          actId: context.state.actId
         }
       })
       .then(res=>{
         context.commit('getMessageData',res)
       })
     }

  },
  modules: {
  }
})
