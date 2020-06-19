<template>
  <el-breadcrumb class="td-header-breadcrumb" separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/center' }">Home</el-breadcrumb-item>
    <el-breadcrumb-item v-for="item in data" :key="item.title" :to="{path : item.path }">{{item.title}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  props:['data']
};
</script>

<style lang="less">
.td-header-breadcrumb{
  background: #fff;
  height: 40px;
  line-height: 40px;
  padding: 0px 20px 0px 20px;
}
</style>