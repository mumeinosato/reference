import { jsx } from "vue/jsx-runtime";

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@ant-design-vue/nuxt',
    '@pinia/nuxt'
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
    }
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
});
