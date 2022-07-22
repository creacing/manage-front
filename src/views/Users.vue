<template>
  <div class="my-users">
    <div class="my-users-operations">
      <div class="my-users-input">
        <el-input
          v-model="searchInput"
          class="w-50 m-2"
          size="large"
          placeholder="Please Input"
          :suffix-icon="Search"
        />
      </div>
      <el-button type="primary">
        <el-icon>
          <Refresh />
        </el-icon>
      </el-button>
      <!-- <el-button type="primary">Primary</el-button> -->
    </div>
    <div class="my-users-table">
      <el-table :data="tableData" style="width: 100%">
        <!-- <el-table-column label="Date" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-icon><timer /></el-icon>
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </div>
          </template>
        </el-table-column>-->
        <el-table-column :label="column.label" v-for="column in userColumn">
          <template #default="scope">
            <el-popover
              effect="light"
              trigger="hover"
              placement="top"
              width="auto"
            >
              <template #default>
                <div>{{ `${column.prop}: ${scope.row[column.prop]}` }}</div>
              </template>
              <template #reference>
                <el-tag v-if="column.prop === 'name'">
                  {{ scope.row.name }}
                </el-tag>
                <span v-else>{{ scope.row[column.prop] }}</span>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="Operations">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
              >Edit</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >Delete</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import UserApi from "@/api/userApi.js";
import { Timer, Search } from "@element-plus/icons-vue";
import { ref } from "vue-demi";

interface User {
  // date: string;
  // name: string;
  // address: string;
}

const handleEdit = (index: number, row: User) => {
  console.log(index, row);
};
const handleDelete = (index: number, row: User) => {
  console.log(index, row);
};
let tableData: User[] = ref([]);
const searchInput = ref("");
UserApi.queryAllUsers().then((res: any) => {
  console.log("res is:", res);
  if (res?.code === 20000) {
    tableData.value = res.data;
  }
});

const userColumn = [
  { label: "Name", prop: "name" },
  { label: "RegisterDate", prop: "registerDate" },
  { label: "Phone", prop: "phone" },
  { label: "LastModifyDate", prop: "lastModifyDate" },
  { label: "Level", prop: "level" },
  { label: "Ip", prop: "ip" },
];
</script>
<style lang="scss" scoped>
.my-users {
  height: 100%;
  background-color: #fff;
  // min-width: 1000px;
}
.my-users-operations {
  padding: 0.5rem;
  display: flex;
  .my-users-input {
    width: 15rem;
    margin-right: 0.5rem;
    :deep(.el-input) {
      height: 2rem;
    }
  }
  :deep(.el-button) {
    height: 2rem;
  }
}
</style>