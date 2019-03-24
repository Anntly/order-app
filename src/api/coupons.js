import request from '@/utils/request'
export function getCoupons (restaurantId) {
  return request({
    url: '/coupons/user/restaurant',
    method: 'get',
    params: {
      restaurantId
    }
  })
}
export function receiveCoupon (params) {
  return request({
    url: '/coupons/user/receive',
    method: 'post',
    params: params
  })
}
export function getMyCoupons (totalFee) {
  return request({
    url: '/coupons/user/mycoupons',
    method: 'get',
    params: {
      totalFee
    }
  })
}