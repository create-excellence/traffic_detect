<template>
  <div class="td-center-container">
    <el-container style="height:100%;">
      <el-aside width="200px" class="td-aside">
        <div class="td-logo">
          Traffic
          <span>Detect</span>
        </div>
        <Menu />
      </el-aside>
      <el-container style="height:100%">
        <el-header style="padding:0px;height:auto;">
          <div>
            <Header />
            <BreadCrumb :data="breadCrumbData"/>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
        <!-- <el-footer>Footer</el-footer> -->
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "../../components/Header";
import BreadCrumb from "../../components/BreadCrumb";
import Menu from "./menu";
export default {
  name: "main",
  components: {
    Header,
    Menu,
    BreadCrumb
  },
  data(){
    return{
      breadCrumbData:[{
        id:1,
        path:'/center/dashboard',
        title:'Dashboard'
      }]
    }
  }
};
</script>

<style lang="less">
.td-center-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .td-logo {
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 16px;
    color: #666;
    span {
      color: rgb(4, 197, 116);
      font-size: 13px;
    }
  }
  .td-aside {
    background: #fff;
  }
}
</style>