const state = {
  showFooter: true // 初始化一个colects数组
}
const getters = {
  isShow (state) { // 承载变化的collects
    return state.showFooter
  }
}
const mutations = {
  show (state) { // 自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
    state.showFooter = true
  },
  hide (state) { // 同上
    state.showFooter = false
  }
}
const actions = {
  footShow (context) {
    context.commit('show')
  },
  footHide (context) {
    context.commit('hide')
  }
}
export default {
  namespaced: true, // 用于在全局引用此文件里的方法时标识这一个的文件名
  state,
  getters,
  mutations,
  actions
}
