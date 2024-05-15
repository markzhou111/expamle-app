<template>
  <div class="tab-nav">
    <el-tabs type="border-card">
      <el-tab-pane label="loginLog"><LoginLog /></el-tab-pane>
      <el-tab-pane label="userLog"><UserLog /></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import LoginLog from './LoginLog.vue'
import UserLog from './UserLog.vue'
export default {
  name: 'TabNav',
  components: {
    LoginLog,
    UserLog
  }
}
</script>
<style lang="scss" scoped>
.tab-nav {
  .el-tabs__content {
    background-color: #999;
  }
}

</style>