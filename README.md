# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

<!-- yarn add websocket 

yarn add socket.io-client -->

### simple start

yarn install
yarn dev
yarn add socket.io-client

vue3+vite 热更新失效

问题：修改页面内容，保存发现页面不重新渲染，代码编辑器也不重新编译。重新安装依赖包也未生效。

原因：发现页面文件名和路由引入大小写不一致。

处理：router 路由中名称和引入文件路径及文件名需要保证大小写一致


line-height 使用无单位的值 以确保行高也会等比例缩放。
行高=行间距+字体大小=上半行距+字体大小+下半行距

当属性值的大小需要根据当前元素字体尺寸缩放时，就选用em，其它的情况都使用更简单的rem。

。大致理解：主线程完成同步环境执行，查询任务队列，提取队首的任务，放入主线程中执行；执行完毕，再重复该操作，该过程称为事件循环。而主线程的每次读取任务队列操作，是一个事件循环的开始。异步callback不可能处在同一事件循环中。