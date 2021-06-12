<template>
    <div id="cinema">
        <nav-bar>
                     <div class="navbar-top" slot="navbar-top">
                                <div class="navbar-sm" slot="address" @click="goCitys">
                                     <span>{{$store.state.city.name}}</span>
                                     <i class="iconfont icon-xia"></i> 
                                </div>
                                <div class="navbar-bl" slot="type">影院</div>
                                <div class="navbar-sm" slot="search">
                                    <i class="iconfont icon-sousuo"></i>
                                </div>
                       </div>
                       <div class="navbar-down cinema-header" slot="navbar-down">
                            <div class="navbar-item">
                                   <span>全城</span>
                                   <i class="iconfont icon-xia"></i> 
                            </div>
                           <div class="navbar-item">
                                   <span>APP订票</span>
                                   <i class="iconfont icon-xia"></i> 
                            </div>   
                            <div class="navbar-item">
                                   <span>最近去过</span>
                                   <i class="iconfont icon-xia"></i> 
                            </div>  
                       </div>
        </nav-bar>

        <cinema-list></cinema-list>

    </div>
</template>


<script>

import NavBar from 'components/navbar/NavBar'
import CinemaList from 'components/list/CinemaList'
export default {
    name: "Cinema",
    components: {
        NavBar,
        CinemaList
    },
    methods: {
       goCitys(){
           this.$router.push('/citys')
       }
    },
    mounted(){
        document.title = "影院"
    }
}
</script>

<style lang="scss" scoped>
    #cinema{
        height: 100vh;

    }
    .cinema-header{
        position: sticky;
        top: 0;
        border-bottom: 1px solid #ededed;
    }


</style>