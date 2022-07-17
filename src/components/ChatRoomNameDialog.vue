<template>
  <el-button text @click="centerDialogVisible = true">创建房间</el-button>

  <el-dialog
    v-model="centerDialogVisible"
    title="Notice"
    width="30%"
    destroy-on-close
    center
  >
    <span
      >Notice: before dialog gets opened for the first time this node and the
      one bellow will not be rendered</span
    >
    <div>
      <strong>Extra content (Not rendered)</strong>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const centerDialogVisible = ref(false);
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
