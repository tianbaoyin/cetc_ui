<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="测试设计信息" name="first">测试设计信息</el-tab-pane>
      <el-tab-pane label="测试执行信息" name="second">测试执行信息</el-tab-pane>
      <el-tab-pane label="执行问题信息" name="third">执行问题信息</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: 'second'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
