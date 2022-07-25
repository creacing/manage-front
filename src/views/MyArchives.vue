<template>
  <el-input v-model="filterText" placeholder="search article" />

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

const dataTree: Tree[] = ref([]);

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
const emit = defineEmits(["nodeClick"]);

const nodeClick = (node, attributes, event) => {
  const title = node.label;

  emit("nodeClick", title);
};
</script>
<style lang="'scss'" scoped>
</style>