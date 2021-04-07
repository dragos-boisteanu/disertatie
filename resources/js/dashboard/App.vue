<template>
    <div class="h-screen flex flex-col"> 
        <vue-progress-bar></vue-progress-bar>
        <Notification :notification=getNotification v-if="getNotification.show"/>
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
    import Notification from './components/NotificationComponenet';

    export default {

        async created() {            
            try {
                this.$Progress.start()
                
                this.$router.beforeEach((to, from, next) => {
                    this.$Progress.start()
                    next();
                })

                this.$router.afterEach((to, from) => {
                    this.$Progress.finish()
                })
            } catch ( error ) {
                this.$Progress.fail()
                this.openNotification({
                    type: 'error',
                    message: 'Something went wrong !',
                    show: true
                });
            }
        },

        async mounted() {
            try {
                
                await Promise.all([
                    this.downloadRoles(),
                    this.fetchCounties(),
                    this.fetchCategories(),
                    this.fetchUnits(),
                    this.downloadLoggedUserData(),
                    this.downloadIngredients()
                ]);

                this.$Progress.finish()

            } catch ( error ) {
                this.$Progress.fail()
                this.openNotification({
                    type: 'error',
                    message: 'Something went wrong. Refresh the page !',
                    show: true
                });
            }
        },

        computed: {
            ...mapGetters('Roles', ['getRoles']),
            ...mapGetters('Units', ['getUnits']),
            ...mapGetters('Counties', ['getCounties']),
            ...mapGetters('Categories', ['getCategories']),
            ...mapGetters('Ingredients', ['getIngredients']),
            ...mapGetters('Notification', ['getNotification']),
            
            mobile() {
                return this.$mq === 'sm' || this.$mq === 'md' || this.$mq === 'lg';
            },

            desktop() {
                return this.$mq === 'xl' || this.$mq === 'xxl';
            }
        },

        methods: {
            ...mapActions('Categories', ['fetchCategories']),
            ...mapActions('Units', ['fetchUnits']),
            ...mapActions('Roles', ['fetchRoles']),
            ...mapActions('Counties', ['fetchCounties']),
            ...mapActions('Notification', ['openNotification']),
            ...mapActions('Users', ['downloadLoggedUserData']),
            ...mapActions('Ingredients', ['downloadIngredients']),
            
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
            Navigation,
            Notification
        }
    }
</script>