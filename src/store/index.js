import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state: {
    boardCheck: 0,
    independentCheck: 0,
    categoryCheck: 0,
    token: null,
  },
  getters: {
    getToken(state) {
      return state.token; // 토큰 값을 반환하는 게터
    },
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
    setToken(state, token) {
      state.token = token; // 토큰 값을 상태에 저장하는 뮤테이션
    },
    removeToken(state) {
      state.token = null;
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
    saveToken({ commit }, token) {
      commit('setToken', token); // 토큰 값을 저장하는 액션
    },
    logout({ commit }) {
      commit('removeToken');
    },
  },
  modules: {},
  plugins: [createPersistedState()]
});