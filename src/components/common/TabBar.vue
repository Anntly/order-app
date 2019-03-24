<template>
  <div class="tabbar">
    <van-tabbar v-model="active">
      <van-tabbar-item icon="wap-home" to="Home">首页</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="info">我</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import { Tabbar, TabbarItem } from "vant";

export default {
  name: "TabBar",
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  data() {
    return {
      active: 0
    };
  }
};
</script>
<style scoped>
</style>
