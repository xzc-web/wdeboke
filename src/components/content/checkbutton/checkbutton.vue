<template>
  <div class="check-button" :class="{check: ischecked}">
    <img src="~assets/img/cart/tick.svg" alt />
  </div>
</template>
//  :class="{check:isChecked}"
<script>
export default {
  name: "checkbutton",
  props: {
    ischecked: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.check-button {
  border-radius: 50%;
  border: 2px solid #aaa;
}

.check {
  border-color: red;
  background-color: red;
}
</style>