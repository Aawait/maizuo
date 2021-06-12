<template>
  <div id="login">
     
    <el-container>
      <el-header>登录</el-header>
       <div class="logo">
          <img src="~assets/img/loginLogo.png" alt="">
      </div>
          <el-form :model="loginForm" :rules="rules" ref="loginForm">
            <el-form-item label="手机号" prop="mobile">
              <el-input type="text" placeholder="请输入手机号" v-model="loginForm.mobile"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="text" placeholder="请输入密码" v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="submit('loginForm')">登录</el-button>
            </el-form-item>
          </el-form>
    </el-container>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: "Login",
   data() {
  
      return {
        loginForm: {
          mobile: '',
          password: '',
        },
        rules: {
            // 设置检验表单规则

            // 设置手机号的规则
            mobile:[
                {
                    required: true,
                    message: "请输入手机号",
                    trigger: "blur"
                },
                {
                    pattern: /^1[3-9]\d{9}$/,
                    message: "手机号格式错误",
                    trigger: "blur"
                }
            ],
            // 设置检验密码的规则
            password: [
                {
                    required: true,
                    message: "请输入密码",
                    trigger: "blur"
                },
                {
                    min:6,
                    max:14,
                    pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/,
                    message: "密码为6-14位字母或数字组合",
                    trigger: "blur"
                }
            ]
        }
      };
    },
    methods: {
        
          submit(loginForm){
       
               // 访问子组件el-form的validate方法
               this.$refs[loginForm].validate(valid=>{
                   // valid就是 el-form正则验证的结果会传到这里来 true或false
                     if(valid){
                         console.log("验证通过了，发送请求~~~");
                         axios({
                             url: "http://127.0.0.1:3000/login",
                             method: "POST",
                             data: this.loginForm
                         })
                         .then(res=>{
                             // 登陆成功
                             if(res.data.code === 1){
                                
                                 this.$message({
                                     type: "success",
                                     message: res.data.msg + ',即将前往首页'
                                 })
                                 console.log(res);

                                 // 把用户的手机号和token推入vuex中
                                 this.$store.commit('userlogin',res.data.data.mobile);
                                 this.$store.commit('addtoken',res.data.token)

                                 // 将token保存到本地
                                //  localStorage.setItem('token',res.data.token)
                                //  localStorage.setItem('mobile',res.data.data.mobile)
                                 setTimeout(()=>{
                                     this.$router.push('/movie')
                                 },1000)
                             }else{
                                 // 登陆失败
                                 this.$message.error(res.data.msg)

                             }
                         })
                     }
               })
          }
    },
     created() {

         setTimeout(()=>{
              this.eventBus.$emit("tabbar", false);
         },0);
      
     },
     destroyed() {
         setTimeout(()=>{
             this.eventBus.$emit("tabbar", true);
         },0)
       
     },
};
</script>

<style lang="scss" scoped>
  
  #login{
      margin:20px 0;
  }

  .logo{
      height: 60px;
      margin: 30px 0;
      text-align: center;
      img{
          width: 60px;
          height: 60px;
      }
  }
  
  .el-header{
      text-align: center;
      line-height: 60px;
      font-weight: 600;
      color:#ff5f16;
  }

  .el-form{
      width: 80vw;
      margin: 20px auto;
  }

  .el-button{
      width: 100%;
      height: 44px;
      background: #ff5f16;
      color: #fff;
  }
</style>