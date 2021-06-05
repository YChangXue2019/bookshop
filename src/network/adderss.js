import { request } from "./request"

// 添加地址
export function addAdderss(params) {
    return request({
        url: "/api/address",
        method: "POST",
        params
    })
}
// 编辑地址
export function editAdderss(id, params) {
    return request({
        url: `/api/address/${id}`,
        method: "PUT",
        params
    })
}
// 删除地址
export function deleteAdderss(id) {
    return request({
        url: `/api/address/${id}`,
        method: "DELETE",
    })
}
// 获取地址列表
export function getAdderssList() {
    return request({
        url: '/api/address'
    })
}
// 获取地址详情
export function getAdderssDetail(id) {
    return request({
        url: `/api/address/${id}`
    })
}