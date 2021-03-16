require('../bootstrap');

import Vue from 'vue';

import App from './App.vue';

import VueMq from 'vue-mq'

import router from './router'
import store from './store'

import VueBreadcrumbs from 'vue-2-breadcrumbs';
import Breadcrumbs from './components/Breadcrumbs.vue';

import dayjs from 'dayjs';

Vue.use(VueBreadcrumbs, Breadcrumbs);
Vue.use(VueMq, {
  breakpoints: { // default breakpoints - customize this
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    xxl: 1536
  },
  defaultBreakpoint: 'sm' // customize this for SSR
})

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
  
  
