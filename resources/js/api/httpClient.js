import axios from 'axios';
import Vue from 'vue';

const httpClient = axios.create({
  baseURL: 'http://disertatie.test/api',
  // baseURL: 'http://disertatie-app.herokuapp.com/api',
  timeout: 60000, // indicates, 1000ms ie. 1 second
  withCredentials: true,
  headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
  }
});

const requestInterceptor = (config) => {
  Vue.prototype.$Progress.start();
  return config;
};
  
  // interceptor to catch errors
const errorInterceptor = (error) => {
  if (!error.response) {
    Vue.prototype.$Progress.fail();
    return Promise.reject(error);
  }

  switch (error.response.status) {
  case 404:
      Vue.prototype.$Progress.fail();
      console.error(error.response.status, error.message);
      break;

  case 401: // authentication error, logout the user
      Vue.prototype.$Progress.fail();
      // notify.warn( 'Please login again', 'Session Expired');
      // localStorage.removeItem('token');
      // router.push('/auth');
      break;

  default:
      Vue.prototype.$Progress.fail();
      console.error(error.response.status, error.message);
  }
  return Promise.reject(error);
};

const responseInterceptor = (response) => {
  switch (response.status) {
  case 200:
      Vue.prototype.$Progress.finish();
      break;
  default:
      Vue.prototype.$Progress.finish();

    // default case
  }

  return response;
};
  
httpClient.interceptors.request.use(requestInterceptor);
httpClient.interceptors.response.use(responseInterceptor, errorInterceptor);

export default httpClient;