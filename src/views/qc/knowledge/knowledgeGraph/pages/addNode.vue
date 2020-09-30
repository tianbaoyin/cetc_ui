<template>
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
</template>

<script>
export default {
  name: 'AddNode',
  data() {
    return {
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
      // 模拟数据
      nodeOptions: []
    }
  },
  created() {
    this.getNodes()
  },
  methods: {
    getNodes() { // 获取节点类型
      const nodeTypes = [
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
        }
      ]
      this.nodeOptions = nodeTypes
    },
    // 初始化form
    initForm() {
      this.node = {
        nodeType: '',
        attributes: [
          { key: '名称', value: '' }
        ]
      }
      this.$refs.nodeForm.resetFields()
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
      if (count > 2) {
        this.$alert('"' + itemKey + '"已经存在,请使用其他属性', '提示', {
          confirmButtonText: '我去修改',
          callback: action => {
            // 空方法
          }
        })
      }
    },
    closeNodeDrawer() {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.$emit('closeDrawer', 'drawerNode') // $emit('function',param...)
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
          // 提交成功后关闭抽屉
          this.$emit('closeDrawer', 'drawerNode')
        }
      })
    }

  }
}
</script>

<style>

</style>
