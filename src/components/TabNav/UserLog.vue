<template>
  <div class="log-panel">
    <el-table
      :data="tableData"
      border
      height="600"
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="login"
        label="login"
        width="180" />
      <el-table-column
        prop="equityPrev"
        label="equityPrev"
        width="180" />
      <el-table-column
        prop="book"
        label="book" />
      <el-table-column
        prop="mt"
        label="mt" />
      <el-table-column
        prop="unused"
        label="unused" />
      <el-table-column
        prop="createDate"
        label="createDate" />
    </el-table>
    <div class="pagination">
      <el-button type="primary" @click="handleMore">加载更多</el-button>
    </div>
  </div>
</template>
<script>
import request from '@/utils/request'

function httpRequest(data) {
  return  request({
    url: '/temp/userLog',
    method: 'post',
    data
  })
}

export default {
  name: 'UserLog',
  data() {
    return {
      page: 1,
      limit: 10,
      tableData: []
    }
  },
  mounted () {
    this.getTableData()
  },
  methods: {
    getTableData() {
      httpRequest({
        pageNo: this.page,
        pageSize: this.limit
      }).then((res)=>{
        const result =  res.data
        if (result.code === 1) {
          if (result.data.length) {
            this.tableData = this.tableData.concat(result.data)
          } else {
            alert('没有更多了')
          }
        }
      })
    },
    handleMore() {
      this.page++
      this.getTableData()
    }
  },
}
</script>
<style lang="scss" scoped>
.log-panel {
  padding: 20px;
  .pagination {
    margin-top: 30px;
  }
}
</style>