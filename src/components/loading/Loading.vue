<template>
    <!-- <div class="loading">
        <div class="outer">
        </div>
         <div class='inside'>
         </div>
    </div> -->
    <el-container 
    v-loading="loading" 
    element-loading-text="拼命加载中..." 
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255,255,255,1)"
    >

    </el-container>
</template>


<script>

export default {
    name: "Loading",
    data(){
        return {
            loading: true
        }
    }
}
</script>


<style lang="scss" scoped>

    .el-container{
        width: 100vw;
        height: 50vh;
    }
   .loading{
       width: 100vw;
       height: 50vh;
       display: flex;
       justify-content: center;
       align-items: center;
       position: relative;
       background-image: url(https://www.hualigs.cn/image/60b63ed11d22f.jpg);
       background-repeat: no-repeat;
       background-size: 180px 130px;
       background-position: 50% 50%;
       .outer{
           width: 200px;
           height: 200px;
           border-radius: 50%;
           border-top: 5px solid #bfc;
           border-left: 5px solid #ff0;
           border-right: 5px solid transparent;
           border-bottom: 5px solid transparent;
           position: relative;
           animation: outer 2s linear infinite;
           
       }
       .inside{
               width: 125px;
               height: 125px;
               border-radius: 50%;
               border-top: 5px solid transparent;
               border-left: 5px solid transparent;
               border-right: 5px solid #f00;
               border-bottom: 5px solid #5bc0de;
               position: absolute;
               animation: inside 2s linear infinite;
           }
   }

   @keyframes outer{
         0%{
             transform: rotate(0);
         }
         100%{
             transform: rotate(360deg);
         }
   }

   @keyframes inside {
        0%{
            transform: rotate(0);
        }
        100%{
            transform: rotate(-360deg);
        }
   }
</style>