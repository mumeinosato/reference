import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Post from '../views/Post.vue'
import View from '../views/View.vue'
import Edit from '../views/Edit.vue'
import List from '../views/List.vue'
import Login from '../views/Login.vue'
import Board from '../views/Board.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/post',
      name: 'post',
      component: Post
    },
    {
      path: '/view/:id/:type',
      name: 'view',
      component: View
    },
    {
      path: '/edit/:id/:type',
      name: 'edit',
      component: Edit
    },
    {
      path: '/list/:lang/:type/:group',
      name: 'list',
      component: List
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/board',
      name: 'board',
      component: Board
    }
  ]
})

export default router
