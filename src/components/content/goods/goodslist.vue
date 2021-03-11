<template>
  <div class="goods">
    <goodslistitem v-for="(item,index) in goods" :key="index" :goodsitem="item"></goodslistitem>
  </div>
</template>
// :goodsitem="item"
<script>
import goodslistitem from "./goodslistitem";
export default {
  name: "goodslist",
  props: {
    goods: {
      type: Array,
      default() {}
    }
  },
  components: {
    goodslistitem
  },
  methods: {}
};
</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 2px;
}
</style>