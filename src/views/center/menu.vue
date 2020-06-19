<template>
  <el-menu :default-active="activeIndex" @select="handleSelect">
    <el-menu-item index="/center/dashboard">
    <template slot="title">
      <i class="el-icon-data-board"></i>
      <span slot="title">Dashboard</span>
    </template></el-menu-item>
    <el-menu-item index="/center/device">
    <template slot="title">
      <i class="el-icon-setting"></i>
      <span slot="title">Device</span>
    </template></el-menu-item>
    <el-menu-item index="/center/settings">
    <template slot="title">
      <i class="el-icon-setting"></i>
      <span slot="title">Settings</span>
    </template></el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      activeIndex:'/center/dashboard'
    };
  },
  methods: {
    handleSelect(index) {
      this.$router.push({
          path: index
      }).catch(()=>{})
    }
  }
};
</script>

<style>
</style>