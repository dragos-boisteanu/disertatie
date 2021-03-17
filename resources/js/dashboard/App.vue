<template>
    <div class="h-full flex flex-col "> 
         <!-- <h1>current: {{$mq}}</h1>   -->
        <div class="block" v-if="mobile">
            <Header/>
            <UtilityBar/>
            <Breadcrumbs/>
        </div>
        <div class="flex flex-1">
            <div class="xl:flex-auto xl:w-52" v-if="desktop">
                <Navigation/>
            </div>
            <div class="flex flex-col w-full">
                <div v-if="desktop">  
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

            if(this.getCounties.length === 0) {
                await this.fetchCounties();
            }
            
        },

        computed: {
            ...mapGetters('Roles', ['getRoles']),
            ...mapGetters('Counties', ['getCounties']),

            mobile() {
                return this.$mq === 'sm' || this.$mq === 'md' || this.$mq === 'lg';
            },

            desktop() {
                return this.$mq === 'xl' || this.$mq === 'xxl';
            }

        },

        methods: {
            ...mapActions('Roles', ['fetchRoles']),
            ...mapActions('Counties', ['fetchCounties']),

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