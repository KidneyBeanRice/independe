import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import BoardView from '../views/BoardView.vue'

const routes = [
  {
    path: '/',
    name: 'MainView',
    component: MainView
  },
  {
    path: '/board',
    name: 'BoardView',
    component: BoardView
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