import {
  getToken,
  setToken,
  removeToken,
  getReToken,
  removeReToken,
  setRememberMe
} from '@/utils/auth'

import {
  login,
  logout,
  getInfo,
  relogin
} from '@/api/login'

const state = {
  token: getToken(),
  reToken: getReToken(),
  name: '',
  avatar: ''
}
const getters = {
  getToken (state) {
    return state.token
  },
  getReToken (state) {
    return state.reToken
  },
  getUsername (state) {
    return state.name
  },
  getAvatar (state) {
    return state.avatar
  }
}
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_RETOKEN: (state, reToken) => {
    state.reToken = reToken
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}
const actions = {
  // 登录
  Login ({
    commit
  }, userInfo) {
    const username = userInfo.username.trim()
    return new Promise((resolve, reject) => {
      login(username, userInfo.password).then(response => {
        const data = response
        setToken(data.token)
        commit('SET_TOKEN', data.token)
        commit('SET_RETOKEN', data.reToken)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 刷新token
  ReLogin ({
    commit,
    state
  }, reToken) {
    return new Promise((resolve, reject) => {
      relogin(reToken).then(response => {
        const data = response
        setToken(data.accessToken)
        commit('SET_TOKEN', data.accessToken)
        commit('SET_RETOKEN', data.refresh_token)
        localStorage.setItem('JWT_TOKEN', data.jwt_token) // 将jwt存入localStorage
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取用户信息
  GetInfo ({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      console.log('发送时的token' + getToken())
      getInfo(getToken()).then(response => {
        localStorage.setItem('JWT_TOKEN', response)
        const userString = decodeURIComponent(escape(window.atob(response.split('.')[1])))
        const user = JSON.parse(userString)
        console.log('获取到的user' + user.user_name)
        commit('SET_NAME', user.user_name)
        commit('SET_AVATAR', user.avatar)
        resolve(user.roles)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 登出
  LogOut ({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      console.log('执行退出')
      logout(state.token, state.reToken).then(() => {
        commit('SET_TOKEN', '')
        setRememberMe(false)
        removeToken()
        removeReToken()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 前端 登出
  FedLogOut ({
    commit
  }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_RETOKEN', '')
      setRememberMe(false)
      removeToken()
      removeReToken()
      resolve()
    })
  }
}
export default {
  namespaced: true, // 用于在全局引用此文件里的方法时标识这一个的文件名
  state,
  getters,
  mutations,
  actions
}
