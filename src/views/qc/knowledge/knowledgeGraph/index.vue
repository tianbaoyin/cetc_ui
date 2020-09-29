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
      size="500px"
    >
      <span slot="title" style="color:#696969;font-size:20px"><svg-icon icon-class="template" />创建节点</span>
      <el-divider />
      <div class="app-container">
        <el-form
          ref="nodeForm"
          :model="node"
          :rules="Noderules"
        >
          <el-form-item
            label="节点"
            prop="nodeType"
          >
            <el-select
              v-model="node.nodeType"
              style="width:85%"
              size="small"
              placeholder="选择节点"
            >
              <el-option
                v-for="item in nodeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-row v-for="(item,index) in node.attributes" :key="index" :gutter="10">
            <el-col :span="8">
              <el-form-item>
                <el-input v-model="item.key" size="small" placeholder="属性名" @blur="checkHas(item.key)" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <el-input v-model="item.value" size="small" placeholder="属性值" />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item>
                <el-button size="small" type="danger" icon="el-icon-delete" @click="deleteAttributes(item)" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider />
          <el-form-item>
            <el-button size="small" type="primary" @click="handleCommitNode">创建</el-button>
            <el-button size="small" @click="closeNodeDrawer">取消</el-button>
            <el-button type="primary" size="small" @click="addAttributes">添加节点属性</el-button>
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
      <div class="app-container">
        <el-form
          ref="relationshipForm"
          :model="relationship"
          :rules="relationshipRules"
        >
          <el-form-item
            label="源节点"
            prop="nodeType"
            label-width="80px"
          >
            <el-select
              v-model="relationship.source"
              style="width:90%"
              size="small"
              placeholder="选择节点"
            >
              <el-option
                v-for="item in nodeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="目标节点"
            prop="nodeType"
            label-width="80px"
          >
            <el-select
              v-model="relationship.target"
              style="width:90%"
              size="small"
              placeholder="选择节点"
            >
              <el-option
                v-for="item in nodeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="关系"
            prop="nodeType"
            label-width="80px"
          >
            <el-select
              v-model="relationship.shipType.name"
              style="width:90%"
              size="small"
              placeholder="选择节点"
            >
              <el-option
                v-for="item in relationshipOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-divider content-position="left">关系属性</el-divider>
          <el-row v-for="(item,index) in node.attributes" :key="index" :gutter="10">
            <el-col :span="8">
              <el-form-item>
                <el-input v-model="item.key" size="small" placeholder="属性名" @blur="checkHas(item.key)" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <el-input v-model="item.value" size="small" placeholder="属性值" />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item>
                <el-button size="small" type="danger" icon="el-icon-delete" @click="deleteAttributes(item)" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider />
          <el-form-item>
            <el-button size="small" type="primary" @click="handleCommitNode">创建</el-button>
            <el-button size="small" @click="closeNodeDrawer">取消</el-button>
            <el-button type="primary" size="small" @click="addAttributes">添加关系属性</el-button>
          </el-form-item>
        </el-form>
      </div>
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
    <graph />
  </div>
</template>

<script>
import graph from '@/views/qc/knowledge/knowledgeGraph/graph.vue'
export default {
  components: {
    graph
  },
  data() {
    return {
      // --------------------节点的-----------------------
      dialogVisible: false,

      drawerNode: false,
      attributesIndex: 1,

      node: {
        nodeType: '',
        attributes: [
          { key: '名称', value: '' }
        ]
      },
      Noderules: {
        nodeType: [
          { required: true, message: '请选择节点类型', trigger: 'change' }
        ]
      },

      nodeOptions: [
        {
          label: '学校',
          value: 'school'
        },
        {
          label: '班级',
          value: 'class'
        },
        {
          label: '老师',
          value: 'teacher'
        },
        {
          label: '学生',
          value: 'student'
        }],
      // -------------------关系-------------------------------------
      drawerRelationship: false,
      relationship: {
        source: {}, // 开始节点
        target: {}, // 结束节点
        shipType: { // 关系
          name: '',
          attributes: [// 关系属性
            { key: '名称', value: '' }
          ]
        }

      },
      relationshipOptions: [
        {
          label: '同事',
          value: 'colleague'
        },
        {
          label: '同学',
          value: 'classmate'
        },
        {
          label: '老师',
          value: 'teacher'
        },
        {
          label: '学生',
          value: 'student'
        }],
      relationshipRules: {

      },
      // -------------------svg-------------------------------------
      fileList: []
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
          this.node = {
            nodeType: '',
            attributes: [
              { key: '名称', value: '' }
            ]
          }
          this.$refs.nodeForm.resetFields()
          done()
        })
        .catch(_ => {})
    },
    closeNodeDrawer() {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.node = {
            nodeType: '',
            attributes: [
              { key: '名称', value: '' }
            ]
          }
          this.$refs.nodeForm.resetFields()
          this.drawerNode = false
        })
        .catch(_ => {})
    },
    addAttributes() {
      this.node.attributes.push(
        {
          key: '属性' + this.attributesIndex,
          value: '属性值' + this.attributesIndex
        }
      )
      this.attributesIndex++
    },
    deleteAttributes(item) {
      const index = this.node.attributes.indexOf(item)
      this.node.attributes.splice(index, 1)
    },
    handleCommitNode() {
      this.$refs['nodeForm'].validate((valid) => {
        if (valid) {
          console.log(this.node)
          console.log('提交了')
          alert('提交了')
        }
      })
    },
    checkHas(itemKey) {
      const keyArray = []// 值数
      keyArray.push(itemKey) // 将要判断的值放入数组
      this.node.attributes.forEach((item) => {
        keyArray.push(item.key)
      })
      let count = 0
      keyArray.forEach((item) => {
        if (item === itemKey) {
          count++
        }
      })

      console.log(itemKey + '出现的次数', count)
      if (count > 2) {
        this.$alert('"' + itemKey + '"已经存在,请使用其他属性', '提示', {
          confirmButtonText: '我去修改',
          callback: action => {
          }
        })
      }
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
<style lang="scss">
.el-drawer__body {
    overflow: auto;
    /* overflow-x: auto; */
}
</style>
