const state = {
  restaurantId: 0,
  deskId: 0
}
const getters = {
  getRestaurantId (state) {
    return state.restaurantId
  },
  getDeskId (state) {
    return state.deskId
  }
}
const mutations = {
  setRestaurantId (state, restaurantId) { // 自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
    state.restaurantId = restaurantId
  },
  setDeskId (state, deskId) { // 同上
    state.deskId = deskId
  }
}
const actions = {
  updateRestaurant (context, restaurantId) {
    context.commit('setRestaurantId', restaurantId)
  },
  updateDesk (context, deskId) {
    context.commit('setDeskId', deskId)
  }
}
export default {
  namespaced: true, // 用于在全局引用此文件里的方法时标识这一个的文件名
  state,
  getters,
  mutations,
  actions
}
