import request from '@/utils/request'
// 预约管理主界面get
export function makeAppGet(data) {
  return request({
    url: '/v1/booking/index',
    method: 'get',
    params: data
  })
}
