<<<<<<< HEAD
// import { createRouter, createWebHistory } from 'vue-router'
// import MainView from '../views/MainView.vue'
// import BoardView from '../views/BoardView.vue'
// import IndependentView from '../views/IndependentView.vue'
// import PostWriteView from '../views/PostWriteView.vue'
// import PostView from '../views/PostView.vue'
// import LoginView from '../views/LoginView.vue'
// import SignUpView from '../views/SignUpView.vue'

// const routes = [
//   {
//     path: '/',
//     name: 'MainView',
//     component: MainView
//   },
//   {
//     path: '/board/:regionType/:regionPostType',
//     name: 'BoardView',
//     component: BoardView
//   },
//   {
//     path: '/independent/:independentType',
//     name: 'IndependentView',
//     component: IndependentView
//   },
//   {
//     path: '/PostWrite',
//     name: 'PostWriteView',
//     component: PostWriteView
//   },
//   {
//     path: '/posts/:postId',
//     name: 'PostView',
//     component: PostView
//   },
//   {
//     path: '/login',
//     name: 'LoginView',
//     component: LoginView
//   },
//   {
//     path: '/signup',
//     name: 'SignUpView',
//     component: SignUpView
//   }
// ]

// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes
// })

// export default router

// // route level code-splitting
// // this generates a separate chunk (about.[hash].js) for this route
// // which is lazy-loaded when the route is visited.
// // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')

import { createRouter, createWebHashHistory } from 'vue-router';
=======
import { createRouter, createWebHistory } from 'vue-router';
>>>>>>> a2cf3ff495a6f94cb8afa3344e895599c744ffd6
import MainView from '../views/MainView.vue';
import BoardView from '../views/BoardView.vue';
import IndependentView from '../views/IndependentView.vue';
import PostWriteView from '../views/PostWriteView.vue';
import PostView from '../views/PostView.vue';
import LoginView from '../views/LoginView.vue';
import SignUpView from '../views/SignUpView.vue';
<<<<<<< HEAD
=======
import SearchView from '../views/SearchView.vue';
>>>>>>> a2cf3ff495a6f94cb8afa3344e895599c744ffd6

const routes = [
  {
    path: '/',
    name: 'MainView',
    component: MainView
  },
  {
    path: '/board/:regionType/:regionPostType',
    name: 'BoardView',
    component: BoardView
  },
  {
    path: '/independent/:independentType',
    name: 'IndependentView',
    component: IndependentView
  },
  {
    path: '/PostWrite',
    name: 'PostWriteView',
    component: PostWriteView
  },
  {
    path: '/posts/:postId',
    name: 'PostView',
    component: PostView
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'SignUpView',
    component: SignUpView
  },
  {
    path: '/search',
    name: 'SearchView',
    component: SearchView
  }
];

const router = createRouter({
<<<<<<< HEAD
  history: createWebHashHistory(),
=======
  history: createWebHistory(),
>>>>>>> a2cf3ff495a6f94cb8afa3344e895599c744ffd6
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = checkIfAuthenticated(); // 인증 여부 확인 (토큰 유효성 검사 등)

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ path: '/login', query: { redirect: to.fullPath } });
    } else {
      next();
    }
  } else {
    next();
  }
});

// 토큰의 유효성을 검사하는 함수 추가
function checkIfAuthenticated() {
  // 토큰 유효성 검사 로직 구현
  // 예: const token = localStorage.getItem('token');
  //     return token !== null && token !== undefined;
<<<<<<< HEAD
  const token = localStorage.getItem('token');
  return token !== null && token !== undefined;
=======
  return false; // 예시로 기본값 false 설정
>>>>>>> a2cf3ff495a6f94cb8afa3344e895599c744ffd6
}

export default router;
