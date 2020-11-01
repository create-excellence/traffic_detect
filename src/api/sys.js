import request from '@/utils/sys_request'

export function GetCodecInfo() {
  return request({
    url: '/GetCodecInfo',
    method: 'get'
  })
}

export function GetRunInfo() {
  return request({
    url: '/GetRunInfo',
    method: 'get'
  })
}


