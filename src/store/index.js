import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loader: {
      title: '',
      isLoading: false
    }
  },
  mutations: {
    showLoader(state,payload){
      state.loader.title= payload.title
      state.loader.isLoading = true
    },
    hideLoader(state){
      state.loader.isLoading = false
    }
  },
  actions: {
  },
  modules: {
  }
})
