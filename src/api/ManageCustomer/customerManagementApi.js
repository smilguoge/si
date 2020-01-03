import request from '@/utils/request'
// import { reset } from '_ansi-colors@3.2.4@ansi-colors';
const Api = {
  // 新建
  basicInfo: (data) => {
    return request({
      url: '/v1/customer/create',
      method: 'post',
      data: data
    }).then(res => {
      return res
    })
  },
  // 新建初始化
  basicInfoInit: () => {
    return request({
      url: '/v1/customer/gcreate',
      method: 'get'
    }).then(res => {
      return res.data
    })
  },
  // 修改
  edit: (id, data) => {
    return request({
      url: '/v1/customer/update?id=' + id,
      method: 'PUT',
      data: data
    }).then(res => {
      return res
    })
  },
  // 修改初始化
  editInit: (id) => {
    return request({
      url: '/v1/customer/gupdate?id=' + id,
      method: 'GET'
    }).then(res => {
      return res.data
    })
  },
  // 查询
  query(data) {
    return request({
      url: '/v1/customer/index',
      method: 'GET',
      params: data
    }).then(res => {
      return res.data.list
    })
  },
  // 删除
  delt(ids) {
    return request({
      url: '/v1/customer/batch-delete',
      method: 'post',
      data: {
        ids: ids
      }
    }).then(res => {
      return res
    })
  },
  // 重置密码
  reset(data) {
    return request({
      url: '/v1/customer/refresh',
      method: 'post',
      data: data
    }).then(res => {
      return res
    })
  },
  // 获取介绍会员
  get_customer(keyword) {
    return request({
      url: '/v1/customer/search',
      method: 'get',
      params: {
        keyword: keyword
      }
    }).then(res => {
      return res.data
    })
  },

  // 获取宣传员
  get_staff(val) {
    return request({
      url: '/v1/staff/search',
      method: 'get',
      params: {
        val	: val	
      }
    }).then(res => {
      return res.data
    })
  },
}
export default Api