<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="测试设计信息" name="first">
        <testDesign />
      </el-tab-pane>
      <el-tab-pane label="测试执行信息" name="second">
        <testexecute :node="node" :month-commit-form="monthCommitForm" />
      </el-tab-pane>
      <el-tab-pane label="执行问题信息" name="third">
        <implementProblem />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>

import testexecute from '@/views/qc/project/project/treenode/nodethird/projectInfo/testExecute.vue'
import testDesign from '@/views/qc/project/project/treenode/nodethird/monthCommit/components/testDesign/index.vue'
import implementProblem from '@/views/qc/project/project/treenode/nodethird/monthCommit/components/implementProblem/index.vue'
export default {
  components: {
    testexecute,
    testDesign,
    implementProblem
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
