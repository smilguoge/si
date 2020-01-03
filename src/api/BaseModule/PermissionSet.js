import request from '@/utils/request'

// FIXME: 权限组主模块
export class authGroup {
  list(params) {
    return request({
      url: '/v1/auth-group/list',
      method: 'get',
      params
    })
  }
  create(data) {
    return request({
      url: '/v1/auth-group/create',
      method: 'post',
      data
    })
  }
  update(data) {
    return request({
      url: '/v1/auth-group/update',
      method: 'put',
      data
    })
  }
  gupdate(params) {
    return request({
      url: '/v1/auth-group/gupdate',
      method: 'get',
      params
    })
  }
  delete(params) {
    return request({
      url: '/v1/auth-group/delete',
      method: 'delete',
      params
    })
  }
}

// FIXME: 权限明细模块
export class authGroupDetail {
  gupdate(params) {
    return request({
      url: '/v1/auth-group-detail/gupdate',
      method: 'get',
      params
    })
  }
  update(data) {
    return request({
      url: '/v1/auth-group-detail/update',
      method: 'put',
      data
    })
  }
  findData(params) {
    return request({
      url: '/v1/auth-group-detail/find-data',
      method: 'get',
      params
    })
  }
  view(id) {
    return request({
      url: '/v1/staff/view?id=' + id,
      method: 'get',
      id
    })
  }
}
