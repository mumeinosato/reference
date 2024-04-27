import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from "../assets/script/store"
import Home from '../views/Home.vue'
import Post from '../views/Post.vue'
import View from '../views/View.vue'
import Edit from '../views/Edit.vue'
import List from '../views/List.vue'
import Login from '../views/Login.vue'
import Board from '../views/Board.vue'
import Issue from '../views/github/Issue.vue'
import Post_issue from '../views/github/Post_issue.vue'
import Sign_up from '../views/Sign_up.vue'

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
      component: Post,
      meta: { requiresAuth: true }
    },
    {
      path: '/view/:id/:type',
      name: 'view',
      component: View,
      meta: { requiresAuth: true }
    },
    {
      path: '/edit/:id/:type',
      name: 'edit',
      component: Edit,
      meta: { requiresAuth: true }
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
      path: '/sign_up',
      name: 'sign_up',
      component: Sign_up
    },
    {
      path: '/board',
      name: 'board',
      component: Board,
      meta: { requiresAuth: true }
    },
    {
      path: '/issue',
      name: 'issue',
      component: Issue,
      meta: { requiresAuth: true }
    },
    {
      path: '/post_issue',
      name: 'post_issue',
      component: Post_issue,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const store = useStore()
  if(to.meta.requiresAuth && !store.getLogin()){
    next('/login')
  } else {
    next()
  }
});

export default router
