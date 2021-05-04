/*
* 封装axios
* */
import axios from "axios";

import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'

//引入elementUI中的Notification
import {Notification} from 'element-ui'

import auth from "@/utils/auth";

//创建axios
/*
* instance对象 就是我们之前在项目中使用 axios
*
* */
import baseURL from "@/utils/BaseURL";

const instance = axios.create({
    baseURL: baseURL.baseURL,
    timeout: 5000,
});
// Add a request interceptor
instance.interceptors.request.use(function (config) {
    config.headers.Authorization = "Bearer " + auth.getToken();
    NProgress.start();
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    let {status, message, data} = response.data;
    NProgress.done();
    if (status == 20000) {
        return data;
    } else {
        Notification.error(message)
        return Promise.reject(false);
    }


}, function (error) {

    return Promise.reject(error);
});

export default instance;

