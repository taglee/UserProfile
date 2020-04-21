// import Axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// const axios = Axios.create()

const state = {
  mode: 'login',
  list: [],
  roleid: window.sessionStorage.getItem('roleid'),
}

const getters = {
  menu: function(state) {
    if (state.roleid == 2) {
      return [
        {
          name: '课程管理',
          icon: 'el-icon-menu',
          path: '/index/courseManage',
        },
        {
          name: '学生预警',
          icon: 'el-icon-document',
          path: '/index/warning',
        },
      ]
    }
  },
}

const mutations = {
  SET_ROLEID: (state, data) => {
    state.roleid = data
    window.sessionStorage.setItem('roleid', data)
  },
}

const actions = {
  // 获取权限列表
  // getPermission({ commit }) {
  //   return new Promise((resolve, reject) => {
  //     axios({
  //       url: '/privilege/queryPrivilege?id=' + sessionStorage.getItem('privId'),
  //       methods: 'get',
  //       headers: {
  //         name: sessionStorage.getItem('name'),
  //       },
  //     })
  //       .then((res) => {
  //         // 存储权限列表
  //         commit('setList', res.data.cust.privileges[0].children)
  //         resolve(res.data.cust.privileges[0].children)
  //       })
  //       .catch(() => {
  //         reject()
  //       })
  //   })
  // },
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
})
