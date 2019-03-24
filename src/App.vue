<template>
  <div id="app">
    <router-view/>
    <tab-bar v-if="tabbarShow"></tab-bar>
  </div>
</template>

<script>

import {mapState,mapGetters,mapActions} from 'vuex'; //先要引入
import TabBar from './components/common/TabBar'

export default {
  name: 'App',
  components: {
    TabBar
  },
  data() {
    return {

    }
  },
  computed:{
    ...mapState({  //这里的...是超引用，ES6的语法，意思是state里有多少属性值我可以在这里放多少属性值
         tabbarShow:state=>state.common.showFooter 
      })
  },
  watch:{
      $route(to,from){
        if(to.name=='Home'||to.name=='Info' || to.name=='Order' || to.name=='Cart'){
           this.$store.dispatch('common/footShow') //这里改为'footerStatus/showFooter',
                                                           //意思是指footerStatus.js里actions里的showFooter方法
        }else{
           this.$store.dispatch('common/footHide') //同上注释
        }
      }
  }
}
</script>

<style>

</style>
