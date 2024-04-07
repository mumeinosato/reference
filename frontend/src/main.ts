import './assets/style/main.css'
import './assets/style/tailwindcss/output.css'
import './assets/style/tailwindcss/tailwindcss.css'


import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'

import Alpine from 'alpinejs'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import hijsVuePlugin from '@highlightjs/vue-plugin'

const app = createApp(App)

const vuetify = createVuetify({
    components,
    directives,
})

const pinia = createPinia()
pinia.use(createPersistedState())

app.use(router)
app.use(vuetify)
app.use(hijsVuePlugin)
app.use(pinia)

app.mount('#app')

Alpine.start()