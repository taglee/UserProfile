<template>
  <el-dialog title="登陆"
             :close-on-click-modal="false"
             :visible.sync="dialogFormVisible"
             :show-close="false">
    <el-form>
      <el-form-item label="用户名"
                    :label-width="formLabelWidth">
        <el-input v-model="loginForm.username"
                  @keyup.enter.native="login"></el-input>
      </el-form-item>
      <el-form-item label="密码"
                    :label-width="formLabelWidth">
        <el-input v-model="loginForm.password"
                  type="password"
                  show-password
                  @keyup.enter.native="login"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer"
         class="dialog-footer">
      <el-button type="primary"
                 @click="login">登陆</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      formLabelWidth: '120px',
      dialogFormVisible: true
    }
  },
  methods: {
    login () {
      //后台设置限制时简写请求会失败（官方bug）
      // const url = "http://119.29.243.108:8080/tbaps/login"
      // const param = {
      //   username: "552326xa",
      //   password: "123456"
      // }
      // this.$ajax.post(url, param
      // ).then(res => {
      //   console.log(res);
      // }).catch(error => {
      //   console.log(error);
      // })
      //append方法（应对官方bug）
      //   const url = "http://119.29.243.108:8080/tbaps/login"
      //   let param = new URLSearchParams()
      //   param.append('username', '552326xa')
      //   param.append('password', '123456')
      //   // const params = 
      //   this.$ajax.post(url, param
      //   ).then(res => {
      //     console.log(param);
      //   }).catch(error => {
      //     console.log(error);

      this.$ajax({
        url: 'http://119.29.243.108:8080/tbaps/login',
        method: 'post',
        params: {
          username: this.loginForm.username,
          password: this.loginForm.password
        }
      }).then(res => {
        console.log(res);
        // if (res.data.data.type == 1) {
        //   this.$message.error('请输入老师ID')
        // }
        if (res.status == 200) {
          this.$store.commit('SET_ROLEID', res.data.data.roles.id)
          window.sessionStorage.setItem('storeData', res.data.data.userId)
          //用路由跳转页面
          this.$router.push('/index')
        }
        // this.dialogFormVisible = false
      }).catch(error => {
        this.$message.error('用户名或密码错误')
      })
    }
  },
  components: {

  }
}
</script>

<style>
</style>





<!--Create at 10:05:13 -->