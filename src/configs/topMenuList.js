const getTopMenuList = (router)=>{
  const topMenuList = [
    {
      name: "管理中心",
      index: "0",
      cb: () => {
        router.push({ path: "/" });
      },
    },
    {
      name: "系统监控",
      index: "1",
      cb: () => {
        router.push({ path: "/serverManage" });
      },
    },
    {
      name: "用户管理",
      index: "2",
      cb: () => {
        router.push({ path: "/users" });
      },
    },
  ];

  return topMenuList
}


export default getTopMenuList