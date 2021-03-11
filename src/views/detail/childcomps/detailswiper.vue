<template>
  <div class="detailswiper">
    <Swiper class="swipers">
      <swiper-item v-for="(item,index) in topImages" :key="index">
        <img :src="item" alt />
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { SwiperItem, Swiper } from "components/common/swiper";
export default {
  name: "detailswiper",
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
};
</script>

<style>
.swipers{
    height: 300px;
    overflow: hidden;
}
</style>