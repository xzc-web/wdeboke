<template>
  <div class="wrapper" ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  mounted() {
    //   1创建scroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    });
    // 监听滚动的位置
    this.scroll.on("scroll", position => {
      //   console.log(position);
      this.$emit("scroll", position);
    });
    // 3监听上拉事件
    this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp");
    });
    this.scroll.scrollTo(0, 0);
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll.finishPullUp();
    },
    getscrolly() {
      return this.scroll.y ? this.scroll.y : 0;
    }
  }
};
</script>

<style>
</style>