<template>
  <div>
    <van-nav-bar title="订单详情" left-arrow @click-left="onClickLeft">
      <van-icon name="arrow-left" slot="left"/>
    </van-nav-bar>

    <div class="orderStatus">
      <h3 style=" margin: 0.3rem 0.2rem;" v-text="'订单已完成'"></h3>
      <div>
        <van-button size="small" class="myButton" plain type="primary">评价</van-button>
        <van-button size="small" class="myButton" plain type="danger">再来一单</van-button>
      </div>
    </div>
    <div class="orderContent">
      <h3 style=" margin: 0.3rem 0.2rem;" v-text="'黄焖鸡米饭'"></h3>
      <van-cell
        v-for="item in order.orderDetails"
        :key="item.id"
        :title="foodDetail(item)"
        :value="priceDetail(item)"
      />
      <van-cell title="餐盒费" value="x1" :label="'￥ '+order.boxFee"/>
      <van-cell title="配送费" value="x1" :label="'￥ '+order.shippingFee"/>
      <van-cell title="共支付"  :label="'￥ '+order.realPay"/>
    </div>
    <div class="deliveryMessage">
      <h3 style=" margin: 0.3rem 0.2rem;" v-text="'配送信息'"></h3>
      <van-cell title="送到时间" value="尽快送达"/>
      <van-cell title="送餐地址" :value="order.address"/>
      <van-cell title="配送方式" :value="deliveryMode()"/>
    </div>
    <div class="orderMessage">
      <h3 style=" margin: 0.3rem 0.2rem;" v-text="'订单信息'"></h3>
      <van-cell title="订单号" :value="order.id"/>
      <van-cell title="支付方式" :value="payType()"/>
      <van-cell title="下单时间" :value="order.createTime"/>
    </div>
  </div>
</template>
<script>
import { NavBar, Cell, Icon, Panel, Button } from "vant";

export default {
  name: "OrderDetail",
  components: {
    [NavBar.name]: NavBar,
    [Cell.name]: Cell,
    [Icon.name]: Icon,
    [Panel.name]: Panel,
    [Button.name]: Button
  },
  data() {
    return {
      order: this.$route.params.order
    };
  },
  methods: {
    onClickLeft() {
      window.history.go(-1);
    },
    statusFormatar(status) {
      switch (status) {
        case 1:
          return "订单未接单";
          break;
        case 2:
          return "订单已接单";
          break;
        case 3:
          return "订单配送中";
          break;
        case 4:
          return "订单已取消";
          break;
        case 5:
          return "订单已完成";
          break;
        default:
          return "未知";
      }
    },
    foodDetail(item) {
      if (item.length <= 0) {
        return "没有内容";
      }
      let str = "";
      str += item.name + "       x" + item.amount;
      return str;
    },
    priceDetail(item) {
      return "￥ " + item.salePrice;
    },
    deliveryMode() {
      if (this.order.deliveryMode === 1) {
        return "商家配送";
      } else if (this.order.deliveryMode === 2) {
        return "外卖员配送";
      }
    },
    payType(){
      switch (this.order.payType) {
        case 1:
          return "支付宝";
          break;
        case 2:
          return "微信";
          break;
        case 3:
          return "现金";
          break;
        case 4:
          return "其他";
          break;
        default:
          return "未知";
      }
    }
  },
  mounted() {}
};
</script>
<style scoped>
.orderStatus {
  margin: 0.3rem;
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.15);
}
.orderContent {
  margin: 0.3rem;
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.15);
}
.deliveryMessage {
  margin: 0.3rem;
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.15);
}
.orderMessage {
  margin: 0.3rem;
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.15);
}
.myButton {
  margin: 0.3rem 0.2rem;
}
</style>
