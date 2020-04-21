<template>
  <div>
    <el-select v-model="value"
               placeholder="课程列表"
               @change="change(value)">
      <el-option v-for="menu in menu_data"
                 :key="menu.name"
                 :label="menu.name"
                 :value="menu.courseId">
      </el-option>
    </el-select>
  </div>

</template>

<script>

export default {
  name: 'courseMenu',
  props: {
  },
  data () {
    return {
      value: '',
      menu_data: [],
    }
  },
  props: {
  },
  methods: {
    change (id) {
      // console.log();
      this.$emit("callFather", id)
    },
  },
  created () {
    const techId = window.sessionStorage.getItem('storeData')
    this.$ajax({
      url: 'http://119.29.243.108:8080/tbaps/curr',
      method: 'get',
      params: {
        techId: techId
      }
    }).then(res => {
      this.menu_data = res.data.data
      this.value = res.data.data[0].courseId
      this.$emit("callFather", this.value)
      // console.log(this.menu_data);
      //传给父组件默认的第一个courseId
      // this.$emit('first', this.menu_data[0].courseId)
      //通过Vuex传给Warning组件默认的第一个courseName
      // this.$store.dispatch("changeName", this.menu_data[0].name)
      //传给路由以便让Warning渲染默认id
      // this.$router.push({ path: `/warning/${this.menu_data[0].courseId}` });
      if (res) {
        console.log('have');
      }
    }).catch(error => {
      this.$message.error('请求失败')
    })

  },

  components: {
  }
}
</script>

<style>
.el-submenu .el-menu-item {
  height: 25px;
  line-height: 25px;
}
</style>





<!--Create at 13:35:24 -->