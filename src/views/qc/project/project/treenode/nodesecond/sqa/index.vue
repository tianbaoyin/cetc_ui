<template>
  <div style="height:800px">
    <div class="filter-container">
      <el-input v-model="pageEntity.name" style="width: 210px;" class="filter-item" size="small" placeholder="请填写项目名称（模糊查找）" />
      <el-button
        type="primary"
        size="small"
        icon="el-icon-search"
        class="filter-item"
        @click="pageList()"
      >
        搜索
      </el-button>
      <el-button
        type="primary"
        size="small"
        icon="el-icon-plus"
        class="filter-item"
        @click="add()"
      >
        获取数据源
      </el-button>
    </div>
    <el-table
      :data="sqaList"
      border
      stripe
      style="width: 100%"
    >
      <el-table-column
        prop="checkMonth"
        label="检查月份"
        width="80"
      />
      <el-table-column
        prop="productCode"
        label="产品代号"
        width="100"
      />
      <el-table-column
        prop="kingdom"
        label="项目领域"
      />
      <el-table-column
        prop="sysFullName"
        label="系统配置项全称"
      />
      <el-table-column
        prop="responsibleDepartment"
        label="责任部门"
        width="100"
      />
      <el-table-column
        prop="nonConformityType"
        label="不符合项类别"
      />
      <el-table-column
        prop="numberOfProblems"
        label="问题个数"
        width="80"
      />
      <el-table-column
        prop="isReleasePlan"
        label="是否下达计划"
      />
      <el-table-column
        prop="taskDeterminationTime"
        label="任务确定时间"
      />
      <el-table-column
        prop="requiredCompletionTime"
        label="要求完成时间"
      />
      <el-table-column
        prop="isOwnReasons"
        label="是否自身原因"
      />
      <el-table-column
        prop="completionStatus"
        label="完成状况"
        width="80"
      />
      <el-table-column
        label="操作"
        width="100"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="showdetails(scope.row)"
          >
            详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="pageEntity.pageNum" :limit.sync="pageEntity.pageSize" @pagination="pageList()" />
    <el-drawer
      size="70%"
      :visible.sync="drawer"
      :before-close="handleClose"
    >
      <span slot="title" style="color:#696969;font-size:20px"><svg-icon icon-class="leida" />    SQA数据接入</span>
      <history />
    </el-drawer>
    <!-- 详情模态框 -->
    <el-dialog
      title="详情"
      :visible.sync="dialogVisible"
      width="900px"
      :close-on-click-modal="false"
    >
      <el-form
        ref="sqaForm"
        :model="sqa"

        label-width="200"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item>
              <label slot="label">SQA检查月份</label>
              <el-input v-model="sqa.checkMonth" style="width:300px;" placeholder="SQA检查月份" :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <label slot="label">产品代号&emsp;&emsp;&emsp;</label>
              <el-input v-model="sqa.productCode" style="width:300px" placeholder="产品代号" :disabled="true" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item>
              <label slot="label">项目领域&emsp;&emsp;</label>
              <el-input v-model="sqa.kingdom" style="width:300px" placeholder="项目领域" :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <label slot="label">系统配置项全称</label>
              <el-input v-model="sqa.sysFullName" style="width:300px" placeholder="系统配置项全称" :disabled="true" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item>
              <label slot="label">责任部门&emsp;&emsp;</label>
              <el-input v-model="sqa.responsibleDepartment" style="width:300px" placeholder="责任部门" :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <label slot="label">不符合项类别&emsp;</label>
              <el-input v-model="sqa.nonConformityType" style="width:300px" placeholder="不符合项类别" :disabled="true" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item>
              <label slot="label">问题个数&emsp;&emsp;</label>
              <el-input v-model="sqa.numberOfProblems" style="width:300px" placeholder="问题个数" :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <label slot="label">是否下达计划&emsp;</label>
              <el-input v-model="sqa.isReleasePlan" style="width:300px" placeholder="是否下达计划" :disabled="true" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item>
              <label slot="label">任务确定时间</label>
              <el-input v-model="sqa.taskDeterminationTime" style="width:300px" placeholder="任务确定时间" :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <label slot="label">要求完成时间&emsp;</label>
              <el-input v-model="sqa.requiredCompletionTime" style="width:300px" placeholder="要求完成时间" :disabled="true" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item>
              <label slot="label">是否自身原因</label>
              <el-input v-model="sqa.isOwnReasons" style="width:300px" placeholder="是否自身原因" :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <label slot="label">完成状况&emsp;&emsp;&emsp;</label>
              <el-input v-model="sqa.completionStatus" style="width:300px" placeholder="完成状况" :disabled="true" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          size="small"
          @click="dialogVisible = false"
        >
          关 闭
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import pagination from '@/components/Pagination'
export default {
  components: {
    pagination

  },
  data() {
    return {
      dialogVisible: false,
      total: 2,
      pageEntity: {
        pageNum: 1,
        pageSize: 10
      },
      sqa: {
        checkMonth: 2, // 检查月份
        productCode: 14762, // 产品代号
        kingdom: '机载反潜', // 项目领域
        sysFullName: '雷达私服控制软件', // 系统配置项全称
        responsibleDepartment: '五部', // 责任部门
        nonConformityType: '软件工作产品', // 不符合项类别
        numberOfProblems: 1, // 问题个数
        isReleasePlan: '是', // 是否下达计划
        taskDeterminationTime: '2020-2-26', // 任务确定时间
        requiredCompletionTime: '2020-3-30', // 要求完成时间
        isOwnReasons: '是', // 是否自身原因
        completionStatus: '完成'// 完成状况

      },
      sqaList: [
        {
          checkMonth: 2, // 检查月份
          productCode: 14762, // 产品代号
          kingdom: '机载反潜', // 项目领域
          sysFullName: '雷达私服控制软件', // 系统配置项全称
          responsibleDepartment: '五部', // 责任部门
          nonConformityType: '软件工作产品', // 不符合项类别
          numberOfProblems: 1, // 问题个数
          isReleasePlan: '是', // 是否下达计划
          taskDeterminationTime: '2020-2-26', // 任务确定时间
          requiredCompletionTime: '2020-3-30', // 要求完成时间
          isOwnReasons: '是', // 是否自身原因
          completionStatus: '完成'// 完成状况

        },
        {
          checkMonth: 3, // 检查月份
          productCode: 15722, // 产品代号
          kingdom: '星载', // 项目领域
          sysFullName: '雷达私服控制软件', // 系统配置项全称
          responsibleDepartment: '五部', // 责任部门
          nonConformityType: '软件工作产品', // 不符合项类别
          numberOfProblems: 22, // 问题个数
          isReleasePlan: '是', // 是否下达计划
          taskDeterminationTime: '2020-2-26', // 任务确定时间
          requiredCompletionTime: '2020-3-30', // 要求完成时间
          isOwnReasons: '否', // 是否自身原因
          completionStatus: '未完成'// 完成状况

        }

      ],
      drawer: false
    }
  },
  methods: {
    add() {
      this.drawer = true
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    pageList() {

    },
    showdetails(data) {
      console.log(data)
      this.dialogVisible = true
    }

  }
}
</script>
 <style >
:focus {
   outline: 0;
 }
</style>
