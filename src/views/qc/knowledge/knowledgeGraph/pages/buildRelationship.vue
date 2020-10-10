<template>
  <div class="app-container">
    <el-form
      ref="relationshipForm"
      :model="relationship"
      :rules="relationshipRules"
    >
      <el-form-item
        label="源节点"
        prop="source"
        label-width="80px"
      >
        <el-select
          v-model="relationship.source"
          style="width:90%"
          size="small"
          placeholder="选择节点"
          clearable
        >
          <el-option
            v-for="item in nodeOptions"
            :key="item.value"
            :label="item.label"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="目标节点"
        prop="target"
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
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="关系"
        prop="shipType"
        label-width="80px"
      >
        <el-select
          v-model="relationship.shipType"
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
      <el-row v-for="(item,index) in relationshipAttributes" :key="index" :gutter="10">
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
        <el-button size="small" type="primary" @click="handleCommitRelationShip">创建</el-button>
        <el-button size="small" @click="closeRelationShipDrawer">取消</el-button>
        <el-button type="primary" size="small" @click="addRelationShipAttributes">添加关系属性</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'BuildRelationship',
  data() {
    return {
      relationshipAttributesIndex: 1,
      relationship: {
        source: null, // 开始节点
        target: null, // 结束节点
        shipType: ''

      },
      relationshipAttributes: [// 关系属性
        { key: '名称', value: '' }
      ],
      nodeOptions: [
        {
          label: '南京师范大学',
          value: 'school'
        },
        {
          label: '南京航空航天大学',
          value: 'class'
        },
        {
          label: '张三',
          value: 'teacher'
        },
        {
          label: '李四',
          value: 'student'
        }],
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
        source: [{ required: true, message: '请选择节点', trigger: 'change' }],
        target: [{ required: true, message: '请选择节点', trigger: 'change' }],
        shipType: [{ required: true, message: '请选择关系类型', trigger: 'change' }]
      }
    }
  },
  methods: {
    initForm() {
      this.relationship = {
        source: null, // 开始节点
        target: null, // 结束节点
        shipType: ''

      }
      this.relationshipAttributes = [// 关系属性
        { key: '名称', value: '' }
      ]
      this.$refs.relationshipForm.resetFields()
    },
    checkHas(itemKey) {
      const keyArray = []// 值数
      keyArray.push(itemKey) // 将要判断的值放入数组
      this.relationshipAttributes.forEach((item) => {
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

    handleCommitRelationShip() {
      // 添加关系
      console.log(this.relationship)
      this.$refs.relationshipForm.validate((valida) => {
        if (valida) {
          console.log('关系提交了')
          this.$emit('closeDrawer', 'drawerRelationship')
        }
      })
    },
    closeRelationShipDrawer() {
      // 关闭关系抽屉
      this.$confirm('确认关闭？')
        .then(_ => {
          this.$emit('closeDrawer', 'drawerRelationship')
        })
        .catch(_ => {})
    },
    addRelationShipAttributes() {
      this.relationshipAttributes.push(
        {
          key: '属性' + this.relationshipAttributesIndex,
          value: '属性值' + this.relationshipAttributesIndex
        }
      )
      this.relationshipAttributesIndex++
    }
  }
}
</script>

<style>

</style>
