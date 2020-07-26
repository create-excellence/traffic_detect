import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/detect-user/user/login',
    method: 'post',
    data,
  })
}

export function add(data) {
  return request({
    url: '/detect-user/user/add',
    method: 'post',
    data,
  })
}

export function get(params) {
  return request({
    url: '/detect-user/user/' + params.id,
    method: 'get',
    params,
  })
}

export function _delete(data) {
  return request({
    url: '/detect-user/user/delete/' + data.id,
    method: 'delete',
    data,
  })
}

export function update(data) {
  return request({
    url: '/detect-user/user/update',
    method: 'put',
    data,
  })
}

export function queryUsers(params) {
  return request({
    url: '/detect-user/user/list',
    method: 'get',
    params,
  })
}
