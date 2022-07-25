import request from "@/utils/request.js";

const ConsoleApi = {};

ConsoleApi.sendCommend = (params) => {
    return request({
        url: "/get_console",
        method: "post",
        data: params,
    });
};

export default ConsoleApi;