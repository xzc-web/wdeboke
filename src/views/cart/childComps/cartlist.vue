<template>
  <div class="cart-list">
    <cartlistitem v-for="(item,index) in cartList" :key="index" :product="item"></cartlistitem>
  </div>
</template>

<script>
import scroll from "components/common/scroll/scroll";
import cartlistitem from "./cartlistitem";
import { mapGetters } from "vuex";
export default {
  name: "cartlist",
  components: {
    cartlistitem
  },
  computed: {
    ...mapGetters(["cartList"])
  }
};
</script>

<style>
/* 样式的不对，可能引起页面跳转然后加载不出来 */
</style>