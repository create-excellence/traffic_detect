import request from '@/utils/request'


export function queryCamera(params) {
    return request({
      url: '/camera/list',
      method: 'get',
      params
    })
  }
  
  export function createCamera(data) {
    return request({
      url: '/camera',
      method: 'post',
      data
    })
  }
  
  export function putCamera(editForm) {
    return request({
      url: '/camera/'+editForm.id,
      method: 'put',
      data:editForm.data
    })
  }
  
  export function deleteCamera(id) {
    return request({
      url: '/camera/' + id,
      method: 'delete'
    })
  }
  