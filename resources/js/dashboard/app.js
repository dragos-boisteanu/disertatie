require('../bootstrap');

import Vue from 'vue';

import App from './App.vue';

import router from './router'
import store from './store'

import VueBreadcrumbs from 'vue-2-breadcrumbs';
import Breadcrumbs from './components/Breadcrumbs.vue';

import dayjs from 'dayjs';

Vue.use(VueBreadcrumbs, Breadcrumbs);

Vue.filter("formatDate", date => {
  if (!date){
      return null;
  }
  return dayjs(date).format('DD/MM/YYYY HH:mm');
})

new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
  
  
