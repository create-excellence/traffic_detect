<template>
  <div class="app-container">
    <el-form
      ref="searchForm"
      :inline="true"
      :model="queryOptions"
      @submit.native.prevent="handleFilter"
    >
      <el-form-item
        prop="name"
      >
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="handleCreate"
        >
          设备
        </el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="loading"
      :data="data"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >

      <el-table-column
        align="center"
        label="设备名称"
        prop="name"
      />
         <el-table-column
        align="center"
        label="设备编号"
        prop="code"
      />
    <el-table-column
        align="center"
        label="设备位置"
        prop="position"
      />

          <el-table-column
        align="center"
        label="预警值"
        prop="warning"
      />
             <el-table-column
        align="center"
        label="状态"
        prop="status"
      >
       <template slot-scope="scope">
        <el-tag
        v-if="scope.row.status===0"
          type='success'
          disable-transitions>开启</el-tag>
        <el-tag
        v-else
          type='danger'
          disable-transitions>关闭</el-tag>
      </template>
             </el-table-column>
      <el-table-column
        align="center"
        prop="createTime"
        label="添加时间"
      />
      <el-table-column
        align="center"
        prop="updateTime"
        label="更新时间"
      />

      <el-table-column
        align="center"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            type="danger"
            size="mini"
            @click="handleDelete(scope.row.id)"
          >

            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="carmer.id?`修改设备`:`添加设备`"
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
        <el-form-item
          prop="name"
          label="设备名称"
        >
          <el-input
            v-model="editForm.name"
            placeholder="请输入设备名称"
            maxlength="10"
          />
        </el-form-item>
           <el-form-item
          prop="code"
          label="设备编号"
        >
          <el-input
            v-model="editForm.code"
            placeholder="请输入设备编号"
            maxlength="10"
          />
        </el-form-item>
           <el-form-item
          prop="source"
          label="设备来源"
        >
          <el-input
            v-model="editForm.source"
            placeholder="请配置设备视频源"
            maxlength="100"
          />
        </el-form-item>
          <el-form-item
          prop="ip"
          label="设备ip"
        >
          <el-input
            v-model="editForm.ip"
            placeholder="请配置设备ip"
            maxlength="20"
          />
        </el-form-item>
           <el-form-item
          prop="position"
          label="设备位置"
        >
          <el-input
            v-model="editForm.position"
            placeholder="请输入设备所在位置"
            maxlength="15"
          />
        </el-form-item>
            <el-form-item
          prop="position"
          label="预警人数"
        >
        <el-input-number   v-model="editForm.warning"
            placeholder="请输入设备所在位置" :precision="0"  :min="0"></el-input-number>
        </el-form-item>
            <el-form-item
          prop="position"
          label="状态"
        >
       <el-switch
    v-model="editForm.status"
   :active-value="0"
   :inactive-value="1"
   
  >
</el-switch>
<span v-if="editForm.status==0"> 已启用</span>
<span v-else> 已关闭</span>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="showDialog = false">
          取 消
        </el-button>
        <el-button
          type="primary"
          @click="handleSave"
        >
          确 定
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script lang="ts">
import { queryCamera, createCamera, putCamera, deleteCamera } from '../../api/devices'

export default {
  name: 'Devices',
  data() {
    return {
      data: [],
      selectUserId: [],
      queryOptions: {
        page: 1,
        limit: 10
      },
      editForm: {
        name: '',
        source:'',
        code:'',
        position:'',
        warning:60, 
        status:0,
        ip:''  
      },
      carmer: {},
      loading: true,
      showDialog: false,
      rules: {
        name: [{ required: true, message: '设备名称不能为空', trigger: 'blur' }],
        source: [{ required: true, message: '设备源不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '设备编号不能为空', trigger: 'blur' }],
        position: [{ required: true, message: '位置不能为空', trigger: 'blur' }],
        warning: [{ required: true, message: '预警人数不能为空', trigger: 'blur' }],
      }
    }
  },
  created() {
    this.requestData()
  },
  methods: {
    requestData() {
      queryCamera(this.queryOptions).then((res) => {
        if (res.code === 0) {
          this.data = res.data.records
          this.loading = false
        }
      })
    },
    handleCreate() {
      this.carmer = {}
      this.resetForm()
      this.showDialog = true
    },
    handleSave() {
      this.$refs['editForm'].validate((valid) => {
        if (!valid) {
          return false
        }
        if (this.carmer.id) {
          putCamera({ data: this.editForm, id: this.carmer.id }).then((res) => {
            if (res.code === 0) {
              this.resetForm()
              this.showDialog = false
              this.$message({
                type: 'success',
                message: '修改成功!'
              })
              this.requestData()
            }
          })
        } else {
          createCamera(this.editForm).then((res) => {
            if (res.code === 0) {
              this.showDialog = false
              this.$message({
                type: 'success',
                message: '添加成功!'
              })
              this.requestData()
            }
          })
        }
      })
    },
    handleDelete(id) {
      this.$confirm(`确定删除吗？`, '提示', {
        type: 'warning'
      }).then(() => {
        deleteCamera(id).then((res) => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.requestData()
          }
        })
      })
    },
    resetForm() {
      this.editForm = {
        name: '',
        source:'',
        code:'',
        position:'',
        warning:60, 
        status:0,
        ip:''   
      }
    },
    handleFilter() {
      this.queryOptions.page = 1
      this.requestData()
    },
    handleEdit(carmer) {
      this.carmer = carmer
      console.log(carmer.status)
      this.editForm = {
        name: carmer.name,
        source:carmer.source,
        code:carmer.code,
        position:carmer.position,
        warning:carmer.warning,  
        status:carmer.status,
        ip:carmer.ip
      },
      this.showDialog = true
    },

  }

}
</script>
