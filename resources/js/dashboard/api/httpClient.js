import axios from 'axios';

const httpClient = axios.create({
    baseURL: 'http://disertatie.test/api',
    timeout: 60000, // indicates, 1000ms ie. 1 second
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    }
});

export default httpClient;