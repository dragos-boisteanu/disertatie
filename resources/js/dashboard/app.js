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
import { required, alpha_spaces, min, max, email, integer, double, digits, alpha_num, max_value } from 'vee-validate/dist/rules';
import { setInteractionMode } from 'vee-validate';

setInteractionMode('eager');

extend('required', {
    ...required,
    message: 'The {_field_} field is required.'
});

extend('integer', {
    ...integer,
    message: 'The {_field_} must be an integer'
});

extend('double', {
  ...double,
  message: 'The {_field_} must be an double with 2 decimals separated by comma'
});

extend('digits', {
  ...digits,
  message: 'The {_field_} must be an integer with 2 digits'
})

extend('email', {
    ...email,
    message: 'The {_field_} must be a valid email address.'
});

extend('alpha_spaces', {
    ...alpha_spaces,
    message: 'The {_field_} must only contain letters.'
});

extend('alpha_num', {
  ...alpha_num,
  message: 'The {_field_} must only contain letters and numbers'
});


extend('max', {
    ...max,
    message: 'The {_field_} must not be greater than {length} characters.',
    params: ['length']
});

extend('min', {
    ...min,
    message: 'The {_field_} must not be shorter than {length} character',
    params: ['length']
})

// extend('max_value', {
//     ...max_value,
//     message: 'The {_field_} value must not be greater than {max_value}',
//     params: ['max_value'],
// })

extend('max_value', {
    validate(value, { max }) {
        return value <= max;
    },
    params: ['max'],
    message: 'The {_field_} value must not be greater than {max}',
  });
  

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
  
  
