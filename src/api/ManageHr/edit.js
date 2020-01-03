import request from '@/utils/request'
// - FIXME: 数据字典

// - FIXME: 门店设置
const DELT = {
  edit: (data, id) => {
    return request({
      url: '/v1/staff/update?id=' + id,
      method: 'put',
      data: data
    }).then(res => {
      return res
    })
  }
}
export default DELT
