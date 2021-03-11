<template>
  <div id="app">
    <keep-alive exclude="detail">
      <router-view></router-view>
    </keep-alive>
    <mainTabBar></mainTabBar>
  </div>
</template>
// exclude="detail
<script>
import mainTabBar from "components/content/mainTabbar/mainTabBar";
export default {
  name: "App",
  components: {
    mainTabBar
  }
};
</script>

<style>
@import "assets/css/base.css";
</style>
