import request from '@/utils/request'
export function getUserInfo (params) {
  return request({
    url: '/user/userinfo',
    method: 'get',
    params: params
  })
}
export function changeUserInfo (params) {
  return request({
    url: '/user/changeinfo',
    method: 'put',
    data: params
  })
}
export function checkUser (params) {
  return request({
    url: '/user/checkuser',
    method: 'get',
    params: params
  })
}
