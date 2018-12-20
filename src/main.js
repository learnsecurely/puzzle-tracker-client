//import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import App from './App'
import router from './router'
import Amplify from 'aws-amplify'
import aws_exports from './aws-exports.js'
import { components } from 'aws-amplify-vue'
import store from './store/store.js'
import VueMarkdown from 'vue-markdown'

Vue.config.productionTip = false
Amplify.configure(aws_exports)
Vue.use(VueMarkdown);

// It's important that you instantiate the Vue instance after calling Vue.use!
new Vue({
  el: '#app',
  router: router,
  template: '<App/>',
  store: store,
  VueMarkdown,
  components: {
    App,
    components,
  }
})
//new Vue({
//  render: h => h(App)
//}).$mount('#app')