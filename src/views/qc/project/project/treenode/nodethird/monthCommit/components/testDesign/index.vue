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

  </div>
</template>

<script>
export default {
  components: {

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
