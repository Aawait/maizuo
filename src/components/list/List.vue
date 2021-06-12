<template>
       <loading v-if="data.length == 0"></loading>
       <ul class="list" v-else ref="showlist">
           <li v-for="(item,index) in data" class="listitem" :key="index" @click="goDetails(item.filmId)">
               <div class="item-left">
                   <img :src="item.poster" alt="">
               </div>
               <div class="item-middle">
                  <div class="middle-header">
                      <span class="name">{{item.name}}</span>
                      <span class="num">{{item.item.name}}</span>
                  </div>
                  <div class="middle-score" v-if="option.params.type == 1">
                       <span class="label">观众评分</span>
                       <span class="score">{{item.grade?item.grade:'暂无'}}</span>
                  </div>
                  <div class="middle-actor">
                       <span>主演：{{item.actors | actor}}</span>
                  </div>
                  <div class="middle-coun" v-if="option.params.type == 1">
                       <span>{{item.nation}}</span>&nbsp;|&nbsp;<span>{{item.runtime}}分钟</span>
                  </div>
                  <div class="middle-coun" v-if="option.params.type == 2">
                       <span>上映时间：</span><span>{{item.premiereAt | formatTime}}</span>
                  </div>
               </div>
               <div class="item-right" v-if="option.params.type == 1">
                   <button class="buy">购票</button>
               </div>
               <div class="item-right" v-if="option.params.type == 2 && item.isPresale">
                   <button class="pre">预购</button>
               </div>
           </li>
       </ul>
</template>


<script>

import axios from '@/api/axios'
import loading from 'components/loading/Loading'
export default {
    name: "List",
    props: {
        option: {
            type: Object,
            required: true,
            default(){
                return {}
            }
        },
    },
    components: {
        loading
    },
    created(){
        // 组件一创建立即发送请求获取列表数据,option为父组件传递过来的对象为网络请求的参数
         this.getlistData(this.option)  
    },
    data(){
        return {
           data:[],
           flag: false  // 定义标识用于节流
        }
    },
    methods: {
        goDetails(filmId){
            // 点击触发动态路由,并把电影id传到详情页
            this.$router.push('/details/'+filmId);
        },
        async getlistData(option){
            // 配置axios请求头
            axios.defaults.headers.info = ''
            let res = await axios(option)

              // 每次请求十条数据合并在一起
             this.data = this.data.concat(res.data.data.films)

            // 如果已经请求完了所有数据 就把标识关闭 不让继续请求了
            if(this.data.length >= res.data.data.total){
                this.flag = false
            }else{
                this.flag = true  // 数据完请求就把标识打开 就能请求下一次10条数据
            }
        }
    },
    updated(){

        let top = this.$refs.showlist.offsetHeight  // list的高度
        let height = window.innerHeight - 40   // 浏览器可视区域的高度减去tabbar高度
           window.onscroll = () =>{
                
               if(Math.ceil(window.scrollY) >= top - height && this.flag){
                     this.flag = false;
                     this.option.params.pageNum ++
                     this.getlistData(this.option);
               }
               
           }
    },
    mounted(){

    },
    watch: {
      
    },
    filters: {
        actor(value){
            let str = '';
            if(value){
                value.forEach(item=>{
                    str += item.name + ' '
                })
            }else{
                str = "暂无数据"
            }

            return str
            
        },
        formatTime(value){
            // 时间戳转换
            value = value *1000;
            let time =  new Date(value).toLocaleString();  // "2021/6/4上午8:00:00"
             //  2021/6/4 -> 2021-6-4
            time = /\d{4}\/\d+\/\d+/.exec(time)[0].replace(/\//g,'-'); 
            //  2021-6-4 -> 5
            let day = new Date(time).getDay();
            let week;
            switch(day){
               case 1:
               week = "周一"
               break
               case 2:
               week = "周二"
               break
               case 3:
               week = "周三"
               break
               case 4:
               week = "周四"
               break
               case 5:
               week = "周五"
               break
               case 6:
               week = "周六"
               break
               case 0:
               week = "周日"
               break
            }

            return week +' '+ time
        }
    }
}
</script>

<style lang="scss" scoped>
    .list{
         padding: 0 15px;
        .listitem{
            padding: 15px 0;
            display: flex;
            font-size: 13px;
            border-bottom: 1px solid #ededed;
          
            .item-left img{
                border-radius: 2px;
                width: 66px;
                height: 96px;
            }

            .item-middle{
                width: 210px;
                padding: 0 10px;
                color: #797D82;
               .middle-header{
                   margin-bottom: 5px;
                   display: flex;
                   align-items: center;
                   .name{
                   font-size: 16px;
                   margin-right: 5px;
                   color: #191A1b;
                 }

                 .num{
                   background: #D6D2DC;
                   font-size: 9px;
                   color: #fff;
                   height: 14px;
                   line-height: 14px;
                   padding: 0 2px;
                   border-radius: 2px;
                  }
               } 
               .middle-score{
                   margin-bottom: 5px;
                   .score{
                   font-size: 14px;
                   color: #ffb232;
                   margin-left: 5px;
                   }
               }
               .middle-actor{
                   text-overflow: ellipsis;
                   overflow: hidden;
                   white-space: nowrap;
                   margin-bottom: 5px;
               }

        }

        .item-right{
            width: 50px;
           display: flex;
           align-items: center;
            button{
              width: 100%;
              height: 25px;
              border-radius: 4px;
              background: #fff;
            }

            .buy{
              border: 1px solid #ff5f16;
              color:#ff5f16;
            }
            .pre{
              border: 1px solid #ffb232;
              color:#ffb232;
            }


        }
    }
}
</style>