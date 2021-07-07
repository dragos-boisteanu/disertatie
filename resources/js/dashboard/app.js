require('../bootstrap');

import Vue from 'vue';
import App from './App.vue';

import router from './router'
import store from './store'

import VueProgressBar from 'vue-progressbar'
import VueBreadcrumbs from 'vue-2-breadcrumbs';
import Breadcrumbs from './components/Breadcrumbs.vue';

import ClickOutside from './directives/ClickOutside';

import VueMq from 'vue-mq'

import dayjs from 'dayjs';
import 'vue2-datepicker/index.css';

import Vuelidate from 'vuelidate'

import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

const toastOptions = {
    // You can set your default options here
};


Vue.use(Toast, toastOptions);

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

const options = {
  color: '#119b13',
  failedColor: '#ce0810',
  thickness: '4px',
  transition: {
    speed: '0.2s',
    opacity: '0.9s',
    termination: 300
  },
  autoRevert: true,
  autoFinish: false,
  location: 'top',
  inverse: false
}

Vue.use(VueProgressBar, options)

Vue.directive('click-outside', ClickOutside);

new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
  
  
