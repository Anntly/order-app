<template>
  <div>
    <van-nav-bar title="订单详情" left-arrow @click-left="onClickLeft">
      <van-icon name="arrow-left" slot="left"/>
    </van-nav-bar>
    <div class="meun" style="width:100%;">
      <cascad-menu :menus="menu"></cascad-menu>
    </div>
    <van-submit-bar :price="needPay" button-text="结算" @submit="onSubmit"/>
  </div>
</template>
<script>
import {
  NavBar,
  Cell,
  Icon,
  Panel,
  Button,
  Row,
  Col,
  Rate,
  SubmitBar
} from "vant";
import { getMenu } from "@/api/order";
import { mapState, mapGetters, mapActions } from "vuex";
import CascadMenu from "./components/cascad-menu";

export default {
  name: "Menu",
  components: {
    [NavBar.name]: NavBar,
    [Cell.name]: Cell,
    [Icon.name]: Icon,
    [Panel.name]: Panel,
    [Button.name]: Button,
    [Row.name]: Row,
    [Col.name]: Col,
    [Rate.name]: Rate,
    [SubmitBar.name]: SubmitBar,
    CascadMenu
  },
  data() {
    return {
      menu: []
    };
  },
  methods: {
    onClickLeft() {
      window.history.go(-1);
    },
    getMenuByDeskId() {
      getMenu(this.deskId).then(res => {
        this.menu = res;
      });
    },
    onSubmit() {
      this.$router.push({name: 'PlaceOrder'})
    }
  },
  computed: {
    ...mapState({
      deskId: state => state.restaurant.deskId,
    }),
    ...mapGetters('order',{ //用mapGetters来获取collection.js里面的getters
            needPay:'getTotalFee'
        })
  },
  mounted() {
    // 根据 deskId查询对应的menuId并查询对应的menu
     this.getMenuByDeskId();
  }
};
</script>
<style scoped>
</style>
