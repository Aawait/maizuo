<template>
   <loading v-if="listData.length == 0"></loading>
    <div class="citys" v-else>
           <div class="citys-top">
                 <nav-bar>
                    <div class="navbar-top" slot="navbar-top">
                          <div class="navbar-sm" slot="address" @click="$router.go(-1)">
                               <i class="iconfont icon-guanbi1" style="fontSize:20px"></i> 
                          </div>
                          <div class="navbar-bl" slot="type">当前城市</div>
                          <div class="navbar-sm" slot="search"></div>
                     </div>
                 </nav-bar>
                 <div class="search">
                       <div class="icon">
                           <i class="iconfont icon-sousuo1"></i>
                       </div>
                       <div class="input">
                            <input type="text" placeholder="输入城市名或拼音">
                       </div>
                 </div>
            </div>
            <div class="hotcity">
                <div class='hottitle'>GPS定位你所在的城市</div>
                <ul>
                    <li>定位失败</li>
                </ul>
                <div class='hottitle'>热门城市</div>
                <ul class="hotlist">
                    <li class="hotitem" v-for="(item,i) in hotList" :key="i" @click="goCinema(item)">{{item.name}}</li>
                </ul>
             </div>
              <!-- 使用vant组件生成城市列表 -->
               <van-index-bar :index-list="indexList">
                  <div  v-for="(item,i) in listData" :key="i">
                    <van-index-anchor :index="item.index" style="background:#f4f4f4">{{item.index}}</van-index-anchor>
                    <van-cell v-for="city in item.data" :title="city.name" :key="city.cityId" @click="goCinema(city)"/>
                  </div>
               </van-index-bar>
    
    </div>
</template>

<script>

import Loading from 'components/loading/Loading'
import NavBar from 'components/navbar/NavBar'
import axios from '@/api/axios'

export default {
    name: "Citys",
    data(){
        return {
           option: {
              url: "https://m.maizuo.com/gateway",
              method: "GET",
              info: "city",
              params: {
                  k: 2089518
              }
           },
           letter: [],
           indexList:[],
           listData: [],
           hotList: []
        }
    },
    created(){
        // 循环生成26个字母

       for(let i = 65;i <= 90;i++){
           this.letter.push(String.fromCharCode(i))
       }

       this.getCityList(this.option)

       this.eventBus.$emit('tabbar',false)

    },
    components: {
        NavBar,
        Loading
    },
    methods: {
       async getCityList(option){
           axios.defaults.headers.info = option.info
           let res = await axios(option)

           // 拿到城市列表数据并处理
           this.letter.forEach(z => {
               let arr = res.data.data.cities.filter(item=>{
                   return z == item.pinyin.slice(0,1).toUpperCase()
               })
               if(arr.length > 0){
                   this.indexList.push(z)
                   this.listData.push({
                       index: z,
                       data: arr
                   })
               }
           })
           
           // 拿到热门城市数据
           this.listData.forEach(item=>{
                   item.data.forEach(city=>{
                        if(city.isHot == 1){
                           this.hotList.push(city)
                        }
                    })
           })
              
       },

       goCinema(city){
     
        //   console.log(city);
        // 将城市数据获取 并提交到store数据中心
          this.$store.commit('getCity',city)
          this.$router.push('/cinema')
       },

    },
    destroyed(){
        this.eventBus.$emit('tabbar',true)
    }

    
}
</script>

<style lang="scss" scoped>
   .citys{
    
       .citys-top{
        position: sticky;
        top: 0;
        z-index: 100;
       .search{
           width: 100vw;
           box-sizing: border-box;
           height: 49px;
           padding: 10px 15px;
           background: #f4f4f4;
           display: flex;

           .icon{
               height: 30px;
               padding-left: 10px;
               background: #fff;
               i {
                   font-size: 18px;
                   color: #797d82;
               }
           }

           .input{
               flex: 1;
               background: #fff;
                input{
                    padding-left:5px;
                    border: none;
                    color: #797d82; 
                    font-size: 12px;
                    &::placeholder{
                        font-size: 12px;
                        color: #797d82;
                    }

           }
       }
   }
       }

       .hotcity{
           box-sizing: border-box;
           width: 100vw;
           padding: 15px 0 0 15px;
           .hottitle{
               margin-bottom: 10px;
               font-size: 13px;
               color: #797D82; 
           }
           ul{
                overflow: hidden;
                   li{
                       width: 100px;
                       height: 30px;
                       text-align: center;
                       line-height: 30px;
                       float: left;
                       margin: 0 8px 15px 8px;
                       background: #f4f4f4;
                       font-size: 14px;
                       color: #191A1b;
                   }
               }
       }
}
</style>