<template>
     <div class="tabbar-item" :class="{active:isActive}" @click="tabbarClick">
         <!-- <router-link :to="path"> -->
           <slot name="nav-icon"></slot>   
           <slot name="nav-text"></slot> 
           <!-- <span>{{$route.path}}</span> -->
         <!-- </router-link> -->
     </div>
</template>


<script>
export default {
    name: "TabBarItem",
    props: ['path'],
    data(){
        return {
            
        }
    },
    computed:{
       isActive(){
           // 哪一个路由处于活跃，$route就是哪一个路由
          //  return  this.path === this.$route.path;
          // 如果没有包含这个字符返回-1 
           return this.$route.path.indexOf(this.path) != -1
       }
    },
    methods: {
      tabbarClick(){

          this.$router.push(this.path);
      }
    },
}
</script>

<style lang="scss" scoped>
   .tabbar-item{
       flex: 1;
       display: flex;
       flex-direction: column;
       justify-content: center;
       align-items: center;
       color: #797d82;
       text-decoration: none;
        span{
            font-size: 12px;
        }
        i{
            font-size: 20px;
        }
       
    }

     .active{
           color: #ff5f16;
       }


</style>