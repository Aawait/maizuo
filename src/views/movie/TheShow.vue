<template>
       <div class="theshow">
            <list :option="option"></list>
       </div>
</template>


<script>


import List from 'components/list/List'

export default {
    name: "TheShow",
    components: {
        List
    }, 
    data(){
        return {
           // 获取待映列表的网络请求数据
           option: {  
              url: 'https://m.maizuo.com/gateway',
              method: 'get',
              params: {
                      cityId: 440100,
                      k: 1853317 ,
                      pageNum: 1,
                      pageSize: 10,
                      type: 2
               }
         
           }
        }
    },
    created(){
       
    },
    mounted(){
        document.title = "即将上映"
    }
}
</script>