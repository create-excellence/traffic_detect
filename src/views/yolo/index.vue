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
import { getLastOne, getWarningData } from "../../api/flow";
import { getCameraById } from "../../api/devices";
import { store } from '../../store/user'
import EasyPlayer from "@easydarwin/easyplayer";
export default {
  components: {
    EasyPlayer
  },
  props:['data'],
  data() {
    return {
      cameraId: this.$route.params.id,
      //rtmp://rtmp01open.ys7.com/openlive/f01018a141094b7fa138b9d0b856507b.hd
      //rtmp://play.imhtb.cn/live/1
      videoUrl:
        "",
      number: 0,
      now: "",
      tableData: []
    };
  },
  created() {
    this.init();
    this.initWebSocket(this.cameraId)
  },
  methods: {
    init() {
      let params = {
        cid: this.cameraId,
        page: 1,
        limit: 10
      };
      getWarningData(params).then(res => {
        if (res.code === 0 && res.data != null) {
          this.tableData = res.data.records;
        }
      });
      getCameraById({id:this.cameraId}).then(r=>{
         if (r.code === 0 && r.data!=null) {
          this.videoUrl = r.data.playUrl;
        }
      })
      
    },
    callbackFun(){

    },
    getLastOne() {
      let params = {
        cid: this.cameraId
      };
      getLastOne(params).then(res => {
        if (res.code === 0 && res.data != null) {
          this.number = res.data.flow;
          this.now = res.data.createTime;
        }
      });
    },
    initWebSocket(cid) {
      let socketObj = store.state.webSocket;
      console.log(socketObj, "obj");
      if (
        socketObj.cid === cid &&
        socketObj.socket != "" &&
        socketObj.socket.readyState === 1
      ) {
        console.log("ws连接已经创建");
      } else {
        if (socketObj.socket != "") {
          socketObj.socket.close();
        }
        //39.108.220.199
        this.socket = new WebSocket(
          "ws://39.108.220.199:7001/connect/" + cid
        );
        this.socket.onopen = this.open;
        this.socket.onclose = this.onclose;
        this.socket.onerror = this.error;
        this.socket.onmessage = this.getMessage;
        store.setWebSocket({
          cid,
          socket: this.socket
        })
      }
    },
     open() {
      console.log("ws连接成功");
    },
    error() {
      console.log("ws连接错误");
    },
    getMessage(msg) {
      let message = JSON.parse(msg.data);
      if (message.op === "MESSAGE") {
        let d = message.d;
        this.number = d.number;
        this.now = d.now;
      }
    },
    onclose() {
      console.log("ws已经关闭");
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