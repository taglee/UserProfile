<template>
  <el-card class="box-card">
    <div>
      <course-menu @callFather="menuSearch"></course-menu>

      <el-table ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%">

        <el-table-column type="selection"
                         width="55"
                         :selectable="selectable">
        </el-table-column>
        <el-table-column label="学生姓名"
                         prop="name">
        </el-table-column>
        <el-table-column prop="xkScore"
                         label="形考成绩">
        </el-table-column>
        <el-table-column prop="learningDuration"
                         label="学习时长">
        </el-table-column>
        <el-table-column prop="discussCnt"
                         label="讨论次数">
        </el-table-column>
        <el-table-column prop="isYj"
                         label="是否已经预警">
        </el-table-column>
        <el-table-column prop="isDel"
                         label="是否解除预警">
        </el-table-column>
        <el-table-column prop="mobile"
                         label="打电话"
                         show-overflow-tooltip>
        </el-table-column>
      </el-table>

      <el-pagination class="pagination"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :page-sizes="[10, 20, 50, 100 ]"
                     :current-page="params.page"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="params.total">
      </el-pagination>
      <el-button @click="test"
                 type="danger"
                 class='btn'>发送预警</el-button>
    </div>
  </el-card>
</template>

<script>
import courseMenu from '../coursemenu/courseMenu'
export default {
  name: 'Warning',
  // inject: ['reload'],
  props: {

  },
  components: {
    courseMenu
  },
  data () {
    return {
      tableData:
        [

        ],
      params: {
        total: 0,
        courseId: '',
        page: 1,
        limit: 10
      },
      submitWarningStu: {
        courseId: '',
        courseName: "",
        list: []
      }
    }
  },

  computed: {

  },
  methods: {

    //根据菜单查询学生名单
    menuSearch (val) {
      this.params.courseId = val
      this.search()
    },


    selectable (row, index) {
      if (row.isYj == 1) {
        return 0
      } else {
        return 1
      }
    },


    //提交预警学生
    submitWarning (val) {
      this.$ajax({
        url: 'http://119.29.243.108:8080/tbaps/yj',
        method: 'post',
        params: {
        },
        data:
          val
      }).then(res => {
        console.log('成功' + res);
        this.$message({
          type: 'success',
          message: '提交成功'
        });
        this.search()
      })
    },
    //测试
    test () {
      var submit = {
        courseId: this.params.courseId,
        courseName: this.params.courseName,
        list: []
      }
      this.$refs.multipleTable.selection.forEach(function (e) {
        var obj = {}
        obj.stuId = e.stuId
        obj.name = e.name
        obj.isYj = e.isYj
        obj.isDel = e.isDel
        obj.mobile = e.mobile
        submit.list.push(obj)
      })
      this.submitWarning(submit)
    },



    //查询
    search () {
      const url = "http://119.29.243.108:8080/tbaps/yj"
      this.$ajax.get(url, {
        params: {
          courseId: this.params.courseId,
          page: this.params.page,
          limit: this.params.limit
        }
      }).then(res => {
        console.log(res);
        this.tableData = res.data.list;
        this.params.total = res.data.total
      }).catch(error => {
        // this.$router.push('/index')
        this.$message.error('网络异常')
      })
    },
    //页码数
    handleCurrentChange (val) {
      this.params.page = val
      this.search()
    },
    //每页条数
    handleSizeChange (val) {
      this.params.limit = val
      this.search()
    },
  },

  created () {


  },
  watch: {
    // $route (to, from) {
    //   this.params.courseId = this.$route.params.id
    //   this.params.courseName = this.$store.state.courseName
    //   console.log(this.params.courseId);
    //   console.log(this.params.courseName);
    //   this.search()
    // }
  },
  mounted () {
    // this.search()
  }
}
</script>

<style>
.pagination {
  margin-top: 20px;
}
.box-card {
  position: relative;
}
.btn {
  position: absolute;
  right: 30px;
  bottom: 15px;
}
</style>





<!--Create at 15:16:30 
   <template slot-scope="scope">{{ scope.row.date }}</template>
-->
