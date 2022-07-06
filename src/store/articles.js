import { defineStore } from 'pinia'
import ArticlesApi from "@/api/articlesApi.js";

export const articlesStore = defineStore({
    id: 'articles',  // 命名，唯一
    state: () => {
        return {
          articlesTitles: []
        }
    },
    actions: {
       async setArticles() {
            const res = await ArticlesApi.queryAllArticles()
            if (res?.code === "20000") {
              const { data } = res;
              this.articlesTitles = data;
            }
        },
    }
})
