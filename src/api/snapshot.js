import axios from 'axios'
import request from '@/utils/request'

export function upload(file) {
  let config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }
  var formData = new FormData()
  formData.append('file', file)
  return axios.post(
    'http://localhost:9000/flow-analyze/snapshot/upload',
    formData,
    config
  )
}

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
