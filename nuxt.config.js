export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'PersonalSite',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Aaron Elijah Personal Site',
      },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // The env property defines environment variables that should be available on the client side: https://nuxtjs.org/docs/configuration-glossary/configuration-env
  env: {
    routerBase: process.env.NODE_ENV === 'production' ? '/personal-site/' : '/',
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // CSS file in the project
    '~/assets/global.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Import components and subdirs: https://go.nuxtjs.dev/config-components
  components: {
    dirs: ['~/components', '~/components/atoms', '~/components/compounds'],
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://www.npmjs.com/package/@nuxtjs/fontawesome
    '@nuxtjs/fontawesome',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: { transpile: ['three'] },

  target: 'static', // default is 'server'

  router: {
    base: process.env.NODE_ENV === 'production' ? '/personal-site/' : '/',
  },

  // Font Awesome configuration
  fontawesome: {
    component: 'FaIcon',
    suffix: false,
    icons: {
      solid: ['faFire', 'faPlus', 'faChartPie', 'faHatWizard', 'faBiohazard'],
    },
  },
}
