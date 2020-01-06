import request from '@/utils/request'
export function createStock(data) {
  return request({
    url: '/v1/wh-in-stock/create',
    method: 'post',
    data
  })
}

export function deleteStock(data) {
  return request({
    url: '/v1/wh-in-stock/delete',
    method: 'delete',
    data
  })
}

export function stockList(query) {
  return request({
    url: '/v1/wh-in-stock/list',
    method: 'get',
    params: query

  })
}
export function stockCancel(data) {
  return request({
    url: '/v1/wh-in-stock/cancel',
    method: 'post',
    data
  })
}
export function stockCheck(data) {
  return request({
    url: '/v1/wh-in-stock/confirm',
    method: 'post',
    data
  })
}
export function getStocylist(query) {
  return request({
    url: '/v1/wh-in-stock/list',
    method: 'get',
    params: query

  })
}
