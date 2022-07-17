import request from "@/utils/request.js";

const ChatApi = {};

ChatApi.createRoom = (params) => {
    return request({
        url: "/createRoom",
        method: "get",
        params: params,
    });
};


export default ChatApi;