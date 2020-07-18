<template>
  <el-card
    @click.native="handleClick(data)"
    shadow="hover"
    class="td-monitor-item"
    :body-style="{ padding: '0px' }"
  >
    <el-image class="cover-image" :src="data.cover" fit="fill"></el-image>
    <span>{{ data.name }}</span>
  </el-card>
</template>

<script>
export default {
  props: ['data'],
  methods: {
    handleClick(v) {
      this.$router.push({
        path: '/yolo/' + v.id,
      })
    },
  },
}
</script>

<style lang="less">
.td-monitor-item {
  display: inline-block;
  position: relative;
  height: 200px;
  width: 300px;
  margin-right: 20px;
  cursor: pointer;
  .cover-image {
    height: 170px;
    width: 100%;
  }
  span {
    // position: absolute;
    // bottom: 0px;
    font-size: 13px;
    padding: 0px 0px 7px 10px;
    color: #666;
  }
}
</style>
