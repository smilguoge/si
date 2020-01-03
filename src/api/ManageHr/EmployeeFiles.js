import request from '@/utils/request'
const Employeeapi = {
  // 首页表单列表
  getList(id) {
    return request({
      url: '/v1/staff/index?shop_ids=' + id,
      method: 'get'
    }).then(res => {
      return res
    })
  },

  // 首页新增
  newAdd: (param) => {
    return request({
      url: '/v1/staff/create',
      method: 'post',
      data: param
    }).then(res => {
      return res
      console.log(res)
    })
  },

  // 首页删除
  delt: (id) => {
    return request({
      url: '/v1/staff/delete?id=' + id,
      method: 'delete'
    }).then(res => {
      return res
    })
  },

  // 首页修改
  edit: (data, id) => {
    return request({
      url: '/v1/staff/update?id=' + id,
      method: 'put',
      data: data
    }).then(res => {
      return res
    })
  },

  // 修改详情
  editInfo(id) {
    return request({
      url: '/v1/staff/gupdate?id=' + id,
      method: 'get'
    }).then(res => {
      return res.data
    })
  },

  // 首页查询
  query(data) {
    return request({
      url: '/v1/staff/index',
      method: 'get',
      params: data
    }).then(res => {
      return res
    })
  },

  // 员工异动列表
  moveList() {
    return request({
      url: '/v1/staff-change-dtl/index',
      method: 'get'
    }).then(res => {
      return res.data.list
    })
  },

  // 员工借调结束
  end(id, data) {
    return request({
      url: '/v1/staff-change-dtl/update?id=' + id,
      method: 'put',
      data: data
    }).then(res => {
      return res
    })
  },

  // 人员变动新建
  add_m_info(param) {
    return request({
      url: 'v1/staff-change-dtl/create',
      method: 'post',
      data: param
    }).then(res => {
      return res
    })
  },

  // 员工新增渲染
  initInfo() {
    return request({
      url: 'v1/staff/gcreate',
      method: 'get'
    }).then(res => {
      return res.data
    })
  },

  // 获取介绍人
  get_references() {
    return request({
      url: '/v1/staff/search',
      method: 'get'
    }).then(res => {
      return res
    })
  },

  // 获取职务列表
  get_position(name) {
    return request({
      url: '/v1/position/list',
      method: 'get',
      params: {
        name: name
      }
    }).then(res => {
      return res.data
    })
  },

  // 获取门店列表
  get_shop(name) {
    return request({
      url: '/v1/shop/list',
      method: 'get',
      params: {
        name: name
      }
    }).then(res => {
      return res.data
    })
  }
}
export default Employeeapi
