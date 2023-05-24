import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { VueCookies } from 'vue-cookies';

export default createStore({
  state: {
    boardCheck: 0,
    independentCheck: 0,
    categoryCheck: 0,
    token: null,
    urlCookie: null,
    authCookie: null
  },
  getters: {
    getToken(state) {
      return state.token; // 토큰 값을 반환하는 게터
    },
    getUrlCookie(state) {
      return state.urlCookie
    },
    getAuthCookie(state) {
      return state.authCookie
    }
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
      VueCookies.set('token', token); // 쿠키에 토큰 저장
    },
    setAuthCookie(state, authCookie) {
      state.authCookie = authCookie; // 쿠키 값을 상태에 저장하는 뮤테이션
      VueCookies.set('authCookie', authCookie); // 쿠키에 인증 쿠키 저장
    },
    setUrlCookie(state, urlCookie) {
      state.urlCookie = urlCookie; // 쿠키 값을 상태에 저장하는 뮤테이션
      VueCookies.set('urlCookie', urlCookie); // 쿠키에 URL 쿠키 저장
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
    saveUrlCookie({ commit }, urlCookie) {
      commit('setUrlCookie', urlCookie); // URL 쿠키 값을 저장하는 액션
    },
    saveAuthCookie({ commit }, authCookie) {
      commit('setAuthCookie', authCookie); // 인증 쿠키 값을 저장하는 액션
    }
  },
  modules: {},
  plugins: [createPersistedState()]
});