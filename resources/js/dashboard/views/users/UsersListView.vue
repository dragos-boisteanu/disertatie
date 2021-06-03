<template>
   <ViewContainer>
        <UsersFilter
            v-if="showFilterState"
            :filterData="filterData"
            @closed="toggleFilterState"
            @filter="filter"
        />

        <template slot="header">
           Users List
        </template>

        <div class="flex flex-col pb-3 md:flex-row md:justify-between items-end">
            <div class="w-full md:flex md:flex-row md:gap-3 md:items-center">
                <button 
                    class="w-full py-1 text-base text-white ripple-bg-green-600 rounded-sm active:shadow-inner md:w-20"
                    @click="toggleFilterState"
                    >
                    Filter
                </button>
                <button 
                    class="w-full py-1 mt-2  text-base text-white ripple-bg-lightBlue-600 rounded-sm active:shadow-inner md:w-20 md:mt-0" 
                    @click="refreshUsersList">
                    Refresh
                </button>
                <router-link
                    v-if="hideAddUser"
                    :to="{name: 'CreateUser'}" 
                    class="block w-full py-1 px-2 mt-2 text-center text-base text-white ripple-bg-orange-600 rounded-sm active:shadow-inner md:w-auto md:mt-0" 
                >
                    Add user
                </router-link>
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
                <option :value="9">Orders asc</option>
                <option :value="10">Orders desc</option>
                <option :value="11">Reservations asc</option>
                <option :value="12">Reservations desc</option>
                <option :value="13">Joined at asc</option>
                <option :value="14">Joined at desc</option>
            </select>
        </div>
        <CardsList>
            <Card v-for="user in users" :key="user.id">
                <router-link :to="{name: 'User', params:{id:user.id}}">
                    <div class="w-full flex justify-start items-center pb-1 border-b border-gray-100">
                        <div class="w-12 h-12 mr-4 rounded-md">
                            <img v-if="user.avatar" :src="user.avatar" class="w-full h-full rounded-md"/>
                            <svg v-else class="bg-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="48px" height="48px"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
                        </div>
                        <div class="flex-1">
                            <div class="capitalize font-semibold">
                               <span>{{ user.firstName}}</span> <span>{{user.lastName}}</span>
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
                            <Role :role-name="user.role.name"/>
                        </div>
                    </div>
                </router-link>
            </Card>
      </CardsList>
      
     <Pagination :data="pagination" :query="query" route="Users" @navigate="callDownloadUsers"></Pagination>
      
   </ViewContainer>
</template>

<script>
    import ViewContainer from '../ViewContainer';
    import Status from '../../components/StatusComponent';
    import Role from '../../components/users/RoleComponent';
    import UsersFilter from '../../components/filter/UsersFilterComponent';
    import CardsList from '../../components/cards/CardsListComponent';
    import Card from '../../components/cards/CardComponent';
    import Pagination from '../../components/PaginationComponent';

    import { mapGetters, mapActions } from 'vuex';

    import _isEmpty from 'lodash/isEmpty'
    import _isEqual from 'lodash/isEqual'

    import { downloadUsers } from  '../../api/users.api';

    export default {
        async beforeRouteEnter (to, from, next) {
            let response = {};

            if(Object.keys(to.query).length === 0) {
                response = await downloadUsers()
            } else {
                response = await downloadUsers(to.query)
            }

            next(vm => vm.setData(response.data));
        },

        mounted() {
            Object.keys(this.$route.query).forEach(key => {
                if(!_isEmpty(this.$route.query[key])) {
                    this.filterData[key] = this.$route.query[key];
                }

                if(!_isEmpty(this.$route.query.roles)) {
                    this.filterData.roles = [];
                    this.filterData.roles.push(...this.$route.query.roles);
                }
            })
        },


        computed: {
            ...mapGetters('Users', ['isAdmin', 'isWaiter','isLocationManager']),

            hideAddUser() {
                return this.isAdmin || this.isLocationManager || this.isWaiter;
            },

            query() {
                const query = {};

                Object.keys(this.filterData).forEach(key => {
                    if(!_isEmpty(this.filterData[key])) {
                        query[key] = this.filterData[key];
                    }
                })

                query.orderBy = this.orderBy;

                return query;
            }
        },

        data() {
            return {
                users: {},
                filterData: {
                    id: "",
                    firstName: "",
                    lastName: "",
                    roles: [],
                    email: "",
                    phoneNumber: "",
                    verified: "",
                    fromDate: "",
                    toDate: "",
                },
                pagination: {
                    currentPage: '',
                    lastPage: ''
                },
                showFilterState: false,
                orderBy: 14
            }
        },

        methods: { 
            ...mapActions('Notification', ['openNotification']),

            async refreshUsersList() {
                if(!_isEmpty(this.$route.query)) { 
                    this.$router.replace({name:'Users', query: {}});
                }

                this.orderBy = 13;

                const response = await downloadUsers();
                this.setData(response.data)

                this.resetFilterData();
            },

            async order() {
                const  query = {}

                Object.keys(this.filterData).forEach(key => {
                    if(this.filterData[key] !== "") {
                        query[key] = this.filterData[key];
                    }
                })

                query.orderBy = this.orderBy;
                
                const response = await downloadUsers(query)
                this.setData(response.data);

                this.$router.replace({name:'Users', query});
            },

            async filter(query) {
                if(!_isEqual(this.filterData, query)) {
                    query.orderBy = this.orderBy;
                    query.page = 1;

                    const response = await downloadUsers(query);
                    this.setData(response.data);

                    this.$router.push({name:'Users', query})
                    this.updateFilterData(query);
                }
            },

            async callDownloadUsers(query) {
                const response = await downloadUsers(query);
                this.setData(response.data);
            },

            toggleFilterState() {
                this.showFilterState = !this.showFilterState;
            },

            setData(data) {
                this.setUsers(data.data.users);
                this.setPagination(data.meta)
            },

            setUsers(users) {
                this.users = users;
            },

            setPagination(meta) {
                this.pagination.currentPage = meta.current_page;
                this.pagination.lastPage = meta.last_page;
            },

            resetFilterData(){
                Object.keys(this.filterData).forEach(key => {
                    this.filterData[key] = "";
                })

                this.filterData.roles = [];
            },

            updateFilterData(query) {
                Object.keys(query).forEach(key => {
                    if(query[key] !== "") {
                        this.filterData[key] = query[key]
                    }
                })
            }
        },  

        components: {
            ViewContainer,
            Status,
            Role,
            UsersFilter,
            CardsList,
            Card,
            Pagination
        }
    }
</script>