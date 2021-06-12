<template>
    <div id="register">
          <div class="header">
               <span>注册</span>
          </div>
          <el-form :rules="rules" ref="registerForm" :model="registerForm">
              <el-form-item label="手机号" prop="mobile">
                   <el-input type="text" placeholder="请输入手机号" v-model="registerForm.mobile"/>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                   <el-input type="text" placeholder="请输入密码" v-model="registerForm.password"/>
              </el-form-item>
              <el-button @click="submit('registerForm')">注册账号</el-button>
          </el-form>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    name: "Register",
    data(){
        return {
            rules: {
                mobile: [
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
                password: [
                    {
                        required: true,
                        message: "请输入密码",
                        trigger: "blur"
                    },
                    {
                        pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/,
                        message: "密码格式为6-14位字母或数字组合",
                        trigger: "blur"
                    }
                ]
            },
            registerForm: {
                mobile:'',
                password: ''
            }
        }
    },
    methods: {
        submit(form){
         
            // 调用子组件el-from的validate方法 state是该input的状态，如果通过了正则 则为true 反之为false
            this.$refs[form].validate(async (state)=>{
                if(state){

                    let res =await axios({
                        url: "http://127.0.0.1:3000/register",
                        method: "POST",
                        data: this.registerForm
                    })
                   
                //   用户名存在则 注册失败
                   if(res.data.code === 0){
                       this.$message.error(res.data.msg)
                   }else{
                       this.$message({
                           type: "success",
                           message: res.data.msg + "即将跳转登录"
                       })

                       setTimeout(()=>{
                           this.$router.push('/login')
                       },1000)
                   }

                }
            })
        }
    },
    created(){
        this.eventBus.$emit('tabbar',false)
    },
    destroyed(){
        this.eventBus.$emit('tabbar',true)
    }
}

</script>

<style lang="scss" scoped>
  #register{
       .header{
           height: 200px;
           width: 100vw;
           background-image: url("~assets/img/bg.a5bdd690.png");
           background-size: 100% 100%;
           border-radius:0 0 50% 50%;
           display: flex;
           justify-content: center;
           align-items: flex-end;
           span{
               width: 100px;
               height: 100px;
               background: #f2eada;
               box-shadow: 3px 3px 10px #9d9087 inset;
               text-align: center;
               line-height: 100px;
               font-size: 30px;
               color:#ff5f16 ;
               font-weight: 600;
               border-radius: 50%;
               margin-bottom: 20px;
           }
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
  }
</style>