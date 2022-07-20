<template>
  <el-dialog
    v-model="dialogVisible"
    title="Tips"
    width="30%"
    :before-close="handleClose"
  >
    <div class="right-articles">
      <div class="ac-title">
        <el-input v-model="myTitle" placeholder="Please input" />
      </div>
      <div class="ac-date">
        <el-input v-model="myDate" placeholder="Please input" />
      </div>
      <div class="ac-tags">
        <el-input v-model="myTags" placeholder="Please input" />
      </div>
      <div class="ac-description">
        <el-input v-model="myDescription" placeholder="Please input" />
      </div>
      <div class="ac-content">
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
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, toRefs } from "vue";
import { ElMessageBox } from "element-plus";
const pros = defineProps({ dialogVisible: Boolean });
const { dialogVisible } = toRefs(pros);

const handleClose = (done: () => void) => {
  ElMessageBox.confirm("Are you sure to close this dialog?")
    .then(() => {
      done();
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

