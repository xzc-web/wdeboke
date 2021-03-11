<template>
  <div class="recommend">
    <div v-for="(item,index) in recommends" :key="index" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt />
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "recommendview",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {}
};
</script>

<style>
.recommend {
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 12px;
  padding: 15px 0 30px;
  border-bottom: 8px solid pink;
}
.recommend-item {
  flex: 1;
}
.recommend a img {
  width: 80%;
  height: 80%;
  padding-bottom: 7px;
}
</style>