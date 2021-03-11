<template>
  <Swiper>
    <SwiperItem v-for="(item,index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt @load="imageload" />
      </a>
    </SwiperItem>
  </Swiper>
</template>

<script>
import { SwiperItem, Swiper } from "components/common/swiper";
export default {
  name: "homeswiper",
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  data() {
    return {
      isLoad: false
    };
  },
  methods: {
    imageload() {
      if (!this.isLoad) {
        this.$emit("swiperimageload");
        //console.log("监听轮播图加载完毕")
        this.isLoad = true;
      }
    }
  }
};
</script>

<style>
</style>