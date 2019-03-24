<template>
  <div>
    <van-nav-bar title="我" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
      <van-icon name="arrow-left" slot="left"/>
      <van-icon name="setting-o" slot="right"/>
    </van-nav-bar>
    <div class="user-banner">
      <div class="user-info">
        <img class="user-poster" :src="avatar">
        <div class="user-name" v-text="name"></div>
        <van-button class="join-info" type="default" @click="toEditInfo()">编辑信息</van-button>
      </div>
    </div>
    <van-row class="user-links">
      <van-col span="6">
        <van-icon name="records" @click="toOrder(1)"/>待接单
      </van-col>
      <van-col span="6">
        <van-icon name="pending-payment"  @click="toOrder(2)"/>已接单
      </van-col>

      <van-col span="6">
        <van-icon name="tosend" @click="toOrder(3)"/>待上餐
      </van-col>
      <van-col span="6">
        <van-icon name="completed" @click="toOrder(5)"/>已完成
      </van-col>
    </van-row>

    <van-cell-group class="user-group">
      <van-cell icon="records" title="全部订单" is-link @click="toOrder(null)"/>
    </van-cell-group>

    <van-cell-group>
      <van-cell icon="description" title="我的收货地址" is-link/>
      <van-cell icon="gold-coin-o" title="我的优惠券" is-link />
      <van-cell icon="chat-o" title="我的消息" is-link/>
    </van-cell-group>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex"; //先要引入
import { Row, Col, Icon, Cell, CellGroup, NavBar, Button, Notify } from "vant";

export default {
  name: "Info",
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [Notify.name]: Notify
  },
  computed: {
    ...mapState({
      avatar: state => state.user.avatar,
      name: state => state.user.name
    })
  },
  methods: {
    onClickLeft() {
      Toast("返回");
    },
    onClickRight() {
      Toast("按钮");
    },
    toEditInfo(){
      this.$router.push({name: 'EditInfo',params:{ }});
    },
    toOrder(status) {
      this.$router.push({name: 'Order',params:{ status: status}});
    }
  }
};
</script>
<style scoped>
.user-banner {
  width: 100%;
  height: 5.1rem;
  text-align: center;
}
.user-info {
  width: 100%;
}
.user-poster {
  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
  overflow: hidden;
  margin: 0.3rem 0.1rem;
}
.user-name {
  font-size: 0.4rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
}
.join-info {
  margin: 0.2rem 0rem;
}
.user-group {
  margin-bottom: 15px;
}

.user-links {
  padding: 15px 0;
  font-size: 12px;
  text-align: center;
  background-color: #fff;
}
.van-icon {
  display: block;
  font-size: 24px;
}
</style>
