import request from '@/utils/request'

export function getLastOne(params) {
  return request({
    url: '/detect-flow/api/v1/flow',
    method: 'get',
    params,
  })
}

export function getAllData(params) {
  return request({
    url: '/detect-flow/api/v1/flow/list',
    method: 'get',
    params,
  })
}


export function getWarningData(params) {
  return request({
    url: '/detect-flow/api/v1/warning',
    method: 'get',
    params,
  })
}