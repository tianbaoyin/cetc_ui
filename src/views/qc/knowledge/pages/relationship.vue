<template>
  <div>
    <div class="filter-container">
      <el-input
        style="width: 200px;"
        class="filter-item"
        size="small"
        placeholder=""
        clearable
      />
      <el-button
        type="primary"
        size="small"
        icon="el-icon-search"
        class="filter-item"
      >
        搜索
      </el-button>
      <el-button
        type="primary"
        size="small"
        icon="el-icon-plus"
        class="filter-item"
        @click="handleAdd"
      >
        添加
      </el-button>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="name"
        label="名称"
        width="180"
      />
      <el-table-column
        prop="label"
        label="标签"
        width="180"
      />
      <el-table-column
        prop="createDate"
        label="创建时间"
        width="180"
      />
      <el-table-column
        prop="remarks"
        label="备注"
      />
      <el-table-column
        label="操作"
        width="200"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button
            size="small"
            type="primary"
            icon="el-icon-share"
          >
            编辑
          </el-button>
          <el-button
            size="small"
            type="primary"
            icon="el-icon-delete"
          >
            删除
          </el-button>
        </template>

      </el-table-column></el-table>
    <pagination v-show="total>0" :total="total" :page.sync="pageEntity.pageNum" :limit.sync="pageEntity.pageSize" @pagination="pageList()" />
    <el-dialog
      title="关系"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        v-model="node"
        label-width="80px"
      >
        <el-form-item label="名称">
          <el-input v-model="node.name" />
        </el-form-item>
        <el-form-item label="标签">
          <el-input v-model="node.label" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="node.remarks"
            type="textarea"
            rows="3"
            placeholder="请输入内容"
            maxlength="30"
            show-word-limit
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          size="small"
          @click="dialogVisible = false"
        >
          取 消
        </el-button>
        <el-button
          type="primary"
          size="small"
          @click="dialogVisible = false"
        >
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import pagination from '@/components/Pagination'
export default {
  name: 'Relationship',
  components: {
    pagination
  },
  data() {
    return {
      dialogVisible: false,
      total: 4,
      pageEntity: {
        pageNum: 1,
        pageSize: 10
      },
      node: {
        name: '',
        lable: '',
        remarks: ''
      },
      tableData: [{
        createDate: '2016-05-02',
        name: '同学',
        label: 'classmate',
        remarks: ''
      }, {
        createDate: '2016-05-04',
        name: '老师',
        label: 'teacher',
        remarks: ''
      }, {
        createDate: '2016-05-01',
        name: '同事',
        label: 'colleague'
      }, {
        createDate: '2016-05-03',
        name: '学生',
        label: 'student',
        remarks: ''
      }]
    }
  },
  methods: {
    pageList() {

    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    handleAdd() {
      this.dialogVisible = true
    }
  }

}
</script>

<style>

</style>
