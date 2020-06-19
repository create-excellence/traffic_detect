<template>
  <div>
    <MonitorItem :key="item.id" v-for="item in monitorData" :data="item"/>
  </div>
</template>

<script>
import MonitorItem from '../../components/MonitorItem'
export default {
  components:{
    MonitorItem
  },
  data(){
    return{
      monitorData:[
        {
          id:1,
          name:'大学生活动中心路口#1',
          status:0
        },
        {
          id:2,
          name:'大学生活动中心路口#2',
          status:1
        }
      ]
    }
  }
}
</script>

<style>

</style>