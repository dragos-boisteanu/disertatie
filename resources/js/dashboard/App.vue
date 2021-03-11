<template>
    <div>
        <h1>Vue Router Demo App</h1>

        <router-view></router-view>
        <button @click="test">
            GET
        </button>
    </div>
</template>
<script>
    import httpClient from './api/httpClient';

    export default {
        methods: {
            async test() {
                try {
                    await httpClient.get('/users/1', {name: 'test'});
                } catch ( error ) {
                    console.log(error)
                }
            }
        }
    }
</script>