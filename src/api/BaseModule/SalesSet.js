import request from '@/utils/request'

// 项目管理
export function fetchList(query) {
  return request({
    url: '/article/list',
    method: 'get',
    params: query
  })
}

// 产品管理
export function fetchArticle(id) {
  return request({
    url: '/article/detail',
    method: 'get',
    params: {
      id
    }
  })
}
// 优惠券table
export function CouponData(data) {
  return request({
    url: '/v1/coupon/index',
    method: 'get',
    params: data
  })
}
// 优惠券structure get data
export function structureGet(data) {
  return request({
    url: '/v1/department/list',
    method: 'get',
    params: data
  })
}
export function projectStructureGet(data) {
  return request({
    url: '/v1/project/tree',
    method: 'get',
    params: data
  })
}
export function productStructureGet(data) {
  return request({
    url: '/v1/product/tree',
    method: 'get',
    params: data
  })
}
export function setStructureGet(data) {
  return request({
    url: '/v1/card-package/tree',
    method: 'get',
    params: data
  })
}
// 优惠券新增渲染
export function vmgGcreate(data) {
  return request({
    url: '/v1/coupon/gcreate',
    method: 'get',
    params: data
  })
}
// 优惠券新增
export function vmgAdd(data) {
  return request({
    url: '/v1/coupon/create',
    method: 'post',
    data
  })
}
// 优惠券删除
export function vmDelete(data) {
  return request({
    url: '/v1/coupon/delete',
    method: 'DELETE',
    params: data
  })
}
// 优惠券修改渲染
export function vmAlterdata(data) {
  return request({
    url: '/v1/coupon/gupdate',
    method: 'get',
    params: data
  })
}
// 优惠券修改 
export function vmAlter(data){
  return request({
    url:'/v1/coupon/update',
    method:'put',
    params:{id:data.id},
    data
  })
}

// - FIXME: 赠送设置
// 赠送设置基本信息列表
export function getSendSet(params) {
  return request({
    url: '/v1/send-set/index',
    method: 'get',
    params
  })
}

// 获取赠送配置项
export function getGcreate() {
  return request({
    url: '/v1/send-set/gcreate',
    method: 'get'
  })
}

// 新建
export function addCreate(data) {
  return request({
    url: '/v1/send-set/create',
    method: 'post',
    data
  })
}

// 检索列表
export function getCategory() {
  return request({
    url: '/v1/send-set/category',
    method: 'get'
  })
}

// 获取数据回显
export function getGupdate(id) {
  return request({
    url: '/v1/send-set/gupdate?id=' + id,
    method: 'get'
  })
}

// 修改赠送信息
export function editUpdate(id, data) {
  return request({
    url: '/v1/send-set/update?id=' + id,
    method: 'put',
    data
  })
}

// 删除
export function batchDelete(data) {
  return request({
    url: '/v1/send-set/batch-delete',
    method: 'post',
    data
  })
}

// 项目检索
export function projectSearch() {
  return request({
    url: '/v1/project/search',
    method: 'get'
  })
}