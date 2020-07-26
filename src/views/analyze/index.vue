<template>
  <div :style="{ width: '100%', height: '100%' }">
    <div class="block">
      <div>
        <div style="display: inline">
          <span class="demonstration">设备 </span>
          <el-select
            v-model="queryOptions.cameraId"
            filterable
            remote
            no-data-text="暂时没有设备"
            placeholder="请选择设备"
            :remote-method="queryCameraList"
            @change="requestData"
          >
            <el-option
              v-for="item in cameraList"
              :key="item.id"
              :label="item.name + ' ' + item.name"
              :value="item.id"
            />
          </el-select>
        </div>
        <div style="display: inline; margin-left: 30px">
          <span class="demonstration">开始时间 </span>
          <el-date-picker
            v-model="queryOptions.beginTime"
            type="datetime"
            placeholder="选择日期时间"
            align="right"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </div>
        <div style="display: inline; margin-left: 30px">
          <span class="demonstration">结束时间 </span>
          <el-date-picker
            v-model="queryOptions.endTime"
            type="datetime"
            placeholder="选择日期时间"
            align="right"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </div>
        <div style="display: inline; margin-left: 30px">
          <el-select v-model="showType" placeholder="请选择人流量展示模式">
            <el-option
              v-for="item in showOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div style="display: inline;margin-left:60px">
          <el-button icon="el-icon-search" @click="requestData">
            搜索
          </el-button>
        </div>
      </div>
    </div>

    <div
      v-if="reloadChart"
      id="flowChart"
      :style="{ width: '100%', height: '90%' }"
    ></div>
  </div>
</template>

<script lang="ts">
import * as api from '../../api/analyze'
import { queryCamera } from '../../api/devices'

export default {
  data() {
    return {
      queryOptions: {
        cameraId: null,
        /**
         * type值含义
         * WEEK：1, num天内人流量(默认)
         * WEEK：2, num周内人流量
         * MONTH：3, num月内人流量
         **/
        type: 1,
        num: 1,
        beginTime: '',
        endTime: '',
      },
      reloadChart: true,
      flowData: [],
      queryCamera: {
        page: 1,
        limit: 10,
      },
      data: [],
      date: [],
      cameraList: [],
      option: {},
      showType: 1,
      showOptions: [
        {
          label: '原生人流量',
          value: 1,
        },
        {
          label: '小时人流量',
          value: 2,
        },
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            },
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            },
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            },
          },
        ],
      },
      msg: 'Welcome to Your Vue.js App',
    }
  },
  mounted() {
    this.init()
    this.requestData()
  },
  methods: {
    init() {
      this.queryCameraList()
      this.queryOptions.endTime = this.$moment()
        .locale('zh-cn')
        .format('YYYY-MM-DD HH:mm:ss')
    },
    queryCameraList() {
      queryCamera(this.queryCamera).then((res) => {
        if (res.code === 0) {
          this.cameraList = res.data.records
        }
      })
    },
    requestData() {
      if (this.queryOptions.beginTime !== '') {
        this.queryOptions.beginTime = this.$moment(
          this.queryOptions.beginTime
        ).format('YYYY-MM-DD HH:mm:ss')
      }
      if (this.queryOptions.endTime !== '') {
        this.queryOptions.endTime = this.$moment(
          this.queryOptions.endTime
        ).format('YYYY-MM-DD HH:mm:ss')
      }
      if (this.showType === 1) {
        api.getAll(this.queryOptions).then((res) => {
          if (res.code === 0) {
            this.flowData = res.data
            this.loading = false
          }
        })
      } else {
        api.get(this.queryOptions).then((res) => {
          if (res.code === 0) {
            this.flowData = res.data
            this.loading = false
          }
        })
      }
    },
    drawChart() {
      this.reloadChart = false
      this.option = {
        tooltip: {
          trigger: 'axis',
          position: function(pt) {
            return [pt[0], '10%']
          },
        },
        title: {
          left: 'center',
          text: '历史人流量',
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: 'none',
            },
            restore: {},
            saveAsImage: {},
          },
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.date,
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
        },
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 10,
          },
          {
            start: 0,
            end: 10,
            handleIcon:
              'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2,
            },
          },
        ],
        series: [
          {
            name: '人流量',
            type: 'line',
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
              color: 'rgb(255, 70, 131)',
            },
            areaStyle: {
              color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(255, 158, 68)',
                },
                {
                  offset: 1,
                  color: 'rgb(255, 70, 131)',
                },
              ]),
            },
            data: this.data,
          },
        ],
      }

      this.reloadChart = true
      // 基于准备好的dom，初始化echarts实例
      let flowChart = this.$echarts.init(document.getElementById('flowChart'))
      // 绘制图表
      flowChart.setOption(this.option)
    },
  },
  watch: {
    // 返回flow数据后重新渲染表格
    flowData() {
      this.data = []
      this.date = []
      if (this.showType === 1) {
        // 原生人流量
        this.flowData.forEach((item) => {
          this.date.push(item.recordTime)
          this.data.push(item.flow)
        })
      } else {
        // 小时人流量
        this.flowData.forEach((item) => {
          this.date.push(item.date + ' ' + item.hour + '时')
          this.data.push(item.hourFlow)
        })
      }
      this.drawChart()
    },
  },
}
</script>

<style></style>
