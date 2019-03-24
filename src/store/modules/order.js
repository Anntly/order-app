const state = {
  orderDetails: [],
  totalFee: 0,
  totalCount: 0
}
const getters = {
  getDetails (state) { // 承载变化的collects
    return state.orderDetails
  },
  getTotalFee (state) {
    state.totalFee = 0
    state.totalCount = 0
    if (state.orderDetails) {
      state.orderDetails.forEach(element => {
        state.totalCount += element.amount
        state.totalFee += element.salePrice * element.amount * 100
      })
    }
    return state.totalFee
  },
  getTotalNum (state) {
    return state.totalCount
  },
  getDetailData (state, foodId) {
    const arr = state.orderDetails.filter(o => o.foodId === foodId)
    return arr[0]
  }
}
const mutations = {
  inc (state, dish) {
    // 增加商品
    // 判断购物车中是已经有商品存在
    let isExist = false
    for (let i = 0; i < state.orderDetails.length; i++) {
      if (state.orderDetails[i].foodId === dish.id) {
        isExist = true // 存在
      }
    }
    if (isExist) {
      // 如果已经存在就加一
      const arr = state.orderDetails.filter(o => o.foodId === dish.id)
      arr[0].amount++
    } else {
      // 不存在就添加新的
      const newGoods = {
        foodId: dish.id,
        name: dish.showName,
        price: dish.price,
        salePrice: (dish.price * dish.discount) / 100,
        amount: 1
      }
      state.orderDetails.push(newGoods)
    }
  },
  dec (state, dish) { // 同上
    // 减少数据
    const arr = state.orderDetails.filter(o => o.foodId === dish.id)   
    if (arr[0].amount !== 0) {
      arr[0].amount--
    }
  },
  clear (state, dish) {
    state.orderDetails = []
  }
}
const actions = {
  dishPlus (context, dish) {
    context.commit('inc', dish)
  },
  dishDec (context, dish) {
    context.commit('dec', dish)
  },
  clearDetails (context) {
    context.commit('clear')
  }
}
export default {
  namespaced: true, // 用于在全局引用此文件里的方法时标识这一个的文件名
  state,
  getters,
  mutations,
  actions
}
