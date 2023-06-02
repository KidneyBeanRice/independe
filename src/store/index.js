import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state: {
    boardCheck: 0,
    independentCheck: 0,
    categoryCheck: 0,
<<<<<<< HEAD
    token: null
=======
    token: null,
>>>>>>> a2cf3ff495a6f94cb8afa3344e895599c744ffd6
  },
  getters: {
    getToken(state) {
      return state.token; // 토큰 값을 반환하는 게터
<<<<<<< HEAD
    }
=======
    },
>>>>>>> a2cf3ff495a6f94cb8afa3344e895599c744ffd6
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
<<<<<<< HEAD
    }
=======
    },
    removeToken(state) {
      state.token = null;
    },
>>>>>>> a2cf3ff495a6f94cb8afa3344e895599c744ffd6
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
<<<<<<< HEAD
    }
  },
  modules: {},
  plugins: [createPersistedState()]
});
=======
    },
    logout({ commit }) {
      commit('removeToken');
    },
  },
  modules: {},
  plugins: [createPersistedState()]
});
>>>>>>> a2cf3ff495a6f94cb8afa3344e895599c744ffd6
