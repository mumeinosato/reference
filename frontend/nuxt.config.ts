import { jsx } from "vue/jsx-runtime";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  pages: true,
  modules: ['@nuxtjs/tailwindcss', "@ant-design-vue/nuxt"],
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
    }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})