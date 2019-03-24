<template>
  <div>
    <van-cell-group>
      <van-field
        v-model="loginForm.username"
        required
        clearable
        label="用户名"
        right-icon="question-o"
        placeholder="请输入用户名"
        @click-right-icon="$toast('question')"
      />
      <van-field
        v-model="loginForm.password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
    </van-cell-group>
    <van-button @click.native.prevent="handleLogin" slot="button" size="large" type="primary">登录</van-button>
  </div>
</template>
<script>
import { Row, Col, Button, Cell, Field, CellGroup, Icon } from "vant";
import { setRememberMe, getRememberMe, setNotRememberMe } from "@/utils/auth";

export default {
  name: "Login",
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Icon.name]: Icon
  },
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      restaurantId: this.$route.params.restaurantId,
      deskId: this.$route.params.deskId
    }
  },
  methods: {
    handleLogin(){
      // 判断是否为空
      if(JSON.stringify(this.loginForm) == "{}"){

        return;
      }
      this.$store.dispatch("user/Login", this.loginForm).then(res => {
        this.$store.dispatch('user/GetInfo').then(res => { // 拉取用户信息
          const roles = res // note: roles must be a array! such as: ['editor','develop']
        }).catch((err) => {
          this.$store.dispatch('user/FedLogOut').then(() => {
            this.$router.push({ path: '/' });
          })
        })
            // 登陆成功之后,存入餐厅Id,餐桌id存入state
            // this.$router.push({ name: 'Home' ,params:{ restaurantId: this.restaurantId,deskId: this.deskId}});
            this.$store.dispatch('restaurant/updateRestaurant',this.restaurantId);
            this.$store.dispatch('restaurant/updateDesk',this.deskId);
            var that = this
            setTimeout(function () {
              that.$router.push({name: 'Home'})
            },500) 
      });
    }
  },
  mounted() {
  }
};
</script>
<style scoped>
</style>
