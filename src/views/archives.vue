<template>
  <el-input v-model="filterText" placeholder="Filter keyword" />

  <el-tree
    ref="treeRef"
    class="filter-tree"
    :data="dataTree"
    :props="defaultProps"
    default-expand-all
    :filter-node-method="filterNode"
    @node-click="nodeClick"
  />
</template>

<script lang="ts" setup>
import { ref, watch, onBeforeMount } from "vue";
import { ElTree } from "element-plus";
import ArticlesApi from "@/api/articlesApi.js";
interface Tree {
  id: number;
  label: string;
  children?: Tree[];
}

const filterText = ref("");
const treeRef = ref<InstanceType<typeof ElTree>>();

const defaultProps = {
  children: "children",
  label: "label",
};

watch(filterText, (val) => {
  treeRef.value!.filter(val);
});

const filterNode = (value: string, data: Tree) => {
  if (!value) return true;
  return data.label.includes(value);
};

const dataTree: Tree[] = ref([
  // {
  //   id: 1,
  //   label: "Level one 1",
  //   children: [
  //     {
  //       id: 4,
  //       label: "Level two 1-1",
  //       children: [
  //         {
  //           id: 9,
  //           label: "Level three 1-1-1",
  //         },
  //         {
  //           id: 10,
  //           label: "Level three 1-1-2",
  //         },
  //       ],
  //     },
  //   ],
  // },
]);

onBeforeMount(() => {
  ArticlesApi.queryAllArticles().then((res) => {
    console.log("articles", res);
    if (res.code === "20000") {
      const categories = res.data;
      let count = 0;
      const out = [];
      for (const category in categories) {
        const temp = {
          id: count,
          label: category,
          children: [],
        };
        count++;

        const titles = categories[category];
        for (const title of titles) {
          temp.children.push({
            id: count,
            label: title,
          });
          count++;
        }
        out.push(temp);
      }
      dataTree.value = out;
    }
    console.log("dataTree.value", dataTree.value);
  });
});
const nodeClick = (node, attributes, event) => {
  const title = node.label;

  console.log("node, attributes, event", title);

  ArticlesApi.queryAllArticles({ articleTitle: title }).then((res) => {
    const out = res.data[0];

    console.log("one article", out);
  });
};
</script>
<style lang="'scss'" scoped>
</style>