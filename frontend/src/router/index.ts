import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Post from '../views/Post.vue'
import View from '../views/View.vue'
import Edit from '../views/Edit.vue'
import List from '../views/List.vue'

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
    }
  ]
})

export default router
