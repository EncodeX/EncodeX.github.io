import Vue from 'vue';
import Router from 'vue-router';

// router configuration
import Home from './components/Home.vue';
import About from './components/About.vue';

// app component
import App from './App.vue';

const routes = [{
  path: '/',
  redirect: {
    name: 'home',
  },
}, {
  path: '/home',
  component: Home,
  name: 'home',
}, {
  path: '/about',
  component: About,
  name: 'about',
}];

Vue.use(Router);
const router = new Router({ routes });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router,
});
