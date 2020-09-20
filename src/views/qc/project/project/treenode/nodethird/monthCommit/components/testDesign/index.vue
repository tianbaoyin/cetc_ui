<template>
  <div style="width:600px">
    <el-card class="box-card">
      <el-form
        :model="design"
        label-width="120px"
      >
        <el-form-item label="名称">
          <el-input v-model="design.name" /></el-form-item>
        <el-form-item label="测试需求数">
          <el-input-number v-model="design.requestCount" style="width:100%" :min="1" :max="1000" />
        </el-form-item>
        <el-form-item label="测试用例设计数">
          <el-input-number v-model="design.designCount" style="width:100%" :min="1" :max="1000" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary">确定</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- <el-button type="primary" size="small" icon="el-icon-plus" @click="handleAdd()">新增</el-button>
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
          label="名称"
          prop="name"
        />
        <el-table-column
          label="测试需求数"
          prop="designCount"
        />
        <el-table-column
          label="测试用例设计数"
          prop="requestCount"
        />

        <el-table-column
          width="200px"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleUpdate(scope.row)">编辑 </el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row)">删除 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <pagination v-show="total>0" :total="total" :page.sync="searchEntity.pageNum" :limit.sync="searchEntity.pageSize" @pagination="pageList()" />
    <el-dialog
      title="新增"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      :append-to-body="true"
      width="600px"
    >

      <el-form
        :model="design"
        label-width="120px"
      >
        <el-form-item label="名称">
          <el-input v-model="design.name" /></el-form-item>
        <el-form-item label="测试需求数">
          <el-input v-model="design.requestCount" /></el-form-item>
        <el-form-item label="测试用例设计数">
          <el-input v-model="design.designCount" /></el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog> -->
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
      dataList: [
        {
          name: 'a',
          requestCount: 10,
          designCount: 10
        },
        {
          name: 'b',
          requestCount: 10,
          designCount: 10
        }
      ]
    }
  },
  methods: {
    handleAdd() {
      this.design = {
        name: '',
        requestCount: 1,
        designCount: 1
      }
      this.dialogVisible = true
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
