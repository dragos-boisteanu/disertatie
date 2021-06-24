require('../bootstrap');


Vue.component('init-cart-component', require('./components/cart/InitCartComponent').default);

Vue.component('add-to-cart-btn-component', require('./components/product/AddToCartBtnComponent.vue').default);
Vue.component('mobile-cart-button-component', require('./components/cart/MobileCartButtonComponent.vue').default);
Vue.component('mobile-cart-component',  require('./components/cart/MobileCartComponent.vue').default);

import Vue from 'vue';

import store from './store'

// import ClickOutside from './directives/ClickOutside';

import VueMq from 'vue-mq'

import dayjs from 'dayjs';
import 'vue2-datepicker/index.css';

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

// Vue.directive('click-outside', ClickOutside);
const app = new Vue({
  el: '#store-app',    
  store
});


