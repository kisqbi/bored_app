import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import activity from '@/store/modules/activity'
import error from '@/store/modules/error'

Vue.use(Vuex)
//const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    error,
    activity,
  },
  state: {
  },
  mutations: {
  },
  getters: {
  },
  actions: {
  }
 
})



