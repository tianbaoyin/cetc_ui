<template>
  <div>
    <el-form
      ref="form"
      :rules="rules"
      :model="projectExcute"
      label-width="120px"
      style="margin-right:10px"
    >
      <el-form-item
        prop="name"
        label="摘要"
      >
        <el-input
          v-model="projectExcute.name"
          type="textarea"
          :rows="5"
          maxlength="255"
          show-word-limit
          placeholder="测试执行摘要"
        />
      </el-form-item>
      <el-form-item
        prop="useTime"
        label="测试执行时间"
      >
        <el-input v-model="projectExcute.useTime" placeholder="测试所用时间">
          <template slot="append">小时</template>
        </el-input>
      </el-form-item>
      <el-form-item
        prop="excuteLocal"
        label="测试执行地点"
      >
        <el-input v-model="projectExcute.excuteLocal" maxlength="126" placeholder="测试执行地点" />
      </el-form-item>
      <el-form-item

        label="测试执行人数"
      >
        <el-input-number
          v-model="projectExcute.excuters"
          :min="1"
          :max="10000"
          label="测试执行人数"
          style="width:100%"
        />
      </el-form-item>
      <el-form-item
        label="测试执行数量"
      >
        <el-input-number
          v-model="projectExcute.examples"
          style="width:100%"
          :min="1"
          :max="100000"
          label="测试执行数量"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="toSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { addProjectExcute, updateProjectExcute } from '@/api/project/projectExcute.js'
export default {
  name: 'TestExecuteAdd',
  props: {
    projectexcute: {
      type: Object,
      required: true
    },
    pagecount: {
      type: Number,
      required: true,
      default: 0
    },
    monthCommitForm: {
      type: Object,
      required: true
    }
  },
  data() {
    const valdateUseTime = (rule, value, callback) => {
      if (Number(value)) {
        callback()
      } else {
        callback(new Error('请输入数字'))
      }
    }
    return {
      projectExcute: {
        monthCommitId: this.monthCommitForm.id
      },
      rules: {
        name: [{ required: true, message: '测试执行摘要不能为空', trigger: 'blur' }],
        useTime: [{ validator: valdateUseTime, trigger: 'blur' }],
        excuteLocal: [{ required: true, message: '测试执行地点不能为空', trigger: 'blur' }]
      }

    }
  },
  watch: {
    pagecount() {
      this.initPage()
    }
  },
  created() {
    this.initPage()
  },
  methods: {
    initPage() {
      this.projectExcute = this.projectexcute
      if (this.$refs.form) {
        this.$refs.form.resetFields()
      }
    },
    toSubmit() {
      this.$confirm('确认提交, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.submitForm()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消提交'
        })
      })
    },
    submitForm() {
      this.$refs.form.validate((valida) => {
        if (valida) {
          if (this.projectExcute.id) {
            // 更新
            updateProjectExcute(this.projectExcute).then(res => {
              this.$message.success('提交成功')
              this.$emit('closeDrawer')
            }).catch(() => {
              this.$message.error('提交失败')
            })
          } else {
            this.projectExcute.monthCommitId = this.monthCommitForm.id
            addProjectExcute(this.projectExcute).then(res => {
              this.$message.success('提交成功')
              this.$emit('closeDrawer')
            }).catch(() => {
              this.$message.error('提交失败')
            })
          }
        }
      })
    }
  }
}
</script>
