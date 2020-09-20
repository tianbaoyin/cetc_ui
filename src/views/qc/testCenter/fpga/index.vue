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
    />
    <pagination v-show="total>0" :total="total" :page.sync="pageEntity.pageNum" :limit.sync="pageEntity.pageSize" @pagination="pageList()" />
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

      loading: false,
      kingdomList: [],
      tableData: [
        {
          name: '',
          param1: '',
          param2: '',
          param3: ''
        }
      ],
      total: 0,
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

    },
    getKingdom() {
      findAllKingdom().then(res => {
        this.kingdomList = res.data
      }).catch(() => {
        this.$message.error()
      })
    }
  }
}
</script>

<style>

</style>
