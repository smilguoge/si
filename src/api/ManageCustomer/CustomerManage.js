import request from '@/utils/request'

// FIXME: 权限组主模块
export class customerTransfer {
  index(params) {
    return request({
      url: '/v1/customer-transfer/index',
      method: 'get',
      params
    })
  }
  shopView() {
    return request({
      url: '/v1/department/list',
      method: 'get'
    })
  }
}
