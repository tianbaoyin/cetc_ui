<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        style="width: 200px;"
        class="filter-item"
        size="small"
        placeholder=""
        clearable
      />
      <el-button
        type="primary"
        size="small"
        icon="el-icon-search"
        class="filter-item"
      >
        搜索
      </el-button>
      <el-button
        type="primary"
        size="small"
        icon="el-icon-plus"
        class="filter-item"
        @click="handleAddNode"
      >
        添加节点
      </el-button>
      <el-button
        type="primary"
        size="small"
        icon="el-icon-plus"
        class="filter-item"
        @click="handleAddRelationship"
      >
        添加关系
      </el-button>
      <el-button
        type="primary"
        size="small"
        icon="el-icon-paperclip"
        class="filter-item"
        @click="handleImportSVG"
      >
        SVG导入
      </el-button>
      <el-button
        type="primary"
        size="small"
        icon="el-icon-paperclip"
        class="filter-item"
        @click="handleImportSVG"
      >
        模拟节点右键
      </el-button>
    </div>
    <!-- 添加节点抽屉 -->
    <el-drawer
      :visible.sync="drawerNode"
      :before-close="handleCloseNode"
      size="500px"
    >
      <span slot="title" style="color:#696969;font-size:20px"><svg-icon icon-class="template" />创建节点</span>
      <el-divider />
      <addNode ref="addNodeInDrawer" @closeDrawer="closeDrawer" />
    </el-drawer>
    <!-- 添加关系抽屉 -->
    <el-drawer
      :visible.sync="drawerRelationship"
      :before-close="handleCloseRelationship"
    >
      <span slot="title" style="color:#696969;font-size:20px"><svg-icon icon-class="myapply" />建立关系</span>
      <buildRelationship ref="buildRelationshipInDrawer" @closeDrawer="closeDrawer" />
    </el-drawer>
    <!-- 导入SVG模态框 -->
    <el-dialog
      title="SVG 导入"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleCloseSVG"
    >
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList"
      >
        <el-button size="small" type="primary">点击上传SVG文件</el-button>
        <div slot="tip" class="el-upload__tip">只能上传svg文件，且不超过500kb</div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="handleCloseSVG">确 定</el-button>
      </span>
    </el-dialog>
    <graph />
  </div>
</template>

<script>
import graph from '@/views/qc/knowledge/knowledgeGraph/pages/graph.vue'
import addNode from '@/views/qc/knowledge/knowledgeGraph/pages/addNode.vue'
import buildRelationship from '@/views/qc/knowledge/knowledgeGraph/pages/buildRelationship.vue'
export default {
  components: {
    graph,
    addNode,
    buildRelationship
  },
  data() {
    return {

      // --------------------节点的-----------------------
      drawerNode: false,
      // -------------------关系-------------------------------------
      drawerRelationship: false,
      // -------------------svg-------------------------------------
      dialogVisible: false,
      fileList: []
    }
  },
  methods: {
    // ---------------------公共------------------------
    closeDrawer(drawer) {
      // 此方法供子组件调用，只负责关闭抽屉，调用前应先清空form
      if (drawer === 'drawerNode') {
        this.drawerNode = false
      }
      if (drawer === 'drawerRelationship') {
        this.drawerRelationship = false
      }
    },
    // ---------------------添加节点-----------------------------------
    handleAddNode() {
      this.drawerNode = true
      if (this.$refs.addNodeInDrawer) {
        this.$refs.addNodeInDrawer.initForm() // 让组件表单初始化
      }
    },
    handleCloseNode(done) {
      // 调用子组件的方法关闭抽屉，这样可以初始化表单
      this.$refs.addNodeInDrawer.closeNodeDrawer()
    },

    // ---------------------添加关系-----------------------------------
    handleAddRelationship() {
      this.drawerRelationship = true
      if (this.$refs.buildRelationshipInDrawer) {
        this.$refs.buildRelationshipInDrawer.initForm() // 让组件表单初始化
      }
    },
    handleCloseRelationship(done) {
      // 调用子组件的方法关闭抽屉，这样可以初始化表单
      this.$refs.buildRelationshipInDrawer.closeRelationShipDrawer()
    },
    // ---------------------SVG-----------------------------------
    handleImportSVG() {
      this.dialogVisible = true
    },
    handleCloseSVG(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // ---------------文件上传--------------------
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  }
}

</script>
<style lang="scss">
.el-drawer__body {
    overflow: auto;
    /* overflow-x: auto; */
}
</style>
