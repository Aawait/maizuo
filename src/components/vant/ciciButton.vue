<template>
    <button class="btn" :class="['btn-'+type,{hover:ishover,disable:isdisable},'btn-'+size]">
        <slot>按钮</slot>
        <i :class="'iconfont icon-'+icon"></i>
    </button>
</template>


<script>
export default {
    name: "ciciButton",
    props: {
       type: {
           type: String,
           default: "default"
       },
       size: {
           type: String,
           default: "middle"
       },
       ishover: {
           type: Boolean,
           default : false
       },
       icon: {
           type: String,
           default : ''
       },
       isdisable: {
           type: Boolean,
           default: false
       }
    },
    methods: {

    },

}
</script>

<style lang="scss" scoped>
   .btn{
         width: 80px;
         height: 40px;
         font-size: 16px;
         box-sizing: border-box;
         border:none;
         opacity: 0.8;
         transition: all .3s linear;
   }
   .iconfont{
       margin-left: 3px;
       font-size: 14px;
   }

   .btn-default{
        background: #d3d7d4;
        color: #333;
        border-radius: 3px;
   }

   .btn-info{
       border-radius: 3px;
       color: #fff;
       background: #33a3dc;
   }

   .btn-success{
       border-radius: 3px;
       color: #fff;
       background: #1d953f;
   }

   .btn-danger{
       border-radius: 3px;
       color: #fff;
       background: #ef4136;
   }
   .btn-hover:hover{
       opacity: 1;
   }

   .btn-small{
       width: 40px;
       height: 25px;
       font-size: 12px;
   }

   .btn-middle{
       width: 80px;
       height: 35px;

       font-size: 16px;
   }
   .btn-big{
       width: 180px;
       height: 40px;
       font-size: 18px;

   }

   .disable{
       cursor:no-drop;
   }
</style>