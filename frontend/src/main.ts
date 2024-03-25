import './assets/style/main.css'
import './assets/style/tailwindcss/output.css'
import './assets/style/tailwindcss/tailwindcss.css'


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import Alpine from 'alpinejs'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const app = createApp(App)

const vuetify = createVuetify({
    components,
    directives,
})

app.use(router)
app.use(vuetify)

app.mount('#app')

Alpine.start()