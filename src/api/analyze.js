import request from '@/utils/request'

export function get(params) {
  return request({
    url: '/flow-analyze/analyze/flow',
    method: 'get',
    params,
  })
}

export function getAll(params) {
  return request({
    url: '/flow-analyze/analyze/flow-all',
    method: 'get',
    params,
  })
}
