<template>
  <div id="tar-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "tabbar"
};
</script>

<style>
/* @import "./assets/css/base.css"; */
#tar-bar {
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #fff;
  box-shadow: 0 -3px 1px rgba(100, 100, 100, 0.1);
  z-index: 9;
}
</style>