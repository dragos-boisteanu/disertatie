require('../bootstrap');

import Vue from 'vue';

import App from './App.vue';

import router from './router'
import store from './store'

import VueBreadcrumbs from 'vue-2-breadcrumbs';
import Breadcrumbs from './components/Breadcrumbs.vue';

Vue.use(VueBreadcrumbs, Breadcrumbs);


new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
  
  
