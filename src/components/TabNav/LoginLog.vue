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
        prop="username"
        label="username"
        width="180" />
      <el-table-column
        prop="result"
        label="result"
        width="180" />
      <el-table-column
        prop="commit"
        label="commit" />
      <el-table-column
        prop="createDate"
        label="createDate"
        width="180" />
    </el-table>
    <div class="pagination">
      <el-button type="warning" @click="handlePullLast">开启定时拉新</el-button>
      <el-button type="primary" @click="handleMore">加载更多</el-button>
    </div>
  </div>
</template>
<script>
import request from '@/utils/request'

function httpRequest(data) {
  return  request({
    url: '/temp/loginLog',
    method: 'post',
    data
  })
}

export default {
  name: 'LoginLog',
  data() {
    return {
      page: 1,
      limit: 10,
      isPullLast: false,
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
    },
    handlePullLast() {
      this.isPullLast = true
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