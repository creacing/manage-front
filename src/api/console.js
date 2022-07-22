import request from "@/utils/request.js";

const ConsoleApi = {};

ConsoleApi.sendCommend = (params) => {
    return request({
        url: "/console",
        method: "post",
        data: params,
    });
};

export default ConsoleApi;