<template>
  <div
    class="login"
    :style="{height:(winHeight-16)+'px'}"
  >
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      class="loginForm"
      :rules="rules"
    >
      <el-form-item
        label="账 户"
        prop="username"
      >
        <el-input
          v-model.trim="form.username"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="密 码"
        prop="password"
      >
        <el-input
          v-model.trim="form.password"
          placeholder="请输入密码"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
          :style="{width:'220px'}"
        >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: 'Login',
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState(['winHeight'])
  },
  methods: {
    ...mapActions(['verifyUser']),
    async onSubmit () {
      await this.verifyUser(this.form)
      this.$router.push('/')
    },
    async checkUser () {
      await new Promise((resolve, reject) => {
        return setTimeout(() => {
          console.log('验证通过')
        }, 1000)
      })
    }
  }
}
</script>

<style lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
}
.loginForm {
  width: 300px;
  height: 200px;
}
</style>
