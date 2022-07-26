import axios from "axios";
import router from "@/router/router.js";
import { ElMessage } from "element-plus";

//axios创建对象
const Server = axios.create({
    baseURL: "http://127.0.0.1:7001",
    // baseURL: '/api',
    timeout: 8000,
});
//定义前置拦截 请求发出去前触发
Server.interceptors.request.use(
    (config) => {
        //检查token
        if (localStorage.getItem("m-token")) {
            config.headers.Authorization =
                "Bearer" + "  " + localStorage.getItem("m-token");
        }
        // console.log('config',config);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
//定义后置拦截器 响应拦截 服务器响应回来之前触发
//有的一个页面请求几个接口，当token过期或者账号被迫下线，避免出现多个弹窗，自定义cont，判断cont==0时候弹窗一次，然后cont++
// let count = 0;
Server.interceptors.response.use(
    (res) => {
        // if (res.data.type === "logout") {
        //     if (count === 0) {
        //         localStorage.removeItem("m-token");
        //         if (router.currentRoute.value.path !== "/login") {
        //             router.push("/login");
        //         }
        //         //弹框
        //         ElMessage.success("登出成功！");
        //         setTimeout(() => {
        //             count = 0;
        //         });
        //     }
        //     count++;
        // }
        if (res.status == 401) {
            router.push("/login");
        }
        return res.data;
    },
    (error) => {
      console.log('error',error);
        const responseCode = error?.response?.status;
        switch (responseCode) {
            case 400:
                ElMessage.error("请求错误(400)");
                break;
            case 401:
                // if (count == 0) {
                //     ElMessage.error("登录过期，请重新登录");
                // }
                ElMessage.error("登录过期，请重新登录");

                count++;
                localStorage.removeItem("m-token");
                if (router.currentRoute.value.path !== "/login") {
                    router.push("/login");
                }
                break;
            case 403:
                ElMessage.error("拒绝访问(403)");
                break;
            case 404:
                ElMessage.error("请求出错(404)");
                break;
            case 408:
                ElMessage.error("请求超时(408)");
                break;
            case 500:
                ElMessage.error("服务器错误(500)");
                break;
            case 501:
                ElMessage.error("服务未实现(501)");
                break;
            case 502:
                ElMessage.error("网络错误(502)");
                break;
            case 503:
                ElMessage.error("服务不可用(503)");
                break;
            case 504:
                ElMessage.error("网络超时(504)");
                break;
            case 505:
                ElMessage.error("HTTP版本不受支持(505)");
                break;
            default:
                ElMessage.error("未知的错误");
        }
        return Promise.reject(error);
    }
);

export default Server;