<template>
  <div class="backtop">
    <img src="~assets/img/common/top.png" alt />
  </div>
</template>
<script>
export default {
  name: "backtop"
};
</script>

<style>
.backtop {
  position: fixed;
  height: 43px;
  width: 43px;
  right: 10px;
  bottom: 60px;
}
.backtop img {
  height: 100%;
  width: 100%;
}
</style>