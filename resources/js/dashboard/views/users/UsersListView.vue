<template>
   <ViewContainer>
       <template slot="header">
           Users List
       </template>

      <ul class="">
            <li v-for="user in getUsers" :key="user.id">
                {{user.id}} - {{ user.name }}
            </li>
      </ul>
   </ViewContainer>
</template>

<script>
    import ViewContainer from '../ViewContainer';
    import store from '../../store/index';
    import { mapGetters } from 'vuex';

    export default {
        async beforeRouteEnter (to, from, next) {
            console.log(store.getters['Users/getUsers'].length)
            if(store.getters['Users/getUsers'].length === 0) {
                await store.dispatch('Users/fetchUsers', 1);
                next();
            } else {
                
                next();
            }
             
        },

        computed: {
            ...mapGetters('Users', ['getUsers']),
        },

        data() {
            return {
                
            }
        },

        methods: {
           
        },  

        components: {
            ViewContainer
        }
    }
</script>