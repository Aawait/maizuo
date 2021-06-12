<template>
         <loading v-if="!$store.state.cinemaList.length"></loading>
       <div class="cinema" v-else>
           <ul class="cinemalist">
               <li class="cinemaItem" v-for="(item,i) in $store.state.cinemaList" :key="i">
                  <div class="item-left">
                      <p>{{item.name}}</p>
                      <p>{{item.address}}</p>
                  </div>
                  <div class="item-right">
                       <p>￥<span>{{item.lowPrice | fullPrice}}</span>起</p>
                       <p>{{item.Distance | distance}}</p>
                  </div>
               </li>
           </ul>
        </div>

</template>

<script>

import axios from '@/api/axios'
import loading from 'components/loading/Loading'

export default {
    name: "CinemaList",
    components: {
        loading
    },
    data(){
        return {
          list:[],
          option: {
              url : "https://m.maizuo.com/gateway",
              method: 'GET',
              params: {
                  ticketFlag: 1,
                  k: 6734744,
                  cityId: this.$store.state.city.cityId
              }
          }
        }
    },
    created(){
        // this.getListData()

        // 使用vuex重构影院数据，执行actions的异步任务，然后再提交到mutations中改变state中的list数据
        this.$store.dispatch('asyncCinemaData')
    },
    methods: {

         async getListData(){
            //  "https://m.maizuo.com/gateway?ticketFlag=1&k=8975302&cityId="
            axios.defaults.headers.info = "cinema"
             let res = await axios(this.option)
             this.list = res.data.data.cinemas
         }
    },
    filters: {
        distance(value){
         
            return parseFloat(value).toFixed(1) + 'km'
            
        },
        fullPrice(value){
            return parseFloat(value/100).toFixed(1)
        }
    }
}
</script>

<style lang="scss" scoped>
   .cinema{
       
    .cinemalist{
      margin-bottom: 50px;
        .cinemaItem{
            padding: 15px;
            height: 45px;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #ededed;
            .item-left{
                font-size: 12px;
                color: #797d82;
                width: 260px;
                :nth-child(1){
                    font-size: 15px;
                    color: #191A1b;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }
                :nth-child(2){
                    margin-top: 5px;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }
            }

            .item-right{
                font-size: 12px;
                width: 70px;
                overflow: hidden;
    
                p:nth-of-type(1){
                    color: #ff5f16;
                    span{
                        font-size: 15px;
                    }
                    text-align: center;
                }

                p:nth-of-type(2){
                    margin-top: 5px;
                    color: #797d82;
                    text-align: center;
                }
            }
        }
    }
   }
</style>