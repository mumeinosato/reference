import './assets/style/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Alpine from 'alpinejs'

const app = createApp(App)

app.use(router)

app.mount('#app')

window.Alpine = Alpine
Alpine.start()