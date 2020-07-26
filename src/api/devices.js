import request from '@/utils/request'

export function queryCamera(params) {
  return request({
    url: '/detect-camera/api/v1/camera/list',
    method: 'get',
    params,
  })
}

export function getCameraById(params) {
  return request({
    url: '/detect-camera/api/v1/camera',
    method: 'get',
    params,
  })
}

export function createCamera(data) {
  return request({
    url: '/detect-camera/api/v1/camera',
    method: 'post',
    data,
  })
}

export function putCamera(editForm) {
  return request({
    url: '/detect-camera/api/v1/camera/' + editForm.id,
    method: 'put',
    data: editForm.data,
  })
}

export function deleteCamera(id) {
  return request({
    url: '/detect-camera/api/v1/camera/' + id,
    method: 'delete',
  })
}
