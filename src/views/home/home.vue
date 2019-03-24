<template>
  <div>
    <van-nav-bar title="餐厅"></van-nav-bar>
    <van-row class="restaurantMessage">
      <van-col span="7">
        <img class="restaurantPic" :src="restaurant.pic">
      </van-col>
      <van-col offset="4" span="12">
        <div class="restaurantTitle">
          <h3 v-text="restaurant.name"></h3>
          <span>营业时间 {{restaurant.beginTime}} - {{restaurant.endTime}}</span>
        </div>
      </van-col>
    </van-row>
    <van-row class="restaurantButton">
      <van-col span="8" class="selectButton">
        <van-button plain type="primary" @click="toMenu()">菜谱点餐</van-button>
      </van-col>
      <van-col span="8" class="selectButton">
        <van-button plain type="warning" @click="toCoupons()">优惠券领取</van-button>
      </van-col>
      <van-col span="8" class="selectButton">
        <van-button plain type="danger">商家推荐</van-button>
      </van-col>
    </van-row>
    <van-cell title="主营菜品" :value="restaurant.mainFoods"/>
    <van-cell title="评分">
      <van-rate v-model="restaurant.star" icon="like" void-icon="like-o"/>
    </van-cell>
    <van-cell title="地址" :value="restaurant.address"/>
    <van-cell title="联系方式" :value="restaurant.phone"/>
    <van-cell title="店铺介绍" :value="restaurant.description"/>
    <van-cell title="餐厅实景">
      <img v-for="(index, item) in photos" :key="index" class="restaurantPic" :src="item">
    </van-cell>
    <van-cell title="营业执照">
      <img v-for="(index, item) in license" :key="index" class="restaurantPic" :src="item">
    </van-cell>
  </div>
</template>
<script>
import { NavBar, Cell, Icon, Panel, Button, Row, Col, Rate } from "vant";
import { getRestaurantById } from "@/api/restaurant";
import {mapState,mapGetters,mapActions} from 'vuex';

export default {
  name: "Home",
  components: {
    [NavBar.name]: NavBar,
    [Cell.name]: Cell,
    [Icon.name]: Icon,
    [Panel.name]: Panel,
    [Button.name]: Button,
    [Row.name]: Row,
    [Col.name]: Col,
    [Rate.name]: Rate
  },
  data() {
    return {
      restaurant: {
        name: "",
        description: "",
        address: "",
        phone: "",
        pic: "",
        photo: "",
        mainFoods: "",
        star: 0,
        avg: 0,
        beginTime: null,
        endTime: null,
        license: "",
        status: 0,
        createTime: null
      },
      photos: [],
      license: []
    };
  },
  methods: {
    getRestaurant() {
      getRestaurantById(this.restaurantId).then(res => {
        this.restaurant = res;
        this.photos = res.photo.split(",");
        this.license = res.license.split(",");
      });
    },
    toMenu() {
      this.$router.push({
        name: "Menu",
        params: {
          restaurantId: this.restaurantId,
          deskId: this.deskId,
          restaurantName: this.restaurant.name
        }
      });
    },
    toCoupons(){
      this.$router.push({name: "ReceiveCoupons"})
    }
  },
  computed:{
    ...mapState({  //这里的...是超引用，ES6的语法，意思是state里有多少属性值我可以在这里放多少属性值
         restaurantId:state=>state.restaurant.restaurantId,
         deskId:state=>state.restaurant.deskId 
      })
  },
  mounted() {
    // 根据餐厅Id 查询餐厅信息
    this.getRestaurant();
  }
};
</script>
<style scoped>
.restaurantMessage {
  border-bottom: 0.01rem solid rgb(240, 219, 219);
}
.restaurantPic {
  width: 3rem;
  height: 2.5rem;
  border-radius: 0.25rem;
  margin: 0.2rem 0.3rem;
}
.restaurantTitle {
  margin: 0.2rem 0.3rem;
}
.restaurantButton {
  margin-top: 1rem;
  border-bottom: 0.01rem solid rgb(240, 219, 219);
}
.selectButton {
  text-align: center;
  margin-bottom: 1rem;
}
</style>
