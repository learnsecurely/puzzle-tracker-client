//import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import App from './App'
import router from './router'
import Amplify from 'aws-amplify'
import aws_exports from './aws-exports.js'
import { components } from 'aws-amplify-vue'
import store from './store/store.js'
import VueMarkdown from 'vue-markdown'
import VueConfetti from 'vue-confetti'
import VModal from 'vue-js-modal'
import * as Sentry from '@sentry/browser'

Vue.config.productionTip = false
Amplify.configure(aws_exports)
Vue.use(VueMarkdown);
Vue.use(VueConfetti)
Vue.use(VModal)

// It's important that you instantiate the Vue instance after calling Vue.use!
new Vue({
  el: '#app',
  router: router,
  template: '<App/>',
  store: store,
  VueMarkdown,
  VueConfetti,
  VModal,
  components: {
    App,
    ...components
  }
})
//new Vue({
//  render: h => h(App)
//}).$mount('#app')

Sentry.init({
  dsn: 'https://dbdbe8d20c78422ab195bbc91e78f50d@sentry.io/1402419',
  integrations: [new Sentry.Integrations.Vue({ 
    Vue,
    attachProps: true
  })]
})