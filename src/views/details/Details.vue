<template>

  <loading v-if="JSON.stringify(data) =='{}'"></loading>
  <div id="details" v-else>
    <div class="header">
      <img :src="data.poster" :alt="data.name" />
      <div class="icon" @click="$router.go(-1)">
        <i class="iconfont icon-left"></i>
      </div>
    </div>
    <div class="content">
      <div class="title">
        <p class="title-left">
          <span>{{ data.name }}</span>
          <span>{{ data.item.name }}</span>
        </p>
        <p class="title-right" v-if="data.grade">
          <span>{{ data.grade }}</span>
          <span>分</span>
        </p>
      </div>
      <div class="type">
        <!-- <span>动作</span>&nbsp;|&nbsp;<span>犯罪</span>  -->
        <span>{{ data.category | FullCategory}}</span>
      </div>
      <div class="date">
        <span>{{ data.premiereAt | formatDate}}&nbsp;上映</span>
      </div>
      <div class="time">
        <span>{{ data.nation }}</span>&nbsp;|&nbsp;
        <span>{{ data.runtime }}分钟</span>
      </div>
      <div class="text" :class="{ maxHeight }">
        <p>{{ data.synopsis }}</p>
      </div>
      <span class="icon" @click="textChange">
        <i class="iconfont icon-xia"></i>
      </span>
    </div>
    <div class="actors">
      <div class="title">
        <span>演职人员</span>
      </div>
      <ul class="actor-list">
        <li class="actor-data" v-for="(actor, index) in data.actors" :key="index">
          <img :src="actor.avatarAddress" alt />
          <span class="actor-name">{{ actor.name }}</span>
          <span class="actor-role">{{ actor.role }}</span>
        </li>
      </ul>
    </div>
    <div class="photos">
      <div class="title">
        <span>剧照</span>
        <p>
          <span>全部({{ data.photos.length }})</span>
          <i class="iconfont icon-you1"></i>
        </p>
      </div>
      <div class="imgbox">
        <div class="img" v-for="(photo, index) in data.photos" :key="index">
          <img :src="photo" alt />
        </div>
      </div>
    </div>
    <div class="buyBtn">
      <button>选座购票</button>
    </div>
  </div>

</template>

<script>
import axios from "@/api/axios";
import Loading from 'components/loading/Loading'

export default {
  name: "Details",
  data() {
    return {
      filmid: this.$route.params.filmid,
      data: {},
      maxHeight: false,
    };
  },
  components: {
      Loading
  },
  methods: {
    textChange() {
      this.maxHeight = !this.maxHeight;
    }
  },
  created() {
    // 配置请求头 拿详情页数据
    axios.defaults.headers.info = "info";
    axios({
      url: "https://m.maizuo.com/gateway",
      method: "get",
      params: {
        k: 3633812,
        filmId: this.filmid,
      },
    }).then((res) => {
      this.data = res.data.data.film;
    });

    // 发射一个自定义事件，告诉app父组件我不需要tabtar
    //   this.eventBus.$emit('tabbar',false);
  },
  filters: {
    formatDate(value){
      // 把时间戳格式化为日期格式
       let date =  new Date(value*1000).toLocaleString() // 2021/5/28 上午8.00.00
       let fullDate = /\d{4}\/\d+\/\d+/.exec(date)[0]  // 2021/5/28
       return fullDate.replace(/\//g,'-')   // 2021-5-28
    },
    FullCategory(value){
      // 给类型中间加个空格
       return value.split('|').join(' | ')
    }
  },
  mounted(){
    document.title = "电影详情"
  }
};
</script>

<style lang="scss" scoped>
#details {
  background-color: rgba(220, 220, 220, 0.4);
  .header {
    height: 220px;
    overflow: hidden;
    position: relative;
    background-color: #fff;
    img {
      width: 100%;
      position: absolute;
      top: -80%;
    }

    .icon {
      display: block;
      width: 30px;
      height: 30px;
      position: absolute;
      top: 10px;
      left: 10px;
      text-align: center;
      line-height: 28px;
      background-color: rgba(201, 201, 201, 0.6);
      border-radius: 50%;
      i {
        font-size: 20px;
      }
    }
  }

  .content {
    padding: 15px;
    color: #797d82;
    font-size: 13px;
    position: relative;
    background-color: #fff;

    .title {
      display: flex;
      margin-bottom: 5px;
      .title-left {
        width: 250px;
        display: flex;
        align-items: center;
        :nth-child(1) {
          font-size: 18px;
          color: #191a1b;
          margin-right: 8px;
        }
        :nth-child(2) {
          font-size: 12px;
          background-color: #d2d6dc;
          color: #fff;
          padding: 0 2px;
          border-radius: 2px;
        }
      }

      .title-right {
        display: flex;
        flex: 1;
        justify-content: flex-end;
        color: #ffb232;
        :nth-child(1) {
          font-size: 18px;
          font-style: italic;
          margin-right: 3px;
        }
        :nth-child(2) {
          font-size: 12px;
          height: 16px;
          align-self: flex-end;
          margin-bottom: 2px;
        }
      }
    }
    .type,
    .date {
      margin-bottom: 5px;
    }
    .time {
      margin-bottom: 10px;
    }

    .text {
      max-height: 32px;
      overflow: hidden;
      transition: max-height 0.5s ease-out;
    }

    .maxHeight {
      max-height: 200px;
      transition: max-height 0.5s ease-out;
    }

    .icon {
      position: absolute;
      left: 50%;
      bottom: -4px;
      transform: translateX(-50%);
      display: block;
      width: 20px;
      height: 20px;

      i {
        font-size: 20px;
      }
    }
  }

  .actors {
    color: #191a1b;
    background-color: #fff;
    margin-top: 10px;
    padding-left: 15px;
    .title {
      padding: 10px 0;
      line-height: 32px;
      span {
        font-size: 16px;
      }
    }

    .actor-list {
      overflow-x: auto;
      display: flex;
      &::-webkit-scrollbar {
        display: none;
      }
      .actor-data {
        width: 22vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 12px;
        color: #191a1b;
        margin-right: 10px;
        margin-bottom: 10px;
        img {
          width: 85px;
          height: 100px;
        }
        .actor-name {
            height: 16px;
            overflow: hidden;
            padding-top: 10px;
        }
        .actor-role {
          color: #797d82;
          height: 30px;
          overflow: hidden;
        }
      }
    }
  }

  .photos {
    margin-top: 10px;
    background-color: #fff;
    padding-left: 15px;
    margin-bottom: 60px;
    .title {
      padding: 10px 0;
      padding-right: 15px;
      font-size: 16px;
      display: flex;
      justify-content: space-between;
      p {
        color: #797d82;
        font-size: 13px;
        display: flex;
        align-items: center;
        i {
          margin-top: 2px;
        }
      }
    }
    .imgbox {
      overflow-x: auto;
      display: flex;
      height: 115px;
      align-items: center;
      &::-webkit-scrollbar {
        display: none;
      }
      .img {
        margin-right: 10px;
        height: 100px;
        display: flex;
        align-items: center;
        img {
          width: 150px;
        }
      }
    }
  }

  .buyBtn {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    button {
      width: 100vw;
      height: 49px;
      background-color: #ff5f16;
      color: #fff;
      font-size: 16px;
      border: none;
    }
  }
}
</style>
