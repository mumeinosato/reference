import { defineNuxtRouteMiddleware, navigateTo } from '#app'
import { useStore } from '../stores/store'

export default defineNuxtRouteMiddleware((to) => {
    const store = useStore()
    if (!store.getLogin()) {
        return navigateTo('/login')
    }
})