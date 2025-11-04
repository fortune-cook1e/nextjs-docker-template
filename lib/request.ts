// lib/axios.ts

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// 创建 axios 实例
const instance = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 可以自动加 token
    // const token = getToken();
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => Promise.reject(error)
);

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 可在此统一处理后端接口错误码
    if ('code' in response.data && response.data.code !== 0) {
      // 可以 toast.error(response.data.message);
      return Promise.reject(response.data);
    }
    return response;
  },
  error => {
    // 可全局处理网络异常
    // toast.error(error.message);
    return Promise.reject(error);
  }
);

// 封装泛型请求方法
export function get<T = any>(url: string, config?: AxiosRequestConfig) {
  return instance.get<T>(url, config).then(res => res.data);
}
export function post<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
  return instance.post<T>(url, data, config).then(res => res.data);
}

export default instance;
