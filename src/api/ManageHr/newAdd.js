import request from '@/utils/request'
// - FIXME: 数据字典

// - FIXME: 门店设置
export function newAdd() {
  return request({
    url: '/v1/staff/create',
    method: 'get'
  }).then(res => {
    console.log(res)
  })
}
