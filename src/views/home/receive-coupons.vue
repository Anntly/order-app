<template>
  <div>
    <van-nav-bar title="优惠券领取" left-arrow @click-left="onClickLeft">
      <van-icon name="arrow-left" slot="left"/>
    </van-nav-bar>

    <van-panel
      v-for="item in Coupons"
      :key="item.id"
      :title="item.name"
      :desc="item.description"
      :status="statusCheck(item)"
      class="coupons"
    >
      <van-row class="desc-text">
        <van-col span="12">有效期至 {{item.end_time}}</van-col>
        <van-col span="6" offset="6" v-text="condition(item)"></van-col>
      </van-row>
      <div slot="footer">
        <van-row>
          <van-col span="4" offset="19">
            <van-button
              size="small"
              :disabled="isClick(item)"
              type="danger"
              @click="receive(item)"
            >领取</van-button>
          </van-col>
        </van-row>
      </div>
    </van-panel>
  </div>
</template>
<script>
import { Row, Col, Button, Icon, NavBar, Panel, Notify } from "vant";
import { getCoupons, receiveCoupon } from "@/api/coupons";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "ReceiveCoupons",
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [NavBar.name]: NavBar,
    [Panel.name]: Panel,
    [Notify.name]: Notify
  },
  data() {
    return {
      Coupons: []
    };
  },
  methods: {
    onClickLeft() {
      window.history.go(-1);
    },
    statusCheck(item) {
      if (item.type) {
        return "￥" + item.amount;
      } else {
        return item.discount / 10 + " 折";
      }
    },
    condition(item) {
      if (item.needCost === 0) {
        return "无门槛";
      } else {
        return "满" + item.needCost + " 元生效";
      }
    },
    isClick(item) {
      if (item.num > 0) {
        return true;
      }
    },
    getShopCoupons() {
      getCoupons(this.restaurantId).then(res => {
        for (let i = 0; i < res.length; i++) {
          // 这里的i是代表数组的下标
          res[i].num = 0;
        }
        this.Coupons = res;
        // 遍历使 num为0
      });
    },
    receive(item) {
      if (item.num > 0) {
        return;
      }
      item.num ++;
      let ids = {
        couponsId: item.id,
        restaurantId: this.restaurantId
      };
      const para = Object.assign({}, ids);
      receiveCoupon(para).then(res => {
        Notify({
          message: "领取成功",
          duration: 1000,
          background: "#1989fa"
        });
      });
    }
  },
  mounted() {
    this.getShopCoupons();
  },
  computed: {
    ...mapState({
      //这里的...是超引用，ES6的语法，意思是state里有多少属性值我可以在这里放多少属性值
      restaurantId: state => state.restaurant.restaurantId
    })
  }
};
</script>
<style scoped>
.coupons {
  margin: 0.3rem;
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.15);
}
.desc-text {
  margin: 0.5rem 0.5rem;
}
</style>
