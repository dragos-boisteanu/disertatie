<template>
    <div class="h-screen flex flex-col" v-if="loaded"> 
        <vue-progress-bar></vue-progress-bar>
        <Notification :notification="getNotification" v-if="getNotification.show"/>
         <!-- <h1>current: {{$mq}}</h1>   -->
        <div class="block" v-if="mobile">
            <Header/>
            <UtilityBar/>
            <Breadcrumbs/>
        </div>
        <div class="flex flex-1">
            <div class="lg:flex-none lg:w-56 2xl:w-64" v-if="desktop">
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
    <div v-else class="w-full h-full flex items-center justify-center">
        <Spinner
            :size="90"
            :spacing="24"
            :line-size="7"
            :font-size="20"
            line-fg-color="#0084C7"
        ></Spinner>
    </div>
    
</template>
<script>
    import { mapActions, mapGetters } from 'vuex';
    import Header from './components/header/HeaderComponent';
    import UtilityBar from './components/header/utility_bar/UtilityBarComponent';
    import Navigation from './components/navigation/NavigationComponent';
    import Notification from './components/NotificationComponenet';

    import Spinner from 'vue-simple-spinner'

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
                    this.fetchCategories(),
                    this.fetchUnits(),
                    this.downloadLoggedUserData(),
                    this.downloadIngredients(),
                    this.downloadDiscounts(),
                    this.fetchDeliveryMethods(),
                    this.downloadOrderStatues(),
                ]);

                this.$Progress.finish()

                this.loaded = true;

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
            ...mapGetters('Notification', ['getNotification']),
            
            mobile() {
                return this.$mq === 'sm' || this.$mq === 'md' || this.$mq === 'lg';
            },

            desktop() {
                return this.$mq === 'xl' || this.$mq === 'xxl';
            }
        },

        data() {
            return{
                loaded: false
            }
        },

        methods: {
            ...mapActions('Categories', ['fetchCategories']),
            ...mapActions('Units', ['fetchUnits']),
            ...mapActions('Roles', ['fetchRoles']),
            ...mapActions('Notification', ['openNotification']),
            ...mapActions('Users', ['downloadLoggedUserData']),
            ...mapActions('Ingredients', ['downloadIngredients']),
            ...mapActions('Discounts', ['downloadDiscounts']),
            ...mapActions('DeliveryMethods', ['fetchDeliveryMethods']),
            ...mapActions('Orders', ['downloadOrderStatues']),
            
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
            Notification,
            Spinner
        }
    }
</script>