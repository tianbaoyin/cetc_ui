<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="pageEntity.title"
        style="width: 250px;"
        class="filter-item"
        size="small"
        placeholder="请输入项目名称(精确查找)"
        clearable
      />
      <el-button
        type="primary"
        size="small"
        icon="el-icon-search"
        class="filter-item"
        @click="search()"
      >
        搜索
      </el-button>

      <el-button
        type="primary"
        size="small"
        icon="el-icon-search"
        class="filter-item"
        @click="getHistory()"
      >
        历史审批
      </el-button>
    </div>
    <el-table
      v-loading="tableLoading"
      :data="tableData"
      style="width: 100%"
      border
      highlight-current-row
    >
      <el-table-column
        type="index"
        label="序号"
        width="100"
      />
      <el-table-column
        prop="applyTitle"
        label="待审批项目"
        width="180"
      >
        <template slot-scope="scope">
          <el-tag @click="searchProject(scope.row)"> {{ scope.row.applyTitle }}</el-tag>
        </template>

      </el-table-column>
      <el-table-column
        label="业务名称"
        width="180"
      >项目审批
      </el-table-column>
      <el-table-column
        prop="taskName"
        label="节点任务"
      />
      <el-table-column
        prop="owner"
        label="项目申请人"
      >
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            width="300"
            trigger="click"
          >
            <el-form
              v-loading="userLoading"
              label-width="80px"
            >
              <el-form-item label="用户名">
                {{ user.username }}
              </el-form-item>
              <el-form-item label="姓名">
                {{ user.fullname }}
              </el-form-item>
              <el-form-item label="性别">
                <span v-if="user.sex">男</span>
                <span v-else>女</span>
              </el-form-item>
              <el-form-item v-if="user.createTime" label="创建日期">
                {{ user.createTime | parseTime('{y}-{m}-{d}') }}
              </el-form-item>
            </el-form>
            <el-tag slot="reference" @click="getUser(scope.row.owner)"> {{ scope.row.owner }}</el-tag>
          </el-popover>
        </template>

      </el-table-column>
      <el-table-column
        label="流程发起时间"
      >
        <template slot-scope="scope">
          {{ scope.row.processStartTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="流程到达时间"
      >
        <template slot-scope="scope">
          {{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="320"
        fixed="right"
      >
        <template slot-scope="{row}">
          <el-button
            v-preventReClick
            type="primary"
            size="small"
            icon="el-icon-edit"
            waves
            @click="searchProject(row)"
          >
            项目详情
          </el-button>

          <el-button
            v-preventReClick
            type="primary"
            size="small"
            icon="el-icon-edit"
            waves
            @click="searchApply(row)"
          >
            进行审批
          </el-button>

        </template></el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="pageEntity.pageNum" :limit.sync="pageEntity.pageSize" @pagination="handleFilter()" />

    <el-dialog v-dialogDrag title="项目详情" :visible.sync="projectFormVisible" :close-on-click-modal="false">
      <el-form :model="project">
        <el-row :gutter="20">
          <el-col :span="12">    <el-form-item label="领域" :label-width="formLabelWidth">
            <el-input v-model="project.kingdom" disabled autocomplete="off" />
          </el-form-item></el-col>
          <el-col :span="12">
            <el-form-item label="令号" :label-width="formLabelWidth">
              <el-input v-model="project.code" disabled autocomplete="off" />
            </el-form-item></el-col>
        </el-row>

        <el-row :gutter="20">

          <el-col :span="12"><el-form-item label="项目名称" :label-width="formLabelWidth">
            <el-input v-model="project.name" disabled autocomplete="off" />
          </el-form-item></el-col>
          <el-col :span="12">   <el-form-item label="项目序号" :label-width="formLabelWidth">
            <el-input v-model="project.num" disabled autocomplete="off" />
          </el-form-item></el-col>
        </el-row>

        <el-row :gutter="20">

          <el-col :span="12"><el-form-item label="测试级别" :label-width="formLabelWidth">
            <el-input v-model="project.testGrade" disabled autocomplete="off" />
          </el-form-item></el-col>
          <el-col :span="12">
            <el-form-item
              label="测试负责人"
              :label-width="formLabelWidth"
            >
              <el-select v-model="project.testLeader" el-select filterable placeholder="请选择" disabled style="width:100%">
                <el-option
                  v-for="item in userList"
                  :key="item.id"
                  :label="item.fullname"
                  :value="item.username"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item
          prop="testType"
          label="测试类型"
          :label-width="formLabelWidth"
        >
          <el-checkbox-group v-model="selected ">
            <el-checkbox v-for="testType in testTypeList" :key="testType.id" :label="testType.id">{{ testType.key }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input
            v-model="project.remark"
            type="textarea"
            autocomplete="off"
            rows="4"
            maxlength="254"
            show-word-limit
            placeholder="无"
            disabled
          />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="projectFormVisible=false">关闭</el-button>
      </div>
    </el-dialog>

    <el-dialog
      v-dialogDrag
      title="项目审批单"
      :visible.sync="checkDialogVisible"
      :close-on-click-modal="false"
    >
      <el-form ref="checkForm" :rules="rules" :model="check">
        <el-form-item v-if="check.flag" prop="almDomain" label="alm域" :label-width="formLabelWidth">
          <el-select
            v-model="check.almDomain"

            placeholder="您可以从ALM中选择对应的域名"
            style="width:100%"
            @change="findAlmProjects()"
          >
            <el-option
              v-for="item in almDomainList"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          v-if="check.flag"
          prop="almProject"
          label="alm项目"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="check.almProject"
            placeholder="您可以从ALM中选择对应的项目"
            style="width:100%"
          >
            <el-option
              v-for="item in almProjectList"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="待审批项目" :label-width="formLabelWidth">
          <el-input v-model="check.projectName" disabled placeholder="请输入内容" />

        </el-form-item>

        <el-form-item label="是否同意" prop="flag" :label-width="formLabelWidth">
          <el-radio-group v-model="check.flag">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="审批备注" :label-width="formLabelWidth">
          <el-input
            v-model="check.comments"
            type="textarea"
            autocomplete="off"
            rows="4"
            maxlength="254"
            show-word-limit
            placeholder="您可以在此针对您的工作填写一些备注信息"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-preventReClick :loading="saveCheckButton" type="primary" @click="handleAgree()">确 定</el-button>
      </div>
    </el-dialog>
    <el-drawer
      size="70%"
      :visible.sync="drawer"
      :before-close="handleClose"
    >
      <span slot="title" style="color:#696969;font-size:20px"><svg-icon icon-class="leida" />    历史审批</span>
      <history />
    </el-drawer>
  </div>
</template>

<script>

import { findTasksByAssign } from '@/api/activiti/myprocess'
import { handleCheck } from '@/api/activiti/mycheck'
import { getByUsername } from '@/api/user.js'
import { findProjectById } from '@/api/project/project'
import { findAllUser } from '@/api/user.js'
import { queryDicValuesByDicType } from '@/api/dicValue.js'
import { getTestType } from '@/api/project/project.js'
import history from '@/views/qc/project/almmanage/projectcheck/components/history.vue'
import waves from '@/directive/waves'
import pagination from '@/components/Pagination'

export default {
  directives: { waves },
  components: {
    pagination,
    history
  },
  data() {
    return {
      tableLoading: false,
      formLabelWidth: '120px',
      total: 0,
      userLoading: false,
      user: {},
      userList: [],
      checkDialogVisible: false,
      pageEntity: {
        pageNum: 1,
        pageSize: 10,
        title: null
      },
      check: {
        id: null,
        flag: true,
        projectName: null,
        almDomain: null,
        almProject: null,
        bussinesskey: null,
        comments: null

      },
      saveCheckButton: false,
      processProjectKey: 'cetc_project_apply',
      tableData: [],
      project: {},
      projectFormVisible: false,
      selected: [],
      testTypeList: [],
      almDomainList: [],
      almProjectList: [],
      drawer: false,

      rules: {
        flag: [
          { required: true, message: '请选择审批结果', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.handleFilter()
    this.getUserList()
    // 查询类型
    queryDicValuesByDicType('testType').then(res => {
      this.testTypeList = res.data
    }).catch(() => {
      console.warn('测试类型查询失败')
    })
  },
  methods: {
    getUserList() {
      findAllUser().then(res => {
        this.userList = res.data
      }).catch()
    },
    searchApply(row) {
      if (this.$refs['checkForm']) {
        this.$refs['checkForm'].resetFields()
      }
      this.checkDialogVisible = true
      this.check.id = row.id
      this.check.projectName = row.applyTitle
      this.check.flag = null
      this.check.comments = null
    },
    handleFilter() {
      this.tableLoading = true
      findTasksByAssign(this.processProjectKey, this.pageEntity).then(response => {
        this.total = response.data.total
        this.tableData = response.data.list
        this.tableLoading = false
      }).catch(() => {

      })
    },
    getUser(name) {
      this.userLoading = true
      getByUsername(name).then(res => {
        if (res.data) {
          this.user = res.data
        } else {
          this.$message.warning('该用户不存')
        }
        this.userLoading = false
      }).catch(() => {
        this.$message.error('用户获取失败')
        this.userLoading = false
      })
    },
    search() {
      this.pageEntity.pageSize = 1
      this.pageEntity.pageSize = 10
      this.handleFilter()
    },
    getHistory() {
      this.drawer = true
    },
    searchProject(row) {
      findProjectById(Number(row.buisnessKey)).then(response => {
        this.project = response.data
        this.getProjectTestType()
      }).catch(() => {

      })
    },

    getProjectTestType() {
      getTestType(this.project.id).then(res => {
        this.selected = res.data
        this.projectFormVisible = true
      }).catch(() => {
        this.$message.error('查询测试类型失败！')
      })
    },
    handleAgree() {
      this.$refs['checkForm'].validate((valid) => {
        if (valid) {
          handleCheck(this.check.id, this.check).then(response => {
            this.$message.success('审批完成')
            this.checkDialogVisible = false
            this.handleFilter()
          }).catch(() => {
            this.$message.error('审批失败！')
          })
        }
      })
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
