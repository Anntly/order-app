import request from '@/utils/request'

export function getUserOrders (params) {
  return request({
    url: '/order/user',
    method: 'get',
    params: params
  })
}
export function getMenu (deskId) {
  return request({
    url: '/shop/mfood/desk/menu',
    method: 'get',
    params: {
      deskId
    }
  })
}
export function addOrder (params) {
  return request({
    url: '/order/restaurant',
    method: 'post',
    data: params
  })
}
