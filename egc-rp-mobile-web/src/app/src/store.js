import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    LOADING:true
  },
  mutations: {
    showLoading(state){
    state.LOADING = true
  },
  hideLoading (state) {
      state.LOADING = false
  }
  },
  actions: {}
});
