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
    import { mapActions, mapGetters } from 'vuex';
    import Header from './components/header/HeaderComponent';
    import UtilityBar from './components/header/utility_bar/UtilityBarComponent';

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
            UtilityBar
        }
    }
</script>