<template>
  <div>
    <el-card class="box">

      <el-row class="grid-content">
        <el-col :span="24">
          <div class="now"
               v-loading="loading">
            <span>{{title}}</span>
            <el-table :data="courseTable"
                      tooltip-effect="dark"
                      max-height="300px"
                      size="small"
                      :cell-style="cellStyle"
                      @row-click="click"
                      highlight-current-row
                      ref="courseTable">
              <el-table-column prop="name"
                               label="课程名"
                               width="200px">
              </el-table-column>
              <el-table-column prop="isRequired"
                               label="是否必修">
              </el-table-column>
              <el-table-column prop="isOnline"
                               label="是否线上">
              </el-table-column>
              <el-table-column prop="stuNum"
                               label="选课人数">
              </el-table-column>
              <el-table-column prop="passRate"
                               label="通过率">
              </el-table-column>
              <el-table-column prop="appNum"
                               label="好评数">
              </el-table-column>

            </el-table>
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <div id="history">
          </div>
        </el-col>
        <el-col :span="12">
          <div class="stu"
               v-loading="stuLoading">
            <span class="stuTitle">{{stuTitle}} </span>学生名单
            <el-table :data="stuTable"
                      tooltip-effect="dark"
                      max-height="330px"
                      size="small"
                      border="">
              <el-table-column prop="name"
                               label="学生姓名"
                               width="200px">
              </el-table-column>
              <el-table-column prop="examType"
                               label="成绩类型">
              </el-table-column>
              <el-table-column prop="examScore"
                               label="考试成绩">
              </el-table-column>
              <el-table-column prop="examLv"
                               label="等级">
              </el-table-column>
              <el-table-column prop="addTime"
                               label="时间戳">
              </el-table-column>

            </el-table>
          </div>
        </el-col>
      </el-row>

    </el-card>
  </div>
</template>

<script>
export default {
  name: 'courseManage',
  data () {
    return {
      //当前学期所授课程标题
      title: '',
      //当前课程学生列表标题
      stuTitle: '',
      //课程表loading
      loading: true,
      //学生列表loading
      stuLoading: true,
      //课程列表
      courseTable: [],
      //学生列表
      stuTable: [],
      //柱状图横纵坐标
      charts: {
        team: [],
        count: []
      }
    }
  },
  created () {
  },
  methods: {
    //课程表颜色和样式
    cellStyle (row, column, rowIndex, columnIndex) {
      if (row.columnIndex === 0) {
        return 'color:#409EFF;cursor:pointer'
      } else {
        return 'cursor:pointer'
      }
    },
    //获取课程 不传参数默认当前学期
    getCourse (val) {
      this.loading = true
      this.stuLoading = true
      this.$ajax({
        url: 'http://119.29.243.108:8080/tbaps/course/semester',
        method: 'get',
        params: {
          techId: '584113103c2137c1',
          page: 0,
          limit: 0,
          semester: val
        }
      }).then(res => {
        //动态更改标题名称
        if (!val) {
          this.title = '当前学期所授课程'
        } else {
          this.title = val + ' 所授课程'
        }
        //加载课程表
        this.courseTable = res.data.data.list
        //加载完成后关闭loading图
        this.loading = false
        //默认选中第一行
        this.$refs.courseTable.setCurrentRow(this.courseTable[0]);
        //点击学期更改学生列表默认标题名称
        this.stuTitle = res.data.data.list[0].name
        //点击学期加载默认学生名单
        this.getStu(res.data.data.list[0].courseId)
      }).catch(error => {
        this.$message.error('错误')
        console.log(error);
      })
    },
    // 获取学生列表
    getStu (val) {
      this.stuLoading = true
      this.$ajax({
        url: 'http://119.29.243.108:8080/tbaps/course/allstu',
        method: 'get',
        params: {
          courseId: val,
          page: 0,
          limit: 0
        }
      }).then(res => {


        //加载学生列表
        this.stuTable = res.data.data.list
        //关闭学生列表loading
        this.stuLoading = false

      }).catch(error => {
        this.$message.error('错误')
        console.log(error);
      })
    },
    // 点击课程名获取学生列表
    click (row) {
      this.getStu(row.courseId)
      //点击课程更改学生列表标题
      this.stuTitle = row.name
    },
    getXY (val) {
      this.$ajax({
        url: 'http://119.29.243.108:8080/tbaps/course/all?',
        method: 'get',
        params: {
          techId: '584113103c2137c1'
        }
      }).then(res => {
        //遍历横纵轴
        for (var i in res.data.data) {
          this.charts.team.push(i)
          this.charts.count.push(res.data.data[i])
        }
        //装载轴数据
        val.setOption({
          xAxis: [
            {
              data: this.charts.team //将异步请求获取到的数据进行装载
            }
          ],
          series: [
            {
              data: this.charts.count
            }
          ]
        })
      }).catch(error => {
        this.$message.error('错误')
        console.log(error);
      })
    },
    drawChart () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("history"));
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: "历史所授课程"
        },
        tooltip: {},
        legend: {
          data: ["课程数"]
        },
        xAxis: {
          data: [],
          axisLabel: { interval: 0 }
        },
        yAxis: {},
        series: [
          {
            name: "课程数",
            type: "bar",
            data: []
            ,
            itemStyle: {
              normal: {
                color: '#409EFF'
              }
            },
          }
        ]
      };
      var that = this
      //绑定点击是双向绑定的，所以可以放在绑定X轴名称事件前
      myChart.on('click', function (params) {
        that.getCourse(params.name)
      })
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      //获取横纵轴坐标
      this.getXY(myChart)
      //获取默认课程和默认学生
      this.getCourse()
    }
  },
  mounted () {
    this.drawChart();
  },
  components: {
  }
}
</script>

<style>
#history {
  height: 400px;
}
.grid-content {
  padding-bottom: 50px;
}
</style>





<!--Create at 16:10:49 -->