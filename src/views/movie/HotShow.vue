<template>

        <div class="hotshow">
            <list :option="option"></list>
        </div>
        
</template>


<script>

import List from 'components/list/List'

export default {
    name: "HotShow",
    created(){
      
    },
    mounted(){
       document.title = "正在热映"
    },
    data(){
        return {
      
           // 热映列表获取数据
           //  https://m.maizuo.com/gateway?cityId=440100&pageNum=1&pageSize=10&type=1&k=5348003
           option: {
                url: 'https://m.maizuo.com/gateway',
                method: 'get',
                params: {
                        cityId: 440100,
                        k: 5348003 ,
                        pageNum: 1,
                        pageSize: 10,
                        type: 1
                 },
           },
        }
    },
    components: {
      List
    },
    methods: {
        
    }
   
}
</script>

<style lang="scss" scoped>
    
</style>