import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './store';
import axios from 'axios';

import ElementUI from 'element-ui';
import '@/styles/element-variables.scss';

Vue.use(ElementUI, { size: 'small', zIndex: 3000 });

Vue.prototype.$http = axios.create({
  timeout: 30 * 1000,
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
