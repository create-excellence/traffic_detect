import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data,
  })
}

export function add(data) {
  return request({
    url: '/user/add',
    method: 'post',
    data,
  })
}

export function get(data) {
  return request({
    url: '/user/' + data.id,
    method: 'get',
    data,
  })
}

export function _delete(data) {
  return request({
    url: '/user/delete/' + data.id,
    method: 'delete',
    data,
  })
}

export function update(data) {
  return request({
    url: '/user/update',
    method: 'put',
    data,
  })
}

export function queryUsers(queryOption) {
  return request({
    url: '/user/list',
    method: 'get',
    queryOption,
  })
}
