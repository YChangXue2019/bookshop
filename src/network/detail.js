import { request } from 'network/request';
export function getDetails(id) {
    return request({
        url: '/api/goods/' + id,
    })
};