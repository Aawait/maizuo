<template>
    <div id="profile">
        <div class="header">
               <img src="~assets/img/login.png" alt="">
               <div class="nologin" v-if="!$store.state.login.mobile">
                  <div class="nick-name" @click="login">立即登录</div>
                  <div class="register" @click="register">注册</div>
               </div>
               <div class="islogin" v-else>你好，{{$store.state.login.mobile}}</div>
        </div>
        <div class="profile-tab">
              <div class="tab-item">
                     <img src="~assets/img/kabao.png" alt="">
                     <span>电影订单</span>
              </div>
              <div class="tab-item">
                     <img src="~assets/img/dingdan.png" alt="">
                     <span>商品订单</span>
              </div>
        </div>

        <div class="profile-list">
              <ul>
                  <li>
                      <img src="~assets/img/maizuoquan.png" alt="">
                      <span class="label">卖座券</span>
                      <i class="iconfont icon-you2"></i>
                  </li>
                  <li>
                      <img src="~assets/img/hongbao.png" alt="">
                      <span class="label">组合红包</span>
                      <i class="iconfont icon-you2"></i>
                  </li>
                  <li>
                      <img src="~assets/img/yue.png" alt="">
                      <span class="label">余额   <span><i>￥</i>0</span> </span>
                      <i class="iconfont icon-you2"></i>
                  </li>
                  <li>
                      <img src="~assets/img/set.png" alt="">
                      <span class="label" @click="exit">退出</span>
                      <i class="iconfont icon-you2"></i>
                  </li>
              </ul>
        </div>
    </div>
</template>


<script>

export default {
    name: "Profile",
    methods: {
        login(){
            this.$router.push('/login')
        },
        register(){
            this.$router.push('/register')
        },
        exit(){
            localStorage.removeItem('mobile')
        }
    },
    mounted(){
        document.title = '个人中心'
    }

}
</script>

<style lang="scss" scoped>
   #profile{
       background: #f4f4f4;
       .header{
           width: 100vw;
           height: 150px;
           box-sizing: border-box;
           background-image: url("~assets/img/bg.a5bdd690.png");
           background-size: cover;
           background-position-y: -50px;
           display: flex;
           align-items: center;
           padding-left: 25px;
           img{
               width: 68px;
               height: 68px;
               border-radius: 50%;
               margin-right: 20px;
               border:2px solid #fff

           }
           .nick-name{
               font-size: 16px;
               color: #fff;
               margin-right: 10px;
               display: inline-block;
           }
           .register{
               font-size: 16px;
               display: inline-block;
               color: #fff;
           }
           .islogin{
                color: #fff;
                font-size: 16px;
           }
       }

       .profile-tab{
           height: 80px;
           background: #fff;
           margin-bottom: 10px;
           display: flex;

           .tab-item{
               width: 50vw;
               display: flex;
               flex-direction: column;
               justify-content: center;
               align-items: center;
               img{
                   width: 26px;
                   height: 26px;
                   margin-bottom: 5px;
               }
               span{
                   font-size: 13px;
                   color: #797d82;
               }

           }
       }

       .profile-list{
           font-size: 15px;
           color: #191a1b;
           background: #fff;
           padding: 0 15px;
           li{
               height: 50px;
               box-sizing: border-box;
               display: flex;
               align-items: center;
               border-bottom: 1px solid #ededed;
               img{
                   width: 20px;
                   height: 20px;
                   margin-right: 15px;
               }
               .label{
                   flex: 1;
                   display: flex;
                   justify-content: space-between;
                   align-items: center;
                   span{
                       color: #797d82;
                       font-size: 15px;
                       margin-right: 5px;
                       i{
                         font-size: 12px;
                         font-style: normal;
                       }
                   }
               }
               i{
                   font-size: 12px;
                   color: #797d82;
               }
           }
       }
   }
</style>