<template>
  <el-container>
    <el-header height="80px">学生预警系统</el-header>
    <el-container style="height:100%">
      <el-aside>
        <el-menu :default-active='this.$route.path'
                 class="el-menu-vertical-demo"
                 :router="true">
          <!-- <el-menu-item index="/index/courseManage">
            <i class="el-icon-menu"></i>
            <span slot="title">课程管理</span>
          </el-menu-item>

          <el-menu-item index="/index/warning">
            <i class="el-icon-document"></i>
            <span slot="title">学生预警</span>
          </el-menu-item> -->
          <template>
            <el-menu-item v-for="menu in routes"
                          :key="menu.name"
                          :index="menu.path">
              <i :class="menu.icon"></i>
              <span slot="title">{{menu.name}}</span>
            </el-menu-item>
          </template>
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

    }
  },

  methods: {

  },
  computed: {
    routes () {
      return this.$store.getters.menu
    }
  },
  components: {

  },
  mounted () {

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