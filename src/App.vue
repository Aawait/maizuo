<template>
  <div id="app">

      <router-view></router-view>
      <tab-bar v-if="tabBarShow"></tab-bar>
  </div>
</template>

<script>

import TabBar from 'components/tabbar/TabBar'

export default {
   name: "App",
   components: { 
      TabBar
   },
   data(){
      return {
         tabBarShow: true
      }
   },
   created(){
      // 接收子组件传递过来的事件,并把传过来值赋给tabTarShow
      // console.log(this.eventBus);
      // 利用事件列车绑定监听自定义事件
      this.eventBus.$on('tabbar',flag=>{
         this.tabBarShow = flag
      })
   }

}
</script>

<style>
   @import 'assets/css/base.css';
</style>
