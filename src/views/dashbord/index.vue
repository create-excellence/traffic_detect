<template>
  <div>
    <MonitorItem :key="item.id" v-for="item in monitorData" :data="item" />
  </div>
</template>

<script>
import { queryCamera } from "../../api/devices";
import MonitorItem from "../../components/MonitorItem";
export default {
  components: {
    MonitorItem
  },
  mounted(){
    this.list()
  },
  data() {
    return {
      page: 1,
      limit: 10,
      monitorData: [
        {
          id: 1,
          name: "大学生活动中心路口#1",
          status: 0
        },
        {
          id: 2,
          name: "大学生活动中心路口#2",
          status: 1
        }
      ]
    };
  },
  methods: {
    list() {
      queryCamera({
        page: this.page,
        limit: this.limit
      }).then(res => {
        if (res.code === 0) {
          this.data = res.data.records;
          this.loading = false;
        }
      });
    }
  }
};
</script>

<style>
</style>