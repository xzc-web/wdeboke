<template>
  <div>
    <navbar>
      <div slot="left" class="back" @click="backclick">
        <img src="~assets/img/common/back.svg" alt />
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item,index) in titles"
          :key="index"
          class="title-item"
          :class="{active:index===currentIndex}"
          @click="titleclick(index)"
        >{{item}}</div>
      </div>
    </navbar>
  </div>
</template>

<script>
import navbar from "components/common/navbar/navbar";
export default {
  name: "detailnavbar",
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  components: {
    navbar
  },
  methods: {
    titleclick(index) {
      this.currentIndex = index;
      this.$emit("titleclick", index);
    },
    backclick() {
      this.$router.back();
    }
  }
};
</script>

<style>
.title {
  display: flex;
  font-size: 13px;
}
.title-item {
  flex: 1;
}
.active {
  color: red;
}
.back img {
  margin-top: 10px;
  margin-left: 10px;
}
</style>