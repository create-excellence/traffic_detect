<template>
  <div>
    <el-form
      ref="searchForm"
      :inline="true"
      :model="queryOptions"
      @submit.native.prevent="handleFilter"
    >
      <el-form-item prop="snapshotname">
        <el-button
          type="primary"
          size="middle"
          icon="el-icon-plus"
          @click="handleCreate"
        >
          快照
        </el-button>
      </el-form-item>
    </el-form>
    <el-table
      ref="singleTable"
      :data="data"
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column align="center" label="设备名称" prop="camera.name" />
      <el-table-column align="center" property="path" label="快照" width="160">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px; text-align:center"
            :src="imagePath + 'show/' + scope.row.path"
            fit="cover"
          >
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        property="flow.flow"
        label="人流量"
        width="160"
      >
      </el-table-column>
      <el-table-column align="center" label="描述" prop="info" />
      <el-table-column align="center" label="地点" prop="camera.position" />
      <el-table-column
        align="center"
        property="status"
        label="状态"
        width="160"
      >
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status === 0"
            prop="status"
            type="warning"
            size="mini"
            plain
          >
            未知
          </el-button>
          <el-button
            v-else-if="scope.row.status === 1"
            type="success"
            size="mini"
            plain
          >
            正常
          </el-button>
          <el-button v-else type="danger" size="mini" plain>
            异常
          </el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="recordTime" label="时间">
        <template slot-scope="scope">
          {{ $moment(scope.row.recordTime).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">
            编辑
          </el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="snapshot.id ? `修改快照信息` : `添加快照`"
      :visible.sync="showDialog"
      @close="showDialog = false"
    >
      <el-form
        v-if="showDialog"
        ref="editForm"
        :model="editForm"
        :rules="rules"
        label-position="top"
      >
        <el-form-item prop="path" label="快照">
          <div ref="editor" class="editor">
            <input
              ref="image-input"
              accept="image/*"
              type="file"
              @change="handleUploadImageFiles"
            />
          </div>
          <!-- <el-upload
            class="upload-image"
            drag
            :action="imagePath + '/upload'"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload> -->
        </el-form-item>
        <el-form-item prop="status" label="状态">
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
        </el-form-item>
        <el-form-item prop="recordTime" label="时间">
          <el-date-picker
            v-model="editForm.recordTime"
            type="datetime"
            placeholder="选择日期时间"
            align="right"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="position" label="设备位置">
          <el-input
            v-model="editForm.position"
            placeholder="请输入设备所在位置"
            maxlength="15"
          />
        </el-form-item>
        <!-- <el-form-item prop="info" label="人流量">
          <el-input-number
            v-model="editForm.flow"
            :min="1"
            :max="10000"
            label="人流量"
          ></el-input-number>
        </el-form-item> -->
        <el-form-item prop="status" label="状态">
          <el-select v-model="editForm.status" placeholder="请选择状态">
            <el-option
              v-for="item in statusOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">
          取 消
        </el-button>
        <el-button type="primary" @click="handleSave">
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import * as api from '../../api/snapshot'
import { queryCamera } from '../../api/devices'

export default {
  data() {
    return {
      imagePath: 'http://localhost:9000/flow-analyze/snapshot/',
      showDialog: false,
      loading: true,
      cameraList: [],
      data: [],
      queryCamera: {
        page: 1,
        limit: 10,
      },
      snapshot: {},
      statusOption: [
        {
          label: '未知',
          value: 0,
        },
        {
          label: '正常',
          value: 1,
        },
        {
          label: '异常',
          value: 2,
        },
      ],
      queryOptions: {
        page: 1,
        size: 10,
        flow: 0,
        organizationId: -1,
      },
      editForm: {
        flow: {},
        camera: {},
        recordTime: null,
        info: '',
        position: '',
        path: '',
        status: 0,
      },
      rules: {
        name: [{ required: true, message: '快照名不能为空', trigger: 'blur' }],
      },
    }
  },
  created() {
    this.requestData()
  },

  methods: {
    requestData() {
      api.querySnapshots(this.queryOptions).then((res) => {
        if (res.code === 0) {
          this.data = res.data.records
          this.loading = false
        }
      })
    },
    handleCreate() {
      this.snapshot = {}
      this.resetForm()
      this.showDialog = true
    },
    handleSave() {
      this.$refs['editForm'].validate((valid) => {
        if (!valid) {
          return false
        }
        if (this.snapshot.id) {
          Object.assign(this.snapshot, this.editForm)
          api.update(this.snapshot).then((res) => {
            if (res.code === 0) {
              this.resetForm()
              this.showDialog = false
              this.$message({
                type: 'success',
                message: '修改成功!',
              })
              this.requestData()
            }
          })
        } else {
          api.add(this.editForm).then((res) => {
            if (res.code === 0) {
              this.showDialog = false
              this.$message({
                type: 'success',
                message: '添加成功!',
              })
              this.requestData()
            }
          })
        }
      })
    },
    resetForm() {
      this.editForm = {
        snapshotname: '',
        roles: [],
        status: 0,
      }
    },
    queryCameraList() {
      queryCamera(this.queryCamera).then((res) => {
        if (res.code === 0) {
          this.cameraList = res.data.records
        }
      })
    },
    // handleUploadImageFiles(e: Event) {
    handleUploadImageFiles() {
      const MAX_IMAGE_SIZE = 100 * 1000 * 1000 // 100M
      const input = document
        .getElementsByClassName('editor')[0]
        .getElementsByTagName('input')[0]
      const selectedFile = input.files && input.files[0]
      if (!selectedFile) {
        return
      }
      if (selectedFile.size > MAX_IMAGE_SIZE) {
        this.$message.error('图片不能大于500K')
        return
      }
      api.upload(selectedFile).then((res) => {
        this.editForm.path = res.data.data.path
      })
    },
    handleFilter() {
      this.queryOptions.page = 1
      this.requestData()
    },
    handleEdit(data) {
      this.snapshot = data
      this.editForm = {
        snapshotname: data.snapshotname,
        roles: data.roles,
        status: data.status,
      }

      this.showDialog = true
    },
    handleDelete(id) {
      this.$confirm(`确定删除吗？`, '提示', {
        type: 'warning',
      }).then(() => {
        api._delete(id).then((res) => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '删除成功!',
            })
            this.requestData()
          }
        })
      })
    },
  },
}
</script>

<style></style>
