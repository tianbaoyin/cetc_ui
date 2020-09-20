<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select
        v-model="pageEntity.parentId"
        filterable
        clearable
        class="filter-item"
        size="small"
        placeholder="请选择领域（精确查找）"
        style="width:200px"
      >
        <el-option
          v-for="item in kingdomList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-input
        v-model="pageEntity.value"
        style="width: 200px;"
        class="filter-item"
        size="small"
        placeholder="请填写令号（精确查找）"
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
        icon="el-icon-plus"
        class="filter-item"
        @click="handleAdd()"
      >
        新增
      </el-button>
    </div>
    <el-table
      v-loading="loading"
      :data="tableData"
      stripe
      border
      highlight-current-row
    >
      <el-table-column
        type="index"
        label="序号"
        width="80"
      />
      <el-table-column
        prop="reportMonth"
        label="月份"
      />
      <el-table-column
        prop="code"
        label="产品令号"
      />
      <el-table-column
        prop="kingdom"
        label="项目领域"
      />
      <el-table-column
        prop="codeSize"
        label="代码审查规模"
      />
      <el-table-column
        prop="countOfViolationStander"
        label="违反规则数"
      />
      <el-table-column
        prop="countOfViolationProposal"
        label="违反建议数"
      />
      <el-table-column
        prop="softwareDevelopers"
        label="代码开发人员"
      />

      <el-table-column
        label="操作"
        width="220"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button

            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="handleUpdata(scope.row)"
          >
            编辑
          </el-button>

          <el-button

            icon="el-icon-delete"
            type="danger"
            size="small"
            @click="handleDelete(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="pageEntity.pageNum" :limit.sync="pageEntity.pageSize" @pagination="pageList()" />
    <!-- 新增或编辑抽屉 -->
    <el-drawer
      title="编辑"
      :visible.sync="drawer"
      :before-close="handleClose"
    >
      <span slot="title" style="color:#696969;font-size:20px"><svg-icon icon-class="leida" />    编辑</span>
      <div style="margin-right:10px">
        <el-form
          :model="entity"
          label-width="100px"
        >
          <el-form-item label="月份">
            <el-date-picker
              v-model="entity.reportMonth"
              type="date"
              style="width:100%"
              placeholder="选择日期"
            />
          </el-form-item>
          <el-form-item label="项目领域">
            <el-select v-model="entity.kingdom" filterable placeholder="请选择所属领域" style="width:100%">
              <el-option
                v-for="item in kingdomList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="产品令号">
            <el-input />
          </el-form-item>
          <el-form-item label="代码审查规模">
            <el-input-number
              v-model="entity.codeSize"
              style="width:100%"
              :min="1"
              :max="1000"
              label="代码审查规模"
            />
          </el-form-item>
          <el-form-item label="违反规则数">
            <el-input-number
              v-model="entity.countOfViolationStander"
              style="width:100%"
              :min="1"
              :max="1000"
              label="违反规则数"
            />
          </el-form-item>
          <el-form-item label="违反建议数">
            <el-input-number
              v-model="entity.countOfViolationProposal"
              style="width:100%"
              :min="1"
              :max="1000"
              label="违反建议数"
            />
          </el-form-item>
          <el-form-item label="代码开发人员">
            <el-input
              v-model="entity.softwareDevelopers"
              :rows="5"
              type="textarea"
              placeholder="代码开发人员"
              maxlength="255"
              show-word-limit
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary">提交</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { findAllKingdom } from '@/api/project/kingdom.js'
import pagination from '@/components/Pagination'
export default {
  components: {
    pagination

  },
  data() {
    return {
      drawer: false,
      loading: false,
      kingdomList: [],
      entity: {
        reportMonth: '', // 上报月份
        code: '', // 产品令号
        kingdom: '', // 所属领域
        codeSize: '', // 代码规模
        countOfViolationStander: '', // 违反规则数
        countOfViolationProposal: '', // 违反建议数
        softwareDevelopers: ''// 代码开发人员
      },
      tableData: [
        {
          reportMonth: '2020-2', // 上报月份
          code: 'abc', // 产品令号
          kingdom: '舰载', // 所属领域
          codeSize: '100', // 代码规模
          countOfViolationStander: 20, // 违反规则数
          countOfViolationProposal: 20, // 违反建议数
          softwareDevelopers: '赵万马'// 代码开发人员
        },
        {
          reportMonth: '2020-2', // 上报月份
          code: 'abc', // 产品令号
          kingdom: '舰载', // 所属领域
          codeSize: '100', // 代码规模
          countOfViolationStander: 20, // 违反规则数
          countOfViolationProposal: 20, // 违反建议数
          softwareDevelopers: '赵万马'// 代码开发人员
        }
      ],
      total: 2,
      pageEntity: {
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  created() {
    this.getKingdom()
  },
  methods: {
    search() {

    },
    handleAdd() {
      this.drawer = true
    },
    getKingdom() {
      findAllKingdom().then(res => {
        this.kingdomList = res.data
      }).catch(() => {
        this.$message.error()
      })
    },
    handleUpdata(data) {
      this.$message.info('功能开发中。。。')
    },
    handleDelete(data) {
      this.$confirm('确认删除？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message.success('删除成功')
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？').then(_ => {
        done()
      }).catch(_ => {})
    }
  }
}
</script>

<style>

</style>
