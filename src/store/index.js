import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    courseName: ''
  },
  getters: {
    getCourseName: function(state) {
      return state.courseName
    }
  },
  mutations: {
    changeName(state, name) {
      state.courseName = name
    }
  },
  actions: {
    changeName(context, name) {
      context.commit('changeName', name)
    }
  },
  modules: {}
})
