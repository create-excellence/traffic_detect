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
      <el-table-column align="center" property="path" label="快照" width="160">
      </el-table-column>
      <el-table-column
        align="center"
        property="flow.flow"
        label="人流量"
        width="160"
      >
      </el-table-column>
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
          <el-input
            v-model="editForm.snapshotname"
            placeholder="请输入快照路径"
            maxlength="15"
          />
        </el-form-item>
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

export default {
  data() {
    return {
      showDialog: false,
      loading: true,
      data: [],
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
        path: '',
        status: 0,
        info: '',
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
