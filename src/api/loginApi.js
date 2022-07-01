import request from "@/utils/request.js";

const LoginApi = {};

LoginApi.login = (params) => {
    return request({
        url: "/login",
        method: "post",
        data: params,
    });
};

LoginApi.register = (params) => {
  return request({
      url: "/register",
      method: "post",
      data: params,
  });
};

export default LoginApi;