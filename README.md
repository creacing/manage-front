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
