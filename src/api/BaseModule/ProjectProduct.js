import request from '@/utils/request'

// FIXME: 项目资料
export class projectData {
  index(params) {
    return request({
      url: '/v1/project/index',
      method: 'get',
      params
    })
  }
  view(id) {
    return request({
      url: '/v1/project/view?id=' + id,
      method: 'get'
    })
  }
  gcreate() {
    return request({
      url: 'v1/product/gcreate',
      method: 'get'
    })
  }
  create(data) {
    return request({
      url: '/v1/project/create',
      method: 'post',
      data
    })
  }
  update(data, id) {
    return request({
      url: '/v1/project/update?id=' + id,
      method: 'put',
      data
    })
  }
  delete(id) {
    return request({
      url: '/v1/project/delete?id=' + id,
      method: 'delete'
    })
  }
}

// FIXME: 项目类别
export class projectClass {
  index(data) {
    return request({
      url: '/v1/project-class/index',
      method: 'get',
      data
    })
  }
  create(data) {
    return request({
      url: '/v1/project-class/create',
      method: 'post',
      data
    })
  }
  update(data, id) {
    return request({
      url: '/v1/project-class/update?id=' + id,
      method: 'put',
      data
    })
  }
  delete(data) {
    return request({
      url: '/v1/project-class/batch-delete',
      method: 'post',
      data
    })
  }
}

// FIXME: 产品资料
export class productData {
  index(params) {
    return request({
      url: '/v1/product/index',
      method: 'get',
      params
    })
  }
  view(id) {
    return request({
      url: '/v1/product/view?id=' + id,
      method: 'get'
    })
  }
  gcreate() {
    return request({
      url: 'v1/product/gcreate',
      method: 'get'
    })
  }
  create(data) {
    return request({
      url: '/v1/product/create',
      method: 'post',
      data
    })
  }
  update(data, id) {
    return request({
      url: '/v1/product/update?id=' + id,
      method: 'put',
      data
    })
  }
  delete(id) {
    return request({
      url: '/v1/product/delete?id=' + id,
      method: 'delete'
    })
  }
}

// FIXME: 产品类别
export class productClass {
  index(data) {
    return request({
      url: '/v1/product-class/index',
      method: 'get',
      data
    })
  }
  create(data) {
    return request({
      url: '/v1/product-class/create',
      method: 'post',
      data
    })
  }
  update(data, id) {
    return request({
      url: '/v1/product-class/update?id=' + id,
      method: 'put',
      data
    })
  }
  delete(data) {
    return request({
      url: '/v1/product-class/batch-delete',
      method: 'post',
      data
    })
  }
}
