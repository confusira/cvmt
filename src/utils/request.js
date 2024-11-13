import axios from 'axios';
import { useTokenStore } from '@/store/modules/auth'; // 根据实际路径调整
import { getActivePinia } from 'pinia';

export function request(config) {
    // 确保 Pinia 是激活状态
    if (!getActivePinia()) {
        throw new Error('Pinia is not active');
    }

    const tokenStore = useTokenStore();

    // 创建 axios 实例
    const instance = axios.create({
        baseURL: import.meta.env.VITE_APP_BASE_API,
        timeout: 10000,
    });

    // 配置请求拦截器
    instance.interceptors.request.use(
        (config) => {
            const token = tokenStore.getToken();
            // console.log("token", token);
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // 配置响应拦截器
    instance.interceptors.response.use(
        (response) => {
            return response.data;
        },
        (error) => {
            // 可以在这里处理一些常见的错误情况，例如未授权或令牌失效
            if (error.response && error.response.status === 401) {
                // 处理未授权错误，例如重定向到登录页面
                console.error("Unauthorized, please login.");
                // 例如：window.location.href = '/login';
            }
            return Promise.reject(error);
        }
    );

    // 发送请求
    return instance(config);
}

