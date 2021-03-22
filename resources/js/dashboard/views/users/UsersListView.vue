<template>
   <ViewContainer>
        <UsersFilter
            v-if="showFilterState"
            @closed="toggleFilterState"
        />

        <template slot="header">
           Users List
        </template>

        <div class="flex flex-col md:flex-row md:justify-between items-end">
            <div class="w-full md:flex md:flex-row md:gap-3 md:items-center">
                <button 
                    class="w-full py-1 text-base text-white bg-green-600 rounded-sm active:shadow-inner active:bg-green-500 md:w-20"
                    @click="toggleFilterState"
                    >
                    Filter
                </button>
                <button 
                    class="w-full py-1 mt-2  text-base text-white bg-lightBlue-600 rounded-sm active:shadow-inner active:bg-lightBlue-500 md:w-20 md:mt-0" 
                    @click="refreshUsersList">
                    Refresh
                </button>
            </div>
        
            <select  
                @change="order"
                v-model="orderBy"
                class="w-full p-1 mt-2 text-base border-gray-300 border rounded-sm md:w-auto">
                <option :value="1">Name asc</option>
                <option :value="2">Name desc</option>
                <option :value="3">First Name asc</option>
                <option :value="4">First Name desc</option>
                <option :value="5">Email asc</option>
                <option :value="6">Email desc</option>
                <option :value="7">Role asc</option>
                <option :value="8">Role desc</option>
                <option :value="9">Orders asc</option>
                <option :value="10">Orders desc</option>
                <option :value="11">Reservations asc</option>
                <option :value="12">Reservations desc</option>
                <option :value="13">Joined at asc</option>
                <option :value="14">Joined at desc</option>
            </select>
        </div>
      <!-- xl:w-375px -->
        <ul class="w-full mt-3 border-t border-gray-200 md:flex md:flex-wrap md:justify-between lg:justify-start lg:gap-x-4">
            <li v-for="user in getUsers" :key="user.id" class="w-full p-2 mt-4 rounded text-sm shadow-sm  hover:shadow-md bg-white md:w-49 lg:w-350px xl:w-375px 2xl:w-400px">
                <router-link :to="{name: 'User', params:{id:user.id}}">
                    <div class="w-full flex justify-start items-center pb-1 border-b border-gray-100">
                        <div class="w-12 h-12 mr-4 bg-gray-500 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="48px" height="48px"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
                        </div>
                        <div class="flex-1">
                            <div class="capitalize font-semibold">
                               <span>{{ user.firstName}}</span> <span>{{user.name}}</span>
                            </div>
                            <div class="font-light">
                               {{ user.email}}
                            </div>
                            <div class="mt-1 text-xs">
                               {{ user.phoneNumber}}
                            </div>
                        </div>
                        <div>
                            <div class="text-xs font-semibold">
                                #{{user.id}}
                            </div>
                            <div class="mt-2">
                                <Status :deleted-at="user.deletedAt"/>
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
                                    {{ user.createdAt | formatDate }}
                                </span>
                            </div>
                            <Role :roleId="user.roleId"/>
                        </div>
                    </div>
                </router-link>
            </li>
      </ul>
      
      <div class="mt-5 text-center md:text-right" v-if="showMoreState">
            <button 
                class="w-full py-1 mt-2 text-base text-white bg-lightBlue-600 rounded-sm active:shadow-inner active:bg-lightBlue-500 md:w-28" 
                @click="loadMoreUsers">
                Load more
            </button>
      </div>
      
   </ViewContainer>
</template>

<script>
    import store from '../../store/index';

    import { mapGetters, mapActions } from 'vuex';

    import ViewContainer from '../ViewContainer';
    import Status from '../../components/StatusComponent';
    import Role from '../../components/users/RoleComponent';
    import UsersFilter from '../../components/filter/UsersFilterComponent';
    

    export default {
        async beforeRouteEnter (to, from, next) {
            if(store.getters['Users/getUsers'].length === 0) {
                const query = to.query
                query.page = 1;
    
                await store.dispatch('Users/fetchUsers', query);
                next();
            } else {
                next();
            }
        },

        computed: {
            ...mapGetters('Users', ['getUsers', 'getNextPage']),

            showMoreState() {
                return this.getNextPage ? true : false;
            }
        },

        data() {
            return {
                showFilterState: false,
                orderBy: 14,
            }
        },

        methods: { 
            ...mapActions('Users', ['refreshUsers', 'fetchUsers', 'sortUsersList']),
            ...mapActions('Notification', ['openNotification']),

            async loadMoreUsers() {
                try {
                    const query = this.$route.query;
                    query.page = this.getNextPage,
                    query.orderBy = this.orderBy
        
                    await this.fetchUsers(query)

                    this.order();
                    
                    this.openNotification({
                        type:'ok',
                        message: 'Done',
                        show: true
                    })
                } catch ( error ) {
                    console.log(error)
                }
            },

            async refreshUsersList() {
                try {
                    if(Object.keys(this.$route.query).length > 0) { 
                        this.$router.replace({name:'Users', query: {}});
                    }
                    
                    await this.refreshUsers();
                    this.orderBy = 14;
                    this.openNotification({
                        type:'ok',
                        message: 'Done',
                        show: true
                    })
                } catch ( error ) {
                    console.log(error);
                }
            },

            order() {
                this.sortUsersList(this.orderBy);
            },

            toggleFilterState() {
                this.showFilterState = !this.showFilterState;
            }
        },  

        components: {
            ViewContainer,
            Status,
            Role,
            UsersFilter
        }
    }
</script>