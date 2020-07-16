import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/detect-user/user/login',
    method: 'post',
    data,
  })
}
