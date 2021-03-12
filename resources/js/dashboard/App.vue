<template>
    <div class="h-full flex flex-col">   
        <div>
            <Header/>
            <UtilityBar/>
            <Breadcrumbs/>
        </div>

        <router-view></router-view>
    </div>
</template>
<script>
    import httpClient from './api/httpClient';
    import Header from './components/header/HeaderComponent';
    import UtilityBar from './components/header/utility_bar/UtilityBarComponent';

    export default {
        methods: {
           
        },
        components: {
            Header,
            UtilityBar
        }
    }
</script>

<style>

    a.router-link-active.router-link-exact-active {
        @apply text-orange-700;
    }
</style>