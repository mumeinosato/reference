import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Post from '../views/Post.vue'
import Preview from '../views/Preview.vue'
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
      path: '/preview/:id/:type',
      name: 'preview',
      component: Preview
    },
    {
      path: '/list/:lang/:type/:group',
      name: 'list',
      component: List
    }
  ]
})

export default router
