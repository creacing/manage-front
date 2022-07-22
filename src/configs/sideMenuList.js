import {
  ChatDotRound,
  Notebook,
  Sugar,
  Setting,
  ChatSquare,
  VideoPlay,
  ShoppingBag,
  Magnet,
  Files,
  ToiletPaper,
} from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
const router = useRouter();
const sideMenuList = [
  {
    name: "加入聊天",
    index: "0",
    cb: () => {
      router.push({ path: "/home" });
    },
    icon: ChatDotRound,
  },
  {
    name: "文章管理",
    index: "1",
    cb: () => {
      router.push({ path: "/articles" });
    },
    icon: Notebook,
  },
  {
    name: "行情关注",
    index: "2",
    cb: () => {
      router.push({ path: "/stocks" });
    },
    icon: Sugar,
  },
  {
    name: "我的设置",
    index: "3",
    cb: () => {
      router.push({ path: "/mySettings" });
    },
    icon: Setting,
  },
  {
    name: "邮件管理",
    index: "4",
    cb: () => {
      router.push({ path: "/mail" });
    },
    icon: ChatSquare,
  },
  {
    name: "音乐测试",
    index: "5",
    cb: () => {
      router.push({ path: "/music" });
    },
    icon: VideoPlay,
  },
  {
    name: "关注商品",
    index: "6",
    cb: () => {
      router.push({ path: "/product" });
    },
    icon: ShoppingBag,
  },
  // {
  //   name: "WIFI信息",
  //   index: "7",
  //   cb: () => {
  //     router.push({ path: "/wifiManage" });
  //   },
  //   icon: Magnet
  // },
  {
    name: "文档信息",
    index: "8",
    cb: () => {
      router.push({ path: "/document" });
    },
    icon: Files,
  },
  {
    name: "番剧信息",
    index: "8",
    cb: () => {
      router.push({ path: "/amination" });
    },
    icon: ToiletPaper,
  },
];

export default sideMenuList