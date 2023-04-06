import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import BoardView from '../views/BoardView.vue'
import IndependentView from '../views/IndependentView.vue'
import PostWriteView from '../views/PostWriteView.vue'
import PostView from '../views/PostView.vue'

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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router

// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
// component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')