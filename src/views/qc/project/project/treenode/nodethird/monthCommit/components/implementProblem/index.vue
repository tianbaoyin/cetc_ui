<template>
  <div>
    <el-button type="primary" size="small" icon="el-icon-plus" @click="handleSynchronization()">同步</el-button>
    <div style="margin-top:10px">
      <el-table
        :data="dataList"
        border
        stripe
      >
        <el-table-column
          align="center"
          type="index"
          label="序号"
          width="80"
        />
        <el-table-column
          label="测试问题数据"
          prop="testType"
        />
        <el-table-column
          label="软件测试问题总数"
          prop="countOfSoftTest"
        />
        <el-table-column
          label="设计问题数"
          prop="coutOfDesign"
        />
        <el-table-column
          label="程序问题"
          prop="countOfProgram"
        />
        <el-table-column
          label="文档问题"
          prop="countOfDocument"
        />

        <el-table-column
          width="200px"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleUpdate(scope.row)">详情 </el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row)">删除 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <pagination v-show="total>0" :total="total" :page.sync="searchEntity.pageNum" :limit.sync="searchEntity.pageSize" @pagination="pageList()" />
    <el-dialog
      title="详情"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      :append-to-body="true"
      width="900px"
    >

      <el-form
        :model="implementProblem"
        label-width="130px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item>
              <label slot="label">测试问题数据</label>
              <el-input v-model="implementProblem.testProblemData" style="width:300px" placeholder="" :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <label slot="label">测试类型</label>
              <el-input v-model="implementProblem.testType" style="width:300px" placeholder="" :disabled="true" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item>
              <label slot="label"> 软件测试问题总数</label>
              <el-input v-model="implementProblem.countOfSoftTest" style="width:300px" placeholder="" :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <label slot="label">设计问题数</label>
              <el-input v-model="implementProblem.coutOfDesign" style="width:300px" placeholder="" :disabled="true" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item>
              <label slot="label">程序问题</label>
              <el-input v-model="implementProblem.countOfProgram" style="width:300px" placeholder="" :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <label slot="label">文档问题</label>
              <el-input v-model="implementProblem.countOfDocument" style="width:300px" placeholder="" :disabled="true" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item>
              <label slot="label">编码问题</label>
              <el-input v-model="implementProblem.countOfCode" style="width:300px" placeholder="" :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <label slot="label">其他问题</label>
              <el-input v-model="implementProblem.countOfOther" style="width:300px" placeholder="" :disabled="true" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item>
              <label slot="label">关键问题</label>
              <el-input v-model="implementProblem.countOfPivotal" style="width:300px" placeholder="" :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <label slot="label">重要问题</label>
              <el-input v-model="implementProblem.countOfImportant" style="width:300px" placeholder="" :disabled="true" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item>
              <label slot="label">一般问题</label>
              <el-input v-model="implementProblem.countOfGeneral" style="width:300px" placeholder="" :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <label slot="label">建议改进数</label>
              <el-input v-model="implementProblem.countOfSuggestionsForImprovement" style="width:300px" placeholder="" :disabled="true" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item>
              <label slot="label">代码规模</label>
              <el-input v-model="implementProblem.codeSize" style="width:300px" placeholder="" :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <label slot="label">软件开发人员</label>
              <el-input v-model="implementProblem.softwareDevelopers" style="width:300px" placeholder="" :disabled="true" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item>
              <label slot="label">责任部门</label>
              <el-input v-model="implementProblem.responsibleDepartment" style="width:300px" placeholder="" :disabled="true" />

            </el-form-item>
          </el-col>
          <el-col :span="12" />
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
      design: {
        name: '',
        requestCount: 1,
        designCount: 1
      },
      searchEntity: {
        pageNum: 1,
        pageSize: 10
      },
      implementProblem: {
        testProblemData: 'a', // 测试问题数据
        testType: '单元测试', // 测试类型
        countOfSoftTest: 12, // 软件测试问题总数
        coutOfDesign: 12, // 设计问题数
        countOfProgram: 12, // 程序问题
        countOfDocument: 12, // 文档问题
        countOfCode: 12, // 编码问题
        countOfOther: 12, // 其他问题
        countOfPivotal: 12, // 关键问题
        countOfImportant: 12, // 重要问题
        countOfGeneral: 12, // 一般问题
        countOfSuggestionsForImprovement: 12, // 建议改进数
        codeSize: 12, // 代码规模
        softwareDevelopers: 12, // 软件开发人员
        responsibleDepartment: '五部'// 责任部门
      },
      dataList: [
        {
          testProblemData: 'a', // 测试问题数据
          testType: '单元测试', // 测试类型
          countOfSoftTest: 12, // 软件测试问题总数
          coutOfDesign: 12, // 设计问题数
          countOfProgram: 12, // 程序问题
          countOfDocument: 12, // 文档问题
          countOfCode: 12, // 编码问题
          countOfOther: 12, // 其他问题
          countOfPivotal: 12, // 关键问题
          countOfImportant: 12, // 重要问题
          countOfGeneral: 12, // 一般问题
          countOfSuggestionsForImprovement: 12, // 建议改进数
          codeSize: 12, // 代码规模
          softwareDevelopers: 12, // 软件开发人员
          responsibleDepartment: '五部'// 责任部门
        },
        {
          testProblemData: 'a', // 测试问题数据
          testType: '单元测试', // 测试类型
          countOfSoftTest: 12, // 软件测试问题总数
          coutOfDesign: 12, // 设计问题数
          countOfProgram: 12, // 程序问题
          countOfDocument: 12, // 文档问题
          countOfCode: 12, // 编码问题
          countOfOther: 12, // 其他问题
          countOfPivotal: 12, // 关键问题
          countOfImportant: 12, // 重要问题
          countOfGeneral: 12, // 一般问题
          countOfSuggestionsForImprovement: 12, // 建议改进数
          codeSize: 12, // 代码规模
          softwareDevelopers: 12, // 软件开发人员
          responsibleDepartment: '五部'// 责任部门
        }
      ]
    }
  },
  methods: {
    handleSynchronization() {

    },
    pageList() {

    },
    handleUpdate(data) {
      this.design = {
        name: '',
        requestCount: 1,
        designCount: 1
      }
      this.dialogVisible = true
      this.design = data
    },
    handleDelete() {
      this.$confirm('确认要删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message.success('删除成功')
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    }
  }
}
</script>

<style>

</style>
