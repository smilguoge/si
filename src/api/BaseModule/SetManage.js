import request from '@/utils/request'
// - FIXME: 数据字典

export function getDictionary(params) {
  return request({
    url: '/v1/dictionary/list',
    method: 'get',
    params
  })
}

export function getGupdate(id) {
  return request({
    url: '/v1/dictionary/gupdate?id=' + id,
    method: 'get'
  })
}

export function dictionaryUpdate(data) {
  return request({
    url: '/v1/dictionary/update',
    method: 'put',
    data
  })
}

// - FIXME: 门店设置
export function getShop(params) {
  return request({
    url: '/v1/shop/index',
    method: 'get',
    params
  })
}

export function editShop(id) {
  return request({
    url: '/v1/shop/view?id=' + id,
    method: 'get'
  })
}

export function createShop(data) {
  return request({
    url: '/v1/shop/create',
    method: 'post',
    data
  })
}

export function updateShop(data, id) {
  return request({
    url: '/v1/shop/update?id=' + id,
    method: 'put',
    data
  })
}

export function deleteShop(id) {
  return request({
    url: '/v1/shop/delete?id=' + id,
    method: 'delete'
  })
}

export function getShopList() {
  return request({
    url: '/v1/shop/list',
    method: 'get'
  })
}

export function gcreate() {
  return request({
    url: '/v1/shop/gcreate',
    method: 'get'
  })
}

export function gupdate() {
  return request({
    url: '/v1/shop/gupdate',
    method: 'get'
  })
}

// - FIXME: 公司设置
export function getCompany() {
  return request({
    url: '/v1/company/index',
    method: 'get'
  })
}

export function editCompany(id) {
  return request({
    url: '/v1/company/view?id=' + id,
    method: 'get'
  })
}

export function createCompany(data) {
  return request({
    url: '/v1/company/create',
    method: 'post',
    data
  })
}

export function updateCompany(data, id) {
  return request({
    url: '/v1/company/update?id=' + id,
    method: 'put',
    data
  })
}

export function deleteCompany(id) {
  return request({
    url: '/v1/company/delete?id=' + id,
    method: 'delete'
  })
}

// - FIXME: 部门设置
export function getDepart() {
  return request({
    url: '/v1/department/index',
    method: 'get'
  })
}

export function createDepart(data) {
  return request({
    url: '/v1/department/create',
    method: 'post',
    data
  })
}

export function updateDepart(data, id) {
  return request({
    url: '/v1/department/update?id=' + id,
    method: 'put',
    data
  })
}

export function deleteDepart(id) {
  return request({
    url: '/v1/department/delete?id=' + id,
    method: 'delete'
  })
}

export function viewDepart(id) {
  return request({
    url: '/v1/department/gupdate?id=' + id,
    method: 'get'
  })
}

// 获取部门树：详细到门店
export function getDepartList() {
  return request({
    url: '/v1/department/list',
    method: 'get'
  })
}

// 获取部门树：详细到员工
export function getDepartTree() {
  return request({
    url: '/v1/department/tree',
    method: 'get'
  })
}

// - FIXME: 职务管理

export function getPosition(params) {
  return request({
    url: '/v1/position/index',
    method: 'get',
    params
  })
}

export function createPosition(data) {
  return request({
    url: '/v1/position/create',
    method: 'post',
    data
  })
}

export function deletePosition(data) {
  return request({
    url: '/v1/position/batch-delete',
    method: 'post',
    data
  })
}

export function searchPosition(name) {
  return request({
    url: '/v1/position/search?name=' + name,
    method: 'get'
  })
}

export function updatePosition(id, data) {
  return request({
    url: '/v1/position/update?id=' + id,
    method: 'put',
    data
  })
}

export function positionGcreate() {
  return request({
    url: '/v1/position/gcreate',
    method: 'get'
  })
}

export function positionGupdate(id) {
  return request({
    url: '/v1/position/gupdate?id=' + id,
    method: 'get'
  })
}

export function positionList(id) {
  return request({
    url: '/v1/position/list',
    method: 'get'
  })
}

// - FIXME: 仓库设置

export function getWarehouse(params) {
  return request({
    url: '/v1/warehouse/index',
    method: 'get',
    params
  })
}

export function createWarehouse(data) {
  return request({
    url: '/v1/warehouse/create',
    method: 'post',
    data
  })
}

export function updateWarehouse(data, id) {
  return request({
    url: '/v1/warehouse/update?id=' + id,
    method: 'put',
    data
  })
}

export function deleteWarehouse(id) {
  return request({
    url: '/v1/warehouse/delete?id=' + id,
    method: 'delete'
  })
}

// - FIXME: 院装仓库设置

export function getWarehouseS(params) {
  return request({
    url: '/v1/warehouse-shop/index',
    method: 'get',
    params
  })
}
export function createWarehouseS(data) {
  return request({
    url: '/v1/warehouse-shop/create',
    method: 'post',
    data
  })
}

export function updateWarehouseS(data, id) {
  return request({
    url: '/v1/warehouse-shop/update?id=' + id,
    method: 'put',
    data
  })
}

export function deleteWarehouseS(id) {
  return request({
    url: '/v1/warehouse-shop/delete?id=' + id,
    method: 'delete'
  })
}
