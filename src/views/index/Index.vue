<template>
  <el-container>
    <el-header height="80px">学生预警系统</el-header>
    <el-container style="height:100%">
      <el-aside>
        <el-menu :default-active='this.$route.path'
                 class="el-menu-vertical-demo"
                 :router="true">
          <el-menu-item index="/index/courseManage">
            <i class="el-icon-menu"></i>
            <span slot="title">课程管理</span>
          </el-menu-item>

          <el-menu-item index="/index/warning">
            <i class="el-icon-document"></i>
            <span slot="title">学生预警</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

export default {
  name: 'Index',
  data () {
    return {
      // firstId: '',
      // isShow: true
    }
  },
  // provide () {
  //   return {
  //     reload: this.reload
  //   }
  // },
  methods: {
    //定义reload方法
    // reload () {
    //   this.isShow = false
    //   this.$nextTick(() => {
    //     this.isShow = true
    //   })
    // },
    //接受子组件传的数据以后,赋值给data，然后在菜单中绑定data
    // first (id) {
    //   console.log('OOOOOO' + id);
    //   this.firstId = id
    // }
  },
  components: {

  },
  mounted () {
    console.log(this.$route.path);

  }
}
</script>

<style>
.el-aside {
  height: 100%;
}
.el-main {
  background-color: #f2f6fc;
}
.el-header {
  background-color: #409eff;
  border-radius: 5px;
  font-size: 30px;
  line-height: 80px;
  color: rgb(255, 255, 255);
}
</style>





<!--Create at 13:40:33 -->