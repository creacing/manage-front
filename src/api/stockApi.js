import request from "@/utils/request.js";

const StockApi = {};

StockApi.queryStocks = (params) => {
    return request({
        url: "/stocks",
        method: "get",
        params: params,
    });
};


export default StockApi;