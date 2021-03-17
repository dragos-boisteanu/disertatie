<template>
    <div class="absolute lg:relative left-0 top-0 w-3/4 lg:w-full h-full bg-gray-900" >
        <div class="h-8">
            <img alt="site-logo"/>
        </div>
        <div class="h-6">
            user dropdown
        </div> 
        <ul class="navigation-link">
            <NavigationLink name="Dashboard"/>
            <NavigationLink name="Users"/>
            <NavigationLink name="CreateUser"/>
            <NavigationLink name="Orders"/>
            <NavigationLink name="Products"/>
            <NavigationLink name="Stocks"/>
            <NavigationLink name="Locations"/>
        </ul>
        <form method="POST" action='/logout'>
            <input type="hidden" name="_token" :value="csrf"/>

            <button class="text-white">
                Logout
            </button>
        </form>
    </div>
</template>

<script>
    import NavigationLink from './NavigationLinkComponent';
    
    export default {
        data() {
            return {
                csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            }
        },

        components: {
            NavigationLink
        }
    }
</script>