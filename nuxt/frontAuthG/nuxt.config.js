export default {
  mode: "universal",

  target: "server",
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'frontAuthG',
    htmlAttrs: {
      lang: 'fr',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/apiLogic.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios', '@nuxtjs/auth'],

  auth: {
    redirect: {
      login: "/login", // User will be redirected to this path if login is required.
      home: "/", // User will be redirect to this path after login. (rewriteRedirects will rewrite this path)
      logout: "/login", // User will be redirected to this path if after logout, current route is protected.
      user: "/user",
      callback: "/"
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "/login",
            method: "post",
            propertyName: "token"
          },
          logout: { url: "/logout", method: "post" },
          user: { url: "/user", method: "get", propertyName: "user" }
        },
        tokenRequired: false,
        tokenType: false
      }
    }
  },
  axios: {
    baseURL: "http://localhost:5000/",
    credentials: true,
    init(axios) {
      axios.defaults.withCredentials = true;
    }
  },
  build: {}
}
