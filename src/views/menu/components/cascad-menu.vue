<template>
  <div class="cascad-menu" ref="cascadMenu">
    <scroll class="left-menu" :data="menus" ref="leftMenu">
      <div class="left-menu-container">
        <ul>
          <li
            class="left-item"
            ref="leftItem"
            :class="{'current': currentIndex === index}"
            @click="selectLeft(index, $event)"
            v-for="(menu, index) in menus"
            :key="index"
          >
            <p class="text">{{menu.name}}</p>
          </li>
        </ul>
      </div>
    </scroll>
    <scroll
      class="right-menu"
      :data="menus"
      ref="rightMenu"
      @scroll="scrollHeight"
      :listenScroll="true"
      :probeType="3"
    >
      <div class="right-menu-container">
        <ul>
          <li class="right-item" ref="rightItem" v-for="(menu, i) in menus" :key="i">
            <div class="title">{{menu.name}}</div>
            <ul>
              <li v-for="(item, j) in menu.orderFoods" :key="j">
                <div class="data-wrapper">
                  <div class="data">
                    <van-card
                      tag="折扣"
                      :price="item.price * item.discount /100"
                      desc="描述信息"
                      :title="item.showName"
                      :thumb="item.pic"
                      :origin-price="item.price"
                    >
                      <div slot="footer">
                        <van-stepper integer :min="0" :max="20" @plus="dishPlus(item)" @minus="dishDec(item)" v-model="item.num"/>
                      </div>
                    </van-card>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </scroll>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import Scroll from "./scroll";
import {mapState,mapGetters,mapActions} from 'vuex';
import { Card, Button, Icon, Stepper, SubmitBar  } from "vant";
export default {
  components: {
    [Button.name]: Button,
    [Card.name]: Card,
    [Icon.name]: Icon,
    [Stepper.name]: Stepper,
    Scroll
  },
  data() {
    return {
      rightTops: [],
      scrollY: 0,
      leftScrollY: 0
    };
  },
  props: {
    menus: {
      required: true,
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {
    currentIndex() {
      const { scrollY, rightTops } = this;
      let index = rightTops.findIndex((height, index) => {
        return scrollY >= rightTops[index] && scrollY < rightTops[index + 1];
      });
      if (scrollY > rightTops[index] + 50) {
        index++;
      }
      return index;
    }
  },
  created() {
    this.$nextTick(() => {
      this._calculateHeight();
    });
  },
  methods: {
    selectLeft(index, event) {
      if (!event._constructed) {
        return;
      }
      let rightItem = this.$refs.rightItem;
      let el = rightItem[index];
      this.$refs.rightMenu.scrollToElement(el, 300);
    },
    scrollHeight(pos) {
      this.scrollY = Math.abs(Math.round(pos.y));
    },
    _calculateHeight() {
      let lis = this.$refs.rightItem;
      let height = 0;
      this.rightTops.push(height);
      Array.prototype.slice.call(lis).forEach(li => {
        height += li.clientHeight;
        this.rightTops.push(height);
      });
    },
    ...mapActions('order',[ 
          'dishPlus'  , 'dishDec'
      ])
    
  }
};
</script>

<style lang="stylus" scoped>
.cascad-menu {
  display: flex;
  position: absolute;
  top: 2rem;
  bottom: 2rem;
  width: 100%;
  text-align: center;
  overflow: hidden;

  .left-menu {
    flex: 0 0 2rem;
    width: 3rem;
    background: #f3f5f7;

    .left-item {
      height: 1rem;
      width: 100%;

      &.current {
        background: #FFFFFF;
      }

      .text {
        width: 100%;
        line-height: 1rem;
      }
    }
  }

  .right-menu {
    flex: 1;

    .right-item {
      height: 100%;

      .title {
        height: 1rem;
        color : #444444;
        margin : .2rem .2rem;
      }

      .data-wrapper {
        
      }
    }
  }
}
</style>