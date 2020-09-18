<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="测试设计信息" name="first">测试设计信息</el-tab-pane>
      <el-tab-pane label="测试执行信息" name="second">
        <testexecute :node="node" :month-commit-form="monthCommitForm" />
      </el-tab-pane>
      <el-tab-pane label="执行问题信息" name="third">执行问题信息</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>

import testexecute from '@/views/qc/project/project/treenode/nodethird/projectInfo/testExecute.vue'
export default {
  components: {
    testexecute
  },
  props: {
    node: {
      type: Object,
      required: true
    },
    monthCommitForm: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      activeName: 'second'
    }
  },

  created() {

  },

  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
