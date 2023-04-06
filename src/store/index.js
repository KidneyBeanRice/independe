import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state: {
    boardCheck: 0,
    independentCheck: 0,
    categoryCheck: 0
  },
  getters: {
  },
  mutations: {
    updateIndependentCheck(state, newValue) {
      state.independentCheck = newValue;
    },
    updateBoardCheck(state, newValue) {
      state.boardCheck = newValue;
    },
    updateCategoryCheck(state, newValue) {
      state.categoryCheck = newValue;
    },
  },
  actions: {
    updateIndependentCheck({ commit }, newValue) {
      commit('updateIndependentCheck', newValue);
    },
    updateBoardCheck({ commit }, newValue) {
      commit('updateBoardCheck', newValue);
    },
    updateCategoryCheck({ commit }, newValue) {
      commit('updateCategoryCheck', newValue);
    },
  },
  modules: {
  },
  plugins: [
    createPersistedState()
  ],
})
