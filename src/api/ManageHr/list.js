import request from '@/utils/request'
// - FIXME: 数据字典

// - FIXME: 门店设置
export function getList(id) {
  return request({
    url: '/v1/staff/index?shop_ids=' + id,
    method: 'get'
  }).then(res => {
    return res
  })
}
