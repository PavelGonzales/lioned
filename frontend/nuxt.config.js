export default {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Читай! Переводи! Учись! | LIONED.ONLINE',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'google-site-verification', content: 'kBLXYl2ufhIawJsygl_IaFOdtO41_9K85nnSUHDpqdw' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  plugins: [
    '~/plugins/vuetify.js',
    '~/plugins/filters.js',
    {
      src: '~/plugins/virtualScroll.js',
      ssr: false
    },
    {
      src: '~/plugins/infinityScroll.js',
      ssr: false
    }
  ],
  modules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/google-analytics'
  ],
  'google-analytics': {
    id: 'UA-130310031-1'
  },
  workbox: {
    runtimeCaching: [
      {
        urlPattern: 'https://fonts.googleapis.com/.*',
        handler: 'cacheFirst',
        method: 'GET',
        strategyOptions: {cacheableResponse: {statuses: [0, 200]}}
      },
      {
        urlPattern: 'https://fonts.gstatic.com/.*',
        handler: 'cacheFirst',
        method: 'GET',
        strategyOptions: {cacheableResponse: {statuses: [0, 200]}}
      },
    ]
  },
  css: [
    '~/assets/style/app.styl',
    'vue-virtual-scroller/dist/vue-virtual-scroller.css'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#2196f3' },
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^vuetify/],
    babel: {
      plugins: [
        ['transform-imports', {
          'vuetify': {
            'transform': 'vuetify/es5/components/${member}',
            'preventFullImport': true
          }
        }]
      ]
    },
    extractCSS: true,
    /*
    ** Run ESLint on save
    */
    extend(config, {isDev}) {
      if (isDev && process.client) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
      if (process.server) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/]
          })
        ];
      }
    }
  }
};
