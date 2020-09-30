<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="节点" name="first">
        <node />
      </el-tab-pane>
      <el-tab-pane label="关系" name="second">
        <relationship /></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import node from '@/views/qc/knowledge/nodeAndLink/pages/node.vue'
import relationship from '@/views/qc/knowledge/nodeAndLink/pages/relationship.vue'
export default {
  name: 'KnowledgeList',
  components: {
    node,
    relationship
  },
  data() {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick(tab, event) {

    }
  }

}
</script>

<style>

</style>
