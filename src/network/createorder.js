import { request } from "./request"
// 预览订单
export function getOrderPreview() {
    return request({
        url: '/api/orders/preview'
    })
}
// 创建订单
export function createOrders(params) {
    return request({
        url: '/api/orders',
        method: "POST",
        params
    })
}
// 获取订单详情
export function getOrdersDetail(order) {
    return request({
        url: `/api/orders/${order}`,
        params: {
            include: 'user,orderDetails.goods'
        }
    })
}
// 获取订单支付二维码
export function getPayOrders(order, params) {
    return request({
        url: `/api/orders/${order}/pay`,
        params
    })
}
// 获取支付状态
export function getOrdersStatus(order) {
    return request({
        url: `/api/orders/${order}/status`
    })
}
// 获取订单列表
export function getOrdersList(params) {
    return request({
        url: `/api/orders`,
        params
    })
}
// 确认订单
export function confirmOrders(order) {
    return request({
        url: `/api/orders/${order}/confirm`,
        method: 'PATCH'
    })
}
// 获取物流详情
export function confirmOrdersExpress(order) {
    return request({
        url: `/api/orders/{order}/express`,
    })
}