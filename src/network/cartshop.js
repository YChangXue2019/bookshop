import { request } from './request'
// 添加购物车
export function addCart(data) {
    return request({
        url: '/api/carts',
        method: "post",
        data
    })
}
// 获取购物车列表
export function getCart(data = "") {
    return request({
        url: '/api/carts?' + data,
    })
}
// 修改购物车数量
export function modifyCart(id, data) {
    return request({
        url: `/api/carts/${id}`,
        method: "PUT",
        data
    })
}
// 移出购物车
export function deleteCartItem(id) {
    return request({
        url: `/api/carts/${id}`,
        method: "delete",
    })
}
// 购物车改变选中状态
export function checkedCart(data) {
    return request({
        url: '/api/carts/checked',
        method: "patch",
        data
    })
}