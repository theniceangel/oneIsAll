import Vuex from 'vuex'
import Vue from 'vue'
import state from './state.js'
import mutations from './mutations.js'
import getters from './getters.js'
import actions from './actions'
import createLogger from 'vuex/dist/logger'

const DEBUGGER = process.env.NODE_ENV !== 'production'
Vue.use(Vuex)
export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  strict: DEBUGGER,
  plugins: DEBUGGER ? [createLogger()] : []
})
