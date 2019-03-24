import request from '@/utils/request'
export function getRestaurantById (id) {
  return request({
    url: '/shop/restaurant/id',
    method: 'get',
    params: {id}
  })
}
