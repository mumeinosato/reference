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

import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

self.MonacoEnvironment = {
    getWorker(moduleId, label) {
      if (label === 'json') {
        return new jsonWorker();
      }
      if (label === 'css' || label === 'scss' || label === 'less') {
        return new cssWorker();
      }
      if (label === 'html' || label === 'handlebars' || label === 'razor') {
        return new htmlWorker();
      }
      // TypeScript and JavaScript workers
      if (label === 'typescript' || label === 'javascript') {
        return new tsWorker();
      }
      return new editorWorker();
    },
  };

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