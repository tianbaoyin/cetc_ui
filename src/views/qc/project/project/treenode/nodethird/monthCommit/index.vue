<template>
  <div class="block">
    <div class="filter-container">
      <el-button
        type="primary"
        size="small"
        icon="el-icon-search"
        class="filter-item"
        @click="handleAddMonthCommit()"
      >
        新增
      </el-button>
      <el-drawer
        title="我是标题"
        :visible.sync="drawer"
        :before-close="handleClose"
        size="70%"
      >
        <span slot="title" style="color:#696969;font-size:20px"><svg-icon icon-class="leida" />    项目月度报表</span>
        <addMonthCommit />
      </el-drawer>

      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :icon="activity.icon"
          :type="activity.type"
          :color="activity.color"
          :size="activity.size"
          :timestamp="activity.timestamp"
          placement="top"
        >
          <el-card>
            <div slot="header" class="clearfix">
              <span>月度报表</span>
              <el-button style="float: right; padding: 3px 0" type="text"> 详情...</el-button>
            </div>
            <p>本月更新了11条测试用例</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>

    </div>

    <el-dialog v-dialogDrag title="项目月度报表" :close-on-click-modal="false" :visible.sync="dialogFormVisible">
      <el-form ref="ruleForm" :rules="rules" :model="monthCommitForm">
        <el-form-item label="上报人" :label-width="formLabelWidth" prop="creater">
          <el-select v-model="monthCommitForm.creater" filterable clearable style="width:300px" placeholder="请输入内容">
            <el-option
              v-for="item in users"
              :key="item.username"
              :label="item.fullname"
              :value="item.username"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="上报时间" :label-width="formLabelWidth" prop="date">
          <el-date-picker
            v-model="monthCommitForm.date"
            style="width:300px"
            type="month"
            placeholder="选择月"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { findUserListIsNotSys } from '@/api/user.js'
import addMonthCommit from '@/views/qc/project/project/treenode/nodethird/monthCommit/components/addMonthCommit.vue'
export default {
  components: {
    addMonthCommit

  },
  data() {
    return {
      activities: [{
        content: '支持使用图标',
        timestamp: '2018-04-12 20:46',
        size: 'large',
        type: 'primary',
        icon: 'el-icon-more'
      }, {
        content: '支持自定义颜色',
        timestamp: '2018-04-03 20:46',
        color: '#0bbd87'
      }, {
        content: '支持自定义尺寸',
        timestamp: '2018-04-03 20:46',
        size: 'large'
      }, {
        content: '默认样式的节点',
        timestamp: '2018-04-03 20:46'
      }],
      drawer: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      users: [],
      monthCommitForm: {
        creater: '',
        date: ''

      },
      rules: {
        creater: [
          { required: true, message: '请选择上报人', trigger: 'blur' }
        ],
        date: [
          { required: true, message: '请选择上报时间', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.findAllUsers()
  },
  methods: {

    findAllUsers() {
      findUserListIsNotSys().then(response => {
        this.users = response.data
      }).catch(() => {

      })
    },

    handleAddMonthCommit() {
      this.dialogFormVisible = true
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>
 <style >
:focus {
   outline: 0;
 }
</style>
