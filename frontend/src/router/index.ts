import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Post from '../views/Post.vue'
import Preview from '../views/Preview.vue'

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
      path: '/preview/:lang/:type/:group/:num',
      name: 'preview',
      component: Preview
    }
  ]
})

export default router
