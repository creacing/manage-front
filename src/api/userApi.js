import request from "@/utils/request.js";

const UserApi = {};

UserApi.queryAllUsers = (params) => {
    return request({
        url: "/users",
        method: "get",
        data: params,
    });
};

export default UserApi;