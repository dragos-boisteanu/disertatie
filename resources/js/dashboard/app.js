require('../bootstrap');

import Vue from 'vue';

import App from './App.vue';

import VueMq from 'vue-mq'

import router from './router'
import store from './store'

import VueBreadcrumbs from 'vue-2-breadcrumbs';
import Breadcrumbs from './components/Breadcrumbs.vue';

import dayjs from 'dayjs';

import { ValidationProvider } from 'vee-validate';
import { ValidationObserver } from 'vee-validate'

import Vuelidate from 'vuelidate'

import './validators';

import 'vue2-datepicker/index.css';


Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

Vue.use(Vuelidate)

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


import VueProgressBar from 'vue-progressbar'

const options = {
  color: '#119b13',
  failedColor: '#ce0810',
  thickness: '4px',
  transition: {
    speed: '0.2s',
    opacity: '0.7s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}


Vue.use(VueProgressBar, options)






new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
  
  
