import { componentNames } from "#build/components";
import { jsx } from "vue/jsx-runtime";

export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@ant-design-vue/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    "nuxt-monaco-editor"
  ],

  build: {
    loaders: {
      scss: {
        additionalData: '@import "@/assets/styles/variables.scss";'
      },
      less: {
        lessOptions: {
          modifyVars: {
            'primary-color': '#14ace4',
            'font-family': '-apple-system, BlinkMacSystemFont, Meiryo, sans-serif',
          },
          javascriptEnabled: true,
        }
      }
    },
    transpile: ['prismjs']
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  router: {
    middleware: ['auth']
  },

  monacoEditor: { lang: 'ja' },

  compatibilityDate: '2024-07-27',
});