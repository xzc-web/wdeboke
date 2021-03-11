<template>
  <div class="cartt">
    <navbar class="cart">
      <div slot="center">购物车{{length}}</div>
    </navbar>
    <scroll class="content-s" ref="scroll" :probe-type="3">
      <cartlist></cartlist>
    </scroll>
    <cartbottombar></cartbottombar>
  </div>
</template>

<script>
import navbar from "components/common/navbar/navbar";
import cartlist from "views/cart/childComps/cartlist";
import cartbottombar from "views/cart/childComps/cartbottombar";
import scroll from "components/common/scroll/scroll";
import { mapGetters } from "vuex";
export default {
  name: "cart",
  components: {
    navbar,
    cartlist,
    cartbottombar,
    scroll
  },
  computed: {
    // cartLength(){
    //   return $store.state.cartLength.length
    // }
    // ...mapGetters(["cartLength", "cartList"]),
    ...mapGetters({ length: "cartLength" })
  },
  activated() {
    this.$refs.scroll.scroll.refresh();
  }
};
</script>

<style>
.cart {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}
.cartt {
  height: 100vh;
}
.content-s {
  height: calc(100% - 44px - 49px - 40px);
  overflow: hidden;
}
</style>