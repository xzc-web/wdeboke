<template>
  <div id="detail">
    <detailnavbar class="detail-navbar" @titleclick="titleClick" ref="nav"></detailnavbar>
    <scroll class="contentd" ref="scroll" @scroll="contentscroll" :probe-type="3">
      <!-- <ul>
        <li v-for="(item,index) in $store.state.cartList " :key="index">{{item}}</li>
      </ul>-->
      <detailswiper :top-images="topImages"></detailswiper>
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageload" />
      <detail-param-info :params-info="paramsInfo" ref="params" />
      <detail-comment-info :comment-info="commentInfo" ref="comment" />
      <goodslist :goods="recommends" ref="recommend"></goodslist>
    </scroll>
    <DetailBottomBar @addCart="addCart"></DetailBottomBar>
    <backtop @click.native="backclick" v-show="isshowbacktop"></backtop>
  </div>
</template>

<script>
import detailnavbar from "./childcomps/detailnavbar";
import detailswiper from "./childcomps/detailswiper";
import DetailBaseInfo from "./childcomps/DetailBaseInfo";
import DetailShopInfo from "./childcomps/DetailShopInfo";
import DetailGoodsInfo from "./childcomps/DetailGoodsInfo";
import DetailParamInfo from "./childcomps/DetailParamInfo";
import DetailCommentInfo from "./childcomps/DetailCommentInfo";
import DetailBottomBar from "./childcomps/DetailBottomBar";
import scroll from "components/common/scroll/scroll";
import goodslist from "components/content/goods/goodslist";
import backtop from "components/content/backtop/backtop";
import { debounce } from "common/utils";
import { mapActions } from "vuex";
import {
  getDetail,
  Goods,
  shop,
  GoodsParam,
  getRecommend
} from "network/detail";

export default {
  name: "detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramsInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      isshowbacktop: false
    };
  },
  components: {
    detailnavbar,
    detailswiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    goodslist,
    backtop,
    scroll
  },
  created() {
    this.iid = this.$route.params.iid;
    // 根据iid请求数据
    getDetail(this.iid).then(res => {
      //   console.log(res);
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      //   获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //3.创建店铺信息
      this.shop = new shop(data.shopInfo);
      //获取商品详细信息
      this.detailInfo = data.detailInfo;
      //获取参数信息
      this.paramsInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //获取评论数据
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });
    // 请求推荐数据
    getRecommend().then(res => {
      // console.log(res);
      this.recommends = res.data.list;
    });
    //给getThemeTopY赋值
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // this.themeTopYs.push(Number.MAX_VALUE);
      // console.log(this.themeTopYs);
    }, 500);
  },
  methods: {
    ...mapActions(["addCart"]),
    backclick() {
      // console.log("sss");
      this.$refs.scroll.scrollTo(0, 0);
    },
    imageload() {
      this.$refs.scroll.scroll.refresh();
      this.getThemeTopY();
    },
    titleClick(index) {
      // console.log(index)
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100);
    },
    addCart() {
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      // 1 promise 2mapAction
      // this.addCart(product).then(res => {
      //   // console.log(res);
      //   // this.$toast.show(res);
      // });
      // 2将商品添加到购物车里
      this.$store.dispatch("addCart", product).then(res => {
        // console.log(res);
        this.$toast.show(res, 2000);
      });
    },
    contentscroll(position) {
      // console.log(position);
      this.isshowbacktop = -position.y > 1000;
      //console.log(position)
      const positionY = -position.y;
      // console.log(Number.MAX_VALUE)
      //positionY 和主题中的值进行对比
      //[0,1000,2000,3000，非常大的值]
      //positionY 在0和1000之间,index = 0
      //positionY 在1000和2000之间,index = 1
      //positionY 在2000和3000之间,index = 2
      //positionY 超过3000,index = 3

      //positionY 在3000和一个非常大的值之间,index = 3
      let length = this.themeTopYs.length;
      // console.log(length);
      // for (let i = 0; i < length - 1; i++) {
      //   if (
      //     this.currentIndex !== i &&
      //     positionY >= this.themeTopYs[i] &&
      //     positionY <= this.themeTopYs[i + 1]
      //   ) {
      //     this.currentIndex = i;
      //     this.$refs.nav.currentIndex = this.currentIndex;
      //   }
      //   this.listenShowBackTop(position);
      // if (positionY > this.themeTopYs[i]&&positionY <= this.themeTopYs[i+1]){
      //   console.log(i)
      // }
      for (let i = 0; i < length; i++) {
        if (
          this.currentIndex !== i &&
          ((i < length - 1 &&
            positionY >= this.themeTopYs[i] &&
            positionY < this.themeTopYs[i + 1]) ||
            (i === length - 1 && positionY >= this.themeTopYs[i]))
        ) {
          //console.log(i)
          this.currentIndex = i;
          // console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex;
          // console.log(this.$refs.nav.currentIndex);
        }
      }
    }
  }
};
</script>

<style>
#detail {
  position: relative;
  z-index: 22;
  background-color: #fff;
  height: 100vh;
}
.detail-navbar {
  position: relative;
  z-index: 10;
  background-color: #fff;
}
.contentd {
  height: calc(100% - 44px - 49px);
}
</style>