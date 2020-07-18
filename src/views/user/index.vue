<template>
  <div>
    <el-form
      ref="searchForm"
      :inline="true"
      :model="queryOptions"
      @submit.native.prevent="handleFilter"
    >
      <el-form-item prop="username">
        <el-button
          type="primary"
          size="middle"
          icon="el-icon-plus"
          @click="handleCreate"
        >
          用户
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
      <el-table-column
        align="center"
        property="username"
        label="用户名"
        width="160"
      >
      </el-table-column>
      <el-table-column align="center" property="roles" label="角色" width="240">
        <template slot-scope="scope">
          <el-tag
            style="margin:4px"
            v-for="role in scope.row.roles"
            :key="role"
            :type="`${role === 'admin' ? 'danger' : 'success'}`"
            >{{ `${role === 'admin' ? '管理员' : '普通用户'}` }}</el-tag
          >
        </template>
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
      :title="user.id ? `修改用户信息` : `添加用户`"
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
        <el-form-item prop="username" label="用户名">
          <el-input
            v-model="editForm.username"
            placeholder="请输入用户名称"
            maxlength="15"
          />
        </el-form-item>
        <el-form-item
          v-if="user.id ? false : true"
          prop="password"
          label="密码"
        >
          <el-input
            type="password"
            v-model="editForm.password"
            placeholder="请输入用户密码"
            maxlength="15"
          />
        </el-form-item>
        <el-form-item prop="roles" label="角色">
          <el-checkbox-group v-model="editForm.roles" size="medium">
            <el-checkbox
              v-for="item in rolesOption"
              :key="item.label"
              :label="item.label"
              border
            ></el-checkbox>
          </el-checkbox-group>
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
import * as api from '../../api/user'

export default {
  data() {
    return {
      showDialog: false,
      loading: true,
      data: [],
      user: {},
      rolesOption: [
        {
          label: '管理员',
          value: 'admin',
        },
        {
          label: '普通用户',
          value: 'user',
        },
      ],
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
        username: '',
      },
      editForm: {
        username: '',
        password: '',
        status: 0,
        roles: [],
      },
      currentRow: null,
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
        ],
        roles: [
          { required: true, message: '用户角色不能为空', trigger: 'blur' },
        ],
      },
    }
  },
  created() {
    this.requestData()
  },

  methods: {
    requestData() {
      api.queryUsers(this.queryOptions).then((res) => {
        if (res.code === 0) {
          this.data = res.data.records
          this.loading = false
        }
      })
    },
    handleCreate() {
      this.user = {}
      this.resetForm()
      this.showDialog = true
    },
    handleSave() {
      // 将CheckBox的label映射到value
      let list = []
      this.editForm.roles.forEach((item) => {
        this.rolesOption.forEach((element) => {
          if (element.label === item) {
            list.push(element.value)
          }
        })
      })
      this.editForm.roles = list

      this.$refs['editForm'].validate((valid) => {
        if (!valid) {
          return false
        }
        if (this.user.id) {
          Object.assign(this.user, this.editForm)
          api.update(this.user).then((res) => {
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
        username: '',
        roles: [],
        status: 0,
      }
    },
    handleFilter() {
      this.queryOptions.page = 1
      this.requestData()
    },
    handleEdit(data) {
      this.user = data
      this.editForm = {
        username: data.username,
        roles: data.roles,
        status: data.status,
      }

      // 将roles映射到label
      let list = []
      this.editForm.roles.forEach((item) => {
        this.rolesOption.forEach((element) => {
          if (element.value === item) {
            list.push(element.label)
          }
        })
      })
      this.editForm.roles = list

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
