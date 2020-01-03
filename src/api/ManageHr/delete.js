import request from '@/utils/request'
// - FIXME: 数据字典

// - FIXME: 门店设置
const DELT = {
  delt: (id) => {
    return request({
      url: '/v1/staff/delete?id=' + id,
      method: 'delete'
    }).then(res => {
      return res
    })
  },
  delt2: (id) => {
    return request({
      url: '/v1/staff/batch-delete?ids=' + id,
      method: 'post'
    }).then(res => {
      return res
    })
  }
}
export default DELT
