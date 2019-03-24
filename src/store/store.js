import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common'
import user from './modules/user'
import restaurant from './modules/restaurant'
import order from './modules/order'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    common,
    user,
    restaurant,
    order
  }
})
