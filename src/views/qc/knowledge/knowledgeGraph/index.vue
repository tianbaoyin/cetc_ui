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
    </div>
    <!-- 添加节点 -->
    <el-drawer
      :visible.sync="drawerNode"
      :before-close="handleCloseNode"
    >
      <span slot="title" style="color:#696969;font-size:20px"><svg-icon icon-class="template" />创建节点</span>
      <el-divider />
      <div class="app-container">
        <el-form>
          <el-form-item
            label="节点"
          >
            <el-select placeholder="请选择">
              <el-option
                v-for="item in nodeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
    <!-- 添加关系 -->
    <el-drawer
      :visible.sync="drawerRelationship"
      :before-close="handleCloseRelationship"
    >
      <span slot="title" style="color:#696969;font-size:20px"><svg-icon icon-class="myapply" />建立关系</span>

    </el-drawer>
    <!-- 导入SVG -->
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      drawerRelationship: false,
      drawerNode: false,
      node: {
        type: '',
        attribute: {}
      },
      fileList: [],
      nodeOptions: [{
        label: '学校',
        value: 'school'
      }, {
        label: '班级',
        value: 'class'
      }, {
        label: '老师',
        value: 'teacher'
      }, {
        label: '学生',
        value: 'student'
      }]
    }
  },
  methods: {
    // ---------------------添加节点-----------------------------------
    handleAddNode() {
      this.drawerNode = true
    },
    handleCloseNode(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // ---------------------添加关系-----------------------------------
    handleAddRelationship() {
      this.drawerRelationship = true
    },
    handleCloseRelationship(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
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

<style>

</style>
