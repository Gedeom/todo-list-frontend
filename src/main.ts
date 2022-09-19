import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'
import router from './router'
import store from './store'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import mixin from './mixins/index'
Vue.use(VueSweetalert2);

new Vue({
  mixins: [mixin],
  vuetify,
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
