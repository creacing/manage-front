<template>
  <el-dialog
    v-model="dialogVisible"
    title="创建文章"
    width="30%"
    :before-close="handleClose"
  >
    <div class="right-articles">
      <div class="ac-title">
        <div>标题</div>
        <el-input v-model="myTitle" placeholder="Please input" />
      </div>
      <div class="ac-date">
        <div>日期</div>
        <el-input v-model="myDate" placeholder="Please input" />
      </div>
      <div class="ac-tags">
        <div>标签</div>
        <el-input v-model="myTags" placeholder="Please input" />
      </div>
      <div class="ac-description">
        <div>描述</div>
        <el-input v-model="myDescription" placeholder="Please input" />
      </div>
      <div class="ac-content">
        <div>内容</div>
        <el-input
          v-model="myContent"
          :rows="10"
          type="textarea"
          placeholder="Please input"
        />
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleClose">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, toRefs } from "vue";
import { ElMessageBox } from "element-plus";
const pros = defineProps({ dialogVisible: Boolean });
const { dialogVisible } = toRefs(pros);
const emit = defineEmits(["closeDialog"]);
const handleClose = (done: () => void) => {
  // emit("closeDialog", false);

  ElMessageBox.confirm("确定关闭?")
    .then(() => {
      console.log("111111");
      emit("closeDialog", false);
      // done();
    })
    .catch(() => {
      // catch error
    });
};

const myTitle = ref("");
const myDate = ref("");
const myTags = ref("");
const myDescription = ref("");
const myContent = ref("");

// watch user action temp store localstorage
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>

