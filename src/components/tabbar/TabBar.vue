<template>

  <div id="tabbar">
       <tab-bar-item path="/movie">
             <i slot="nav-icon" class="iconfont icon-dianying1"></i>
             <span slot="nav-text">电影</span>
       </tab-bar-item>
       <tab-bar-item path="/cinema">
             <i slot="nav-icon" class="iconfont icon-yingyuan"></i>
             <span slot="nav-text">影院</span>
       </tab-bar-item>
        <tab-bar-item path="/message">
             <i slot="nav-icon" class="iconfont icon-xiaoxi"></i>
             <span slot="nav-text">资讯</span>
       </tab-bar-item>
        <tab-bar-item path="/profile">
             <i slot="nav-icon" class="iconfont icon-wode2"></i>
             <span slot="nav-text">我的</span>
       </tab-bar-item>
  </div>

</template>


<script>
import TabBarItem from './TabBarItem'

export default {
    name: "TabBar",
    components: {
        TabBarItem
    }
}
</script>
<style lang="scss" scoped>

  #tabbar{
      height: 49px;
      display: flex;
      position: fixed;
      bottom:0 ;
      left: 0;
      right: 0;
      background: #fff;
      box-shadow: 0 -2px 2px rgba(201,201,201,0.2);
  }
  
</style>