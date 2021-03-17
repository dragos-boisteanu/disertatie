require('../bootstrap');

import Vue from 'vue';

import App from './App.vue';

import VueMq from 'vue-mq'

import router from './router'
import store from './store'

import VueBreadcrumbs from 'vue-2-breadcrumbs';
import Breadcrumbs from './components/Breadcrumbs.vue';

import dayjs from 'dayjs';

import { ValidationProvider, extend } from 'vee-validate';
import {ValidationObserver } from 'vee-validate'
import { required, alpha_spaces,  max, email } from 'vee-validate/dist/rules';
import { setInteractionMode } from 'vee-validate';

setInteractionMode('eager');

extend('required', required );
extend('email', email);
extend('alpha_spaces', alpha_spaces);
extend('max', max);

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

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
  
  
