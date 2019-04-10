import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/admin/list',
    method:'get',
    params:params
  })
}
export function updateStatus(id,params) {
  return request({
    url:'/admin/update/status/'+id,
    method:'post',
    params:params
  })
}
export function deleteUser(id) {
  return request({
    url:'/admin/delete/'+id,
    method:'post'
  })
}
export function createUser(data) {
  return request({
    url:'/admin/register',
    method:'post',
    data:data
  })
}
export function getUser(id) {
  return request({
    url:'/admin/'+id,
    method:'get',
  })
}

export function updateUser(id,data) {
  return request({
    url:'/admin/update/'+id,
    method:'post',
    data:data
  })
}
