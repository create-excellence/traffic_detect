import request from '@/utils/request'

export function add(data) {
  return request({
    url: '/flow-analyze/snapshot/add',
    method: 'post',
    data,
  })
}

export function get(data) {
  return request({
    url: '/flow-analyze/snapshot/' + data.id,
    method: 'get',
    data,
  })
}

export function _delete(data) {
  return request({
    url: '/flow-analyze/snapshot/delete/' + data.id,
    method: 'delete',
    data,
  })
}

export function update(data) {
  return request({
    url: '/flow-analyze/snapshot/update',
    method: 'put',
    data,
  })
}

export function querySnapshots(queryOption) {
  return request({
    url: '/flow-analyze/snapshot/list',
    method: 'get',
    queryOption,
  })
}
