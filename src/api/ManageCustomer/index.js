import request from '@/utils/request'
const getList = {
  get: (data) => {
    return request({
      url: '/v1/customer/index',
      method: 'get',
      params:data
    }).then(res => {
      return res
    })
  }
  
}
export default getList
