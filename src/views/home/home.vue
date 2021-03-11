<template>
  <div id="home">
    <navbar class="home-nav">
      <div slot="center">购物街</div>
    </navbar>
    <tabcontrol
      :titles="['流行','精选','标准']"
      @tabclick="tabclick"
      ref="tabcontrol1"
      class="tabcontrol4"
      v-show="isTabFixed"
    ></tabcontrol>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadmore"
    >
      <homeswiper :banners="banners.list" @swiperimageload="swiperimageload"></homeswiper>
      <recommendview :recommends="recommends.list"></recommendview>
      <featureview></featureview>
      <tabcontrol :titles="['流行','精选','标准']" @tabclick="tabclick" ref="tabcontrol2"></tabcontrol>
      <goodslist :goods="showgoods"></goodslist>
    </scroll>
    <backtop @click.native="backclick" v-show="isshowbacktop"></backtop>
  </div>
</template>

<script>
import homeswiper from "./childcomps/homeswiper";
import recommendview from "./childcomps/recommendview";
import featureview from "./childcomps/featureview";

import navbar from "components/common/navbar/navbar";
import tabcontrol from "components/content/tabcontrol/tabcontrol";
import goodslist from "components/content/goods/goodslist";
import scroll from "components/common/scroll/scroll";
import backtop from "components/content/backtop/backtop";
import { getHomeMultidata, getHomeGoods } from "network/home";
// import  from "componnets/common/swiper/Swiper";
import BScroll from "better-scroll";

export default {
  name: "home",
  components: {
    homeswiper,
    featureview,
    recommendview,
    navbar,
    goodslist,
    scroll,
    backtop,
    tabcontrol
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 1, list: [] },
        new: { page: 1, list: [] },
        sell: { page: 1, list: [] }
      },
      currenttype: "pop",
      isshowbacktop: false,
      taboffsetTop: 0,
      isTabFixed: false,
      savey: 0
    };
  },
  computed: {
    showgoods() {
      return this.goods[this.currenttype].list;
    },
    // home离开时记录位置信息
    destroyed() {
      // console.log("home destroyed");
      // 由于<keep-alive>使得不被销毁，打印不出来
      // console.log("iii");
    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.savey, 0);
      this.$refs.scroll.scroll.refresh();
    },
    deactivated() {
      this.savey = this.$refs.scroll.getscrolly();
    }
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  methods: {
    // 事件监听相关方法

    tabclick(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currenttype = "pop";
          break;
        case 1:
          this.currenttype = "new";
          break;
        case 2:
          this.currenttype = "sell";
          break;
      }
      this.$refs.tabcontrol1.currentindex = index;
      this.$refs.tabcontrol2.currentindex = index;
    },
    backclick() {
      // console.log("sss");
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      // console.log(position);
      this.isshowbacktop = -position.y > 1000;
      //2.决定tabControl是否吸顶(position:fixed)
      // this.listenShowBackTop(position);
      this.isTabFixed = -position.y > this.taboffsetTop;
    },
    loadmore() {
      this.getHomeGoods(this.currenttype);
      this.$refs.scroll.scroll.refresh();
    },
    swiperimageload() {
      // console.log(this.$refs.tabcontrol.$el.offsetTop);
      this.taboffsetTop = this.$refs.tabcontrol2.$el.offsetTop;
    },
    // 网络请求相关方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res);
        this.banners = res.data.banner;
        this.recommends = res.data.recommend;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp();
        // console.log(res);
      });
    }
  }
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: aliceblue;
  /* position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  z-index: 9; */
}
/* .tabcontrol {
  position: sticky; */
/* position: relative; */
/* /* top: 44px;
  z-index: 9; */
/* } */
.content {
  position: absolute;
  /* height: 300px; */
  overflow: hidden;
  top: 44px;
  bottom: 49px;
  left: 0px;
  right: 0px;
}
.tabcontrol4 {
  position: relative;
  z-index: 9;
}
/* .content {
  height: calc(100%-93px);
  overflow: hidden;
  margin-top: 44px;
} */
</style>