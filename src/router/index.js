import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login/:restaurantId/:deskId',
      name: 'Login',
      component: () => import('@/views/user/login'),
      meta: {
        title: '登录'
      }
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/views/home/home'),
      meta: {
        title: '首页'
      }
    },
    {
      path: '/info',
      name: 'Info',
      component: () => import('@/views/user/info'),
      meta: {
        title: '个人信息'
      }
    },
    {
      path: '/order',
      name: 'Order',
      component: () => import('@/views/order/order'),
      meta: {
        title: '订单'
      }
    },
    {
      path: '/order/detail',
      name: 'OrderDetail',
      component: () => import('@/views/order/order-detail'),
      meta: {
        title: '订单详情'
      }
    },
    {
      path: '/order/editInfo',
      name: 'EditInfo',
      component: () => import('@/views/user/edit-info'),
      meta: {
        title: '编辑个人信息'
      }
    },
    {
      path: '/cart',
      name: 'Cart',
      component: () => import('@/views/cart/cart'),
      meta: {
        title: '购物车'
      }
    },
    {
      path: '/menu',
      name: 'Menu',
      component: () => import('@/views/menu/menu'),
      meta: {
        title: '菜单'
      }
    },
    {
      path: '/order/placeOrder',
      name: 'PlaceOrder',
      component: () => import('@/views/order/place-order'),
      meta: {
        title: '下单'
      }
    },
    {
      path: '/home/receive-coupons',
      name: 'ReceiveCoupons',
      component: () => import('@/views/home/receive-coupons'),
      meta: {
        title: '优惠券领取'
      }
    }

  ]
})
