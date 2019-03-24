<template>
  <div class="main-container">
    <van-nav-bar title="编辑个人信息" left-arrow @click-left="onClickLeft">
      <van-icon name="arrow-left" slot="left"/>
    </van-nav-bar>
    <div class="userForm">
      <van-cell-group>
        <img
          class="user-poster"
          src="http://image.anntly.com/group1/M00/00/00/wKgZgVxWnhSANhcqAABBMd7e0IY573.jpg"
        >
        <van-uploader :after-read="onRead" accept="image/gif, image/jpeg" multiple>
          <van-icon name="photograph"/>
        </van-uploader>
        <van-field v-model="UserInfo.username" label="用户名" disabled placeholder="请输入用户名" @blur="checkUsername()"/>
        <van-field v-model="UserInfo.nickName" label="昵称" placeholder="请输入昵称"/>
        <van-field v-model="UserInfo.phone" label="手机号" placeholder="请输入手机号" @blur="checkPhone()"/>
        <van-field v-model="UserInfo.email" label="邮箱" placeholder="请输入邮箱" @blur="checkEmail()"/>
        <van-field v-model="UserInfo.age" label="年龄" placeholder="请输入年龄"/>选择性别(女/男)
        <van-switch v-model="UserInfo.sex" size="1.3 rem"/>
        <van-field
          v-model="UserInfo.underwrite"
          label="个性签名"
          type="textarea"
          placeholder="请输入个性签名"
          rows="1"
          autosize
        />
        <van-field v-model="UserInfo.address" label="地址" placeholder="请输入地址"/>
      </van-cell-group>
      <van-button size="small" type="primary" :disabled="isExist" @click="updateUserInfo()">确认修改</van-button>
    </div>
  </div>
</template>
<script>
import { getUserInfo, changeUserInfo, checkUser } from "@/api/user";
import {
  NavBar,
  Cell,
  CellGroup,
  Icon,
  Panel,
  Button,
  Uploader,
  Field,
  Switch,
  Notify
} from "vant";

export default {
  name: "EditInfo",
  components: {
    [NavBar.name]: NavBar,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Icon.name]: Icon,
    [Panel.name]: Panel,
    [Button.name]: Button,
    [Uploader.name]: Uploader,
    [Field.name]: Field,
    [Switch.name]: Switch,
    [Notify.name]: Notify
  },
  data() {
    return {
      checked: true,
      UserInfo: {
        id: 0,
        username: "小明",
        nickName: "小小明",
        phone: "123456789",
        email: "123@qq.com",
        age: "12",
        sex: true,
        underwrite: "come baby",
        address: "幸福大街"
      },
      isExist: false
    };
  },
  methods: {
      checkPhone() {
      const para = {
        phone: this.UserInfo.phone
      };
      checkUser(para).then(res => {
        if (res) {
          Notify({
            message: "手机号已绑定"
          });
          this.isExist = true;
        } else {
          this.isExist = false;
        }
      });
    },
    checkEmail() {
      const para = {
        email: this.UserInfo.email
      };
      checkUser(para).then(res => {
        if (res) {
         Notify({
            message: "邮箱已绑定息"
          });
          this.isExist = true;
        } else {
          this.isExist = false;
        }
      });
    },
    checkUsername() {
      const para = {
        username: this.UserInfo.username
      };
      checkUser(para).then(res => {
        if (res) {
          Notify({
            message: "用户已存在"
          });
          this.isExist = true;
        } else {
          this.isExist = false;
        }
      });
    },
    onClickLeft() {
      window.history.go(-1);
    },
    onRead(file) {
      console.log(file);
    },
    getUser() {
      getUserInfo()
        .then(res => {
          this.UserInfo = res;
        })
        .catch();
    },
    updateUserInfo() {
      // 校验数据是否为空
      const para = this.UserInfo;
      for (var key in para) {
        if (!para[key]) {
          Notify({
            message: "请完善所有信息"
          });
          return;
        }
      }
      // 提交新的信息
      changeUserInfo(para)
        .then(res => {
         // 需要重新登录
        })
        .catch();
    }
  },
  created() {
    this.getUser();
  }
};
</script>
<style scoped>
.main-container {
  text-align: center;
}
.userForm {
  width: 80%;
}
.user-poster {
  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
  overflow: hidden;
  margin: 0.3rem 0.1rem;
}
</style>
