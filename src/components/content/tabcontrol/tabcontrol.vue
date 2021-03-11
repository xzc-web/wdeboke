<template>
  <div class="tabcontrol">
    <div
      v-for="(item,index) in titles"
      :key="index"
      class="tabcontrol-item"
      :class="{active:index===currentindex}"
      @click="itemclick(index)"
    >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabcontrol",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      currentindex: 0
    };
  },
  methods: {
    itemclick(index) {
      this.currentindex = index;
      this.$emit("tabclick", index);
    }
  },
  components: {}
};
</script>

<style>
.tabcontrol {
  display: flex;
  width: 100%;
  text-align: center;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
  z-index: 9;
}
.tabcontrol-item {
  flex: 1;
}
.tabcontrol-item span {
  padding: 5px;
}
.active {
  color: var(--color-high-text);
}
.active span {
  border-bottom: 3px solid var(--color-tint);
}
</style>