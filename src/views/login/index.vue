<template>
<div class="background">
  <div class="app-location">
    <h2>人流量管理平台</h2>
    <div class="line"><span></span></div>
    <form>
      <input v-model="loginForm.username" type="text" class="text" />
      <input
        v-model="loginForm.password"
        type="password"
      />
      <div class="submit">
        <el-button
          @click.native.prevent="handleLogin"
          style="width:100%;height:50px"
          type="success"
          >登录</el-button
        >
      </div>
      <div class="clear"></div>
    </form>
  </div>
</div>
</template>

<script>
import '../../assets/css/login.css'
import { login } from '../../api/user'
import { store } from '../../store/user'
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur' }],
      },
      loading: false,
      passwordType: 'password',
      img: '',
      need_code: false,
      redirect: undefined,
    }
  },
  created() {},
  methods: {
    async handleLogin() {
      if (this.loginForm.username === '' || this.loginForm.password === '') {
        this.$message({
          message: '账号或密码不能为空',
          type: 'error',
        })
        return
      }
      const res = await login(this.loginForm)
      if (res.code === 0) {
        store.setToken(res.data.token)
        this.$router.push('/center/devices')
      }
    },
  },
}
</script>
