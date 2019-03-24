<template>
  <div class="app-container">
    <van-nav-bar title="结算" left-arrow @click-left="onClickLeft">
      <van-icon name="arrow-left" slot="left"/>
    </van-nav-bar>
    <div class="main-text">
      <h2>需要支付</h2>
      <span>(请在店家知晓的情况下扫码支付)</span>
      <h1>￥ {{needPay/100}}</h1>
    </div>
    <van-cell-group>
      <van-field
        v-model="orderForm.note"
        label="备注"
        type="textarea"
        placeholder="请输入备注"
        rows="1"
        autosize
      />
    </van-cell-group>

    <!-- 优惠券单元格 -->
    <van-coupon-cell :coupons="coupons" :chosen-coupon="chosenCoupon" @click="showList = true"/>

    

    <div>
      <van-button
        class="order-button"
        plain
        hairline
        size="normal"
        type="primary"
        @click="handleOrder()"
      >下单</van-button>
    </div>
    <!-- 优惠券列表 -->
    <van-popup v-model="showList" position="bottom">
      <van-coupon-list
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        :disabled-coupons="disabledCoupons"
        exchange-button-disabled
        @change="onChange"
        @exchange="onExchange"
      />
    </van-popup>
  </div>
</template>
<script>
import {
  Row,
  Col,
  Icon,
  Cell,
  CellGroup,
  NavBar,
  Button,
  Notify,
  Field,
  Dialog,
  CouponCell,
  CouponList,
  Popup 
} from "vant";
import { mapState, mapGetters, mapActions } from "vuex";
import { addOrder } from "@/api/order";
import { getMyCoupons } from "@/api/coupons";


export default {
  name: "PlaceOrder",
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [Notify.name]: Notify,
    [Field.name]: Field,
    [Dialog.name]: Dialog,
    [CouponCell.name]: CouponCell,
    [CouponList.name]: CouponList,
    [Popup.name]: Popup
  },
  data() {
    return {
      showList: false,
      chosenCoupon: -1,
      coupons: [],
      disabledCoupons: [],
      orderForm: {
        deskId: null,
        deskName: null,
        note: null,
        orderDetails: "",
        restaurantId: null,
        restaurantName: null,
        couponsId: null
      }
    };
  },
  methods: {
    onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
    },
    onExchange(code) {
      this.coupons.push(coupon);
    },
    onClickLeft() {
      window.history.go(-1);
    },
    handleOrder() {
      Dialog.confirm({
        title: "下单",
        message: "确认下单?"
      })
        .then(() => {

          // 获取优惠券Id
          this.orderForm.couponsId = this.coupons[this.chosenCoupon].id;
          console.log("优惠券Id为" + this.orderForm.couponsId)

          // 提交订单
          this.orderForm.restaurantId = this.restaurantId;
          this.orderForm.deskId = this.deskId;
          this.orderForm.orderDetails = JSON.stringify(this.orderDetails);
          const para = Object.assign({}, this.orderForm);
          addOrder(para).then(res => {
            console.log("提交订单");
            // 清空state
            this.$store.dispatch("order/clearDetails");
            Notify({
              message: "订单已成功，请耐心等待...",
              duration: 1000,
              background: "#1989fa"
            });
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    getCoupons() {
      getMyCoupons(this.needPay/100).then(res => {
        this.coupons = res.coupons;
        this.disabledCoupons = res.disabledCoupons;
      });
    }
  },
  computed: {
    ...mapState({
      restaurantId: state => state.restaurant.restaurantId,
      deskId: state => state.restaurant.deskId
    }),
    ...mapGetters("order", {
      //用mapGetters来获取collection.js里面的getters
      needPay: "getTotalFee",
      orderDetails: "getDetails"
    })
  },
  mounted() {
    this.getCoupons()
  }
};
</script>
<style scoped>
.app-container {
  text-align: center;
}
.main-text {
  margin-top: 3rem;
}
.order-button {
  margin-top: 1rem;
}
</style>
