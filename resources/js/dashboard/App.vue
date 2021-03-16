<template>
    <div class="h-full flex flex-col ">   
        <div class="block lg:hidden">
            <Header/>
            <UtilityBar/>
            <Breadcrumbs/>
        </div>
        <div class="flex flex-1">
            <div class="hidden lg:block lg:flex-auto lg:w-52">
                <Navigation/>
            </div>
            <div class="flex flex-col w-full">
                <div class="hidden lg:block">  
                    <Header/> 
                    <UtilityBar/>
                    <Breadcrumbs/>
                </div>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapActions, mapGetters } from 'vuex';
    import Header from './components/header/HeaderComponent';
    import UtilityBar from './components/header/utility_bar/UtilityBarComponent';
    import Navigation from './components/navigation/NavigationComponent';

    export default {
        async mounted() {
            if(this.getRoles.length === 0) {
                await this.downloadRoles();
            }
            
        },

        computed: {
            ...mapGetters('Roles', ['getRoles']),
        },

        methods: {
            ...mapActions('Roles', ['fetchRoles']),

            async downloadRoles() {
                try {
                    await this.fetchRoles();
                } catch (error) {
                    console.log(error)
                }
            }
        },
        components: {
            Header,
            UtilityBar,
            Navigation
        }
    }
</script>