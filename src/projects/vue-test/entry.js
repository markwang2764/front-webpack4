import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './router';
import axios from 'axios';
Vue.prototype.$http = axios;

Vue.use(VueRouter);
const router = new VueRouter({routes: routes});
var vm = new Vue({
  router,
}).$mount('#app');


