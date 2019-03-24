<template>
  <div>
    <van-nav-bar title="我的订单" left-arrow @click-left="onClickLeft">
      <van-icon name="arrow-left" slot="left"/>
    </van-nav-bar>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-panel
        v-for="item in list"
        :key="item.id"
        :title="item.restaurantName"
        :desc="descText(item.orderDetails)"
        :status="checkStatus(item.status)"
      >
        <span class="price">价格:{{item.realPay}}</span>
        <div slot="footer">
          <van-button size="small" type="primary" @click="toDetail(item)">详情</van-button>
          <van-button size="small">再来一单</van-button>
          <van-button size="small" type="warning">评价</van-button>
        </div>
      </van-panel>
    </van-list>
  </div>
</template>
<script>
import { List, NavBar, Cell, Icon, Panel, Button } from "vant";
import { getUserOrders } from "@/api/order";

export default {
  name: "Order",
  components: {
    [List.name]: List,
    [NavBar.name]: NavBar,
    [Cell.name]: Cell,
    [Icon.name]: Icon,
    [Panel.name]: Panel,
    [Button.name]: Button
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      filters: {
        status: this.$route.params.status,
        type: null,
        payStatus: null,
        page: 1,
        rows: 5
      },
      totalPage: 0
    };
  },
  methods: {
    onClickLeft() {
      window.history.go(-1);
    },
    onLoad() {
        getUserOrders(this.filters).then(res => {
           this.loading = false;
          const data = res.items;
          this.totalPage = res.totalPage;
          if (this.filters.page === this.totalPage || this.totalPage === 0) {
            this.finished = true;
          } else {
            // this.list.push(res);
            for (var i = 0; i < data.length; i++) {
              this.list.push(data[i])
            }
            this.filters.page = this.filters.page + 1;
            
          }
        });
    },
    descText(list){
      if(list.length <= 0){
        return "没有内容"
      }
      var str = '';
      for(let i = 0;i <list.length;i++){
        str += list[i].name + "*" + list[i].amount + "  ";
      }
      return str.substr(0,15) + "...";
    },
    checkStatus(status){
      switch(status)
      {
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
    toDetail(item){
      this.$router.push({name: 'OrderDetail',params:{ order: item}});
    }
  },
  mounted() {}
};
</script>
<style scoped>
.price {
  float: right;
  margin: .1rem .2rem
}
</style>
