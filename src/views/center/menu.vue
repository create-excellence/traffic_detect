<template>
  <el-menu :default-active="activeIndex" @select="handleSelect">
    <el-menu-item index="/center/dashboard">
      <template slot="title">
        <i class="el-icon-data-board"></i>
        <span slot="title">Dashboard</span>
      </template></el-menu-item
    >
    <el-menu-item index="/center/devices">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span slot="title">Devices</span>
      </template></el-menu-item
    >
    <el-menu-item index="/center/user">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span slot="title">Users</span>
      </template></el-menu-item
    >
    <el-menu-item index="/center/snapshot">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span slot="title">Snapshot</span>
      </template></el-menu-item
    >
    <el-menu-item index="/center/analyze">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span slot="title">人流量分析</span>
      </template></el-menu-item
    >
    <el-menu-item index="/center/settings">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span slot="title">Settings</span>
      </template></el-menu-item
    >
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '/center/dashboard',
    }
  },
  methods: {
    handleSelect(index) {
      this.$router
        .push({
          path: index,
        })
        .catch(() => {})
    },
  },
}
</script>

<style></style>
