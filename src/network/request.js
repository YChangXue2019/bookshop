import axios from 'axios';
import router from '../router'
import { Toast, Notify } from 'vant';
export function request(config) {
    const instance = axios.create({
        baseURL: 'https://api.shop.eduwork.cn',
        timeout: 5000
    });
    // 请求拦截
    instance.interceptors.request.use(config => {
        // 如果一个接口需要认证才能够访问，就在这里统一设置
        const token = window.localStorage.getItem('token');
        // console.log(token);
        if (token) {
            config.headers.Authorization = "Bearer " + token;
        }
        // 直接放行
        return config;

    }, err => {
        console.log(err);
    });
    // 响应拦截
    instance.interceptors.response.use(res => {
        return res.data ? res.data : res;
    }, err => {
        // 如果需要授权才可以访问的接口，统一去login授权
        if (err.response.status == 401) {
            Toast.fail("请先登录");
            setTimeout(() => {
                router.push("/login");
            }, 500)
        }

        // 如果有错误，这里面会去处理，显示错误信息
        Notify(err.response.data.errors[Object.keys(err.response.data.errors)[0]][0]);
        // console.log(err.response.data.errors[Object.keys(err.response.data.errors)[0]][0]);
    });
    // 返回实例
    return instance(config);
}