import request from '@/utils/request'
// 班次管理查询
export function ShiftsGet(data) {
    return request({
        url: '/v1/schedule-set/index',
        method: 'get',
        params: data
    })
}
// 班次管理门店
export function ShiftsStoreGet(data) {
    return request({
        url: '/v1/shop/list',
        method: 'get',
        params: data
    })
}
// 班次管理删除
export function ShiftsStoreDelete(data) {
    return request({
        url: '/v1/schedule-set/batch-delete',
        method: 'post',
        params: data
    })
}
// 排班设置查询
export function ShiftsSettingGet(data) {
    return request({
        url: '/v1/schedule-set/list',
        method: 'get',
        params: data
    })
}
// 排班设置新建

export function ShiftsSettingCreate(data) {
    return request({
        url: '/v1/schedule-set/create',
        method: 'post',
        data
    })
}
// 排班设置
export function ShiftsSettingSetD(data) {
    return request({
        url: '/v1/schedule-set/batchs-delete',
        method: 'post',
        params: data
    })
}
