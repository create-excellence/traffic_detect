<template>
  <div class="td-yolo-container">
    <div style="margin:0 auto;">
      <div class="td-easy-player">
        <EasyPlayer :videoUrl="videoUrl" live stretch auto-play></EasyPlayer>
      </div>
      <!-- 
        3840×52612160 （超高清 4K）
        2560X1440 （2K）
        1920×1080 （1080p全高4102清）
        1600×900
        1366×768  
        1280×720    （720P 高清）
        1024×576
      -->
      <div class="td-yolo-analyse">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>实时人数</span>
          </div>
          <div style="height:100px;padding:10px;margin-top:50px">
            <div>
              <h3 style="color:#5e5e5e">当前人数：{{number}}人/次</h3>
            </div>
            <div>
              <span>{{now}}</span>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <el-divider></el-divider>
    <!-- <div id="main" style="width: 1200px;height:300px;"></div> -->
    <el-table :data="tableData" size="small" style="width:950px;margin:0 auto;">
      <el-table-column type="index" width="100"></el-table-column>
      <el-table-column prop="number" label="人数"></el-table-column>
      <el-table-column prop="warning" label="预警值"></el-table-column>
      <el-table-column label="超值">
        <template slot-scope="scope">
          <span>{{scope.row.number - scope.row.warning}}</span>
        </template>
      </el-table-column>
      <el-table-column label="超值百分比">
        <template slot-scope="scope">
          <span>{{(((scope.row.number - scope.row.warning)/scope.row.warning)*100).toFixed(2)}}%</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="时间"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import EasyPlayer from "@easydarwin/easyplayer";
export default {
  components: {
    EasyPlayer
  },
  data() {
    return {
      //http://play.imhtb.cn/live/1.flv
      //rtmp://play.imhtb.cn/live/1
      //videoUrl:"rtmp://rtmp01open.ys7.com/openlive/c60937c90d4242499790cdc8d819f6c5",
      videoUrl:"rtmp",
      number: 0,
      now: "2020-6-15 20:23:33",
      tableData: [
        {
          number: "129",
          warning: "100",
          createTime: "2016-05-02 21:23:25"
        }
      ]
    };
  },
  mounted() {
    //this.myEcharts();
  },
  methods: {
    myEcharts() {
      var myChart = this.$echarts.init(document.getElementById("main"));

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "Traffic Detect"
        },
        tooltip: {},
        xAxis: {
          type: "category",
          data: ["12:13", "12:14", "12:15", "12:16", "12:17", "12:18", "12:19"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [1, 5, 9, 2, 12, 7, 9],
            type: "line"
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  }
};
</script>

<style lang="less">
.td-yolo-container {
  text-align: center;
  margin-top: 5%;
  .td-easy-player {
    height: auto;
    width: 600px;
    display: inline-block;
  }
  .td-yolo-analyse {
    margin-left: 30px;
    display: inline-block;
    .box-card {
      width: 300px;
      height: 337px;
      .clearfix {
        span {
          font-size: 16px;
          font-weight: bold;
        }
      }
      span {
        font-size: 14px;
        color: #666;
      }
    }
  }
}
</style>