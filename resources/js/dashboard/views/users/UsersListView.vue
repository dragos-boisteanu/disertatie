<template>
   <ViewContainer>
       <template slot="header">
           Users List
       </template>

       <button class="w-full py-1 text-base text-white bg-green-600 rounded-sm active:shadow-inner active:bg-green-500">
           Filter
       </button>

      <ul class="w-full mt-3 pt-3 border-t border-gray-100">
            <li v-for="user in getUsers" :key="user.id" class="p-2 rounded text-sm shadow-sm border-b-4 border-fuchsia-600 hover:shadow-md">
                <router-link :to="{name: 'User', params:{id:1}}">
                    <div class="w-full flex justify-start items-center pb-1 border-b border-gray-100">
                        <div class="w-16 h-16 mr-4 bg-gray-500 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="64px" height="64px"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
                            <!-- <img class="w-full h-full"/> -->
                        </div>
                        <div class="flex-1">
                            <div class="capitalize text-base font-semibold">
                               <span>{{ user.first_name}}</span>  <spab>{{user.name}}</spab>
                            </div>
                            <div class="font-medium">
                               {{ user.email}}
                            </div>
                            <div class="mt-1 text-xs">
                               {{ user.phone_number}}
                            </div>
                        </div>
                        <div>
                            <div class="text-xs font-semibold">
                                #{{user.id}}
                            </div>
                            <div class="py-1 px-2 mt-2 text-xs text-white rounded-sm bg-green-500">
                                active
                            </div>
                        </div>
                    </div>
                    <div class="mt-1">
                        <div class="flex justify-between items-center">
                            <div>
                                <span>
                                    20
                                </span>
                                <span class="font-semibold">
                                    orders
                                </span>
                            </div>
                            <div>
                                <span>
                                    12
                                </span>
                                <span class="font-semibold">
                                    reservation
                                </span>
                            </div>
                        </div>
                        <div class="mt-2 flex justify-between items-center">
                            <div>
                                <span class="font-semibold">
                                    Joined on:
                                </span>
                                <span class="text-xs">
                                    {{ user.created_at | formatDate }}
                                </span>
                            </div>
                            <div class="py-1 px-2 mt-1 text-xs text-white rounded-sm bg-lightBlue-600">
                                role
                            </div>
                        </div>
                    </div>
                </router-link>
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