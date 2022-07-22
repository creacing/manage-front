<template>
  <el-drawer
    v-model="showDrawer"
    direction="rtl"
    title="设置"
    @close="drawerClose"
  >
    <template #default>
      <RightSettingList />
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">取消</el-button>
        <el-button type="primary" @click="confirmClick">保存</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
import RightSettingList from "./RightSettingList.vue";
import { ref, toRefs, watch } from "vue";
import { ElMessageBox } from "element-plus";
const props = defineProps({ showDrawer: Boolean });
const { showDrawer } = toRefs(props);
const emit = defineEmits(["changeDrawer"]);
const handleClose = (done: () => void) => {
  ElMessageBox.confirm("确定关闭?")
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};
function cancelClick() {
  emit("changeDrawer", false);
}
function confirmClick() {
  ElMessageBox.confirm(`确定保存?`)
    .then(() => {
      emit("changeDrawer", false);
    })
    .catch(() => {
      // catch error
    });
}

const drawerClose = function () {
  emit("changeDrawer", false);
};
</script>