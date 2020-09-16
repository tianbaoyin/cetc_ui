<template>
  <div>
    <el-tabs v-model="projectTabs">
      <el-tab-pane name="projectInfo" label="项目信息">
        <projectinfo :node="node" />
      </el-tab-pane>
      <el-tab-pane name="testExecute" label="测试执行">
        <testexecute :node="node" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import projectinfo from '@/views/qc/project/project/treenode/nodethird/projectInfo/projectinfo.vue'
import testexecute from '@/views/qc/project/project/treenode/nodethird/projectInfo/testExecute.vue'
import checkPermission from '@/utils/permission' // 权限判断函数
export default {
  name: 'ProjectInfo',
  components: {
    projectinfo,
    testexecute
  },

  props: {
    node: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      projectTabs: 'projectInfo'
    }
  },
  methods: {
    checkPermission
  }

}
</script>

