<template>
    <FilterComponent>
        <template slot="close">
            <svg 
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="24px" height="24px"
                @click="close"
            >
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
        </template>
        <template slot="header">
            Users Filter
        </template>
        <div class="mt-5 px-3">
            <input 
                id="id" 
                name="id" 
                type="text"
                class="w-full border-b-2 border-lightBlue-600 p-2 text-sm rounded-sm outline-none" 
                placeholder="ID"
                v-model="filterData.id"
                @keyup="callFilter"
            />

            <input 
                id="id" 
                name="id" 
                type="text" 
                class="mt-3 w-full border-b-2 border-lightBlue-600 p-2 text-sm rounded-sm outline-none"
                placeholder="First name"
                v-model="filterData.firstName"
                @keyup="callFilter"    
            />

            <input 
                id="id" 
                name="id" 
                type="text" 
                class="mt-3 w-full border-b-2 border-lightBlue-600 p-2 text-sm rounded-sm outline-none"
                placeholder="Name"
                v-model="filterData.name"
                @keyup="callFilter"    
            />

            <div class="mt-3 pb-2 border-b-2 border-lightBlue-600">
                <div class="mb-2 text-base font-semibold">
                    Roles
                </div>
                <div class="flex items-center flex-wrap gap-2">
                    <div class="flex justify-between items-center" v-for="role in getRoles" :key="role.id">
                        <input 
                            :id="role.name" :name="role.name" type="checkbox" 
                            :value="role.id" 
                            v-model="filterData.roles"
                            class="mr-1 outline-none"
                            @click="callFilter"
                        />
                        <label :for="role.name" class="text-sm capitalize">{{ role.name}}</label>
                    </div>
                </div>
            </div>
           <div class="mt-3 pb-2 border-b-2 border-lightBlue-600">
                <div class="mb-2 text-base font-semibold">
                    Joined date
                </div>
                <div class="flex flex-col gap-2 items-start justify-start">
                    <div class="flex">
                        <label class="text-sm font-semibold mr-2 w-11" for="fromDate">From:</label>
                        <input type="date" id="fromDate" name="from_date" class="p-0 px-2 text-xs text-center"/>
                    </div>
                    
                    <div class="flex">
                        <label class="text-sm font-semibold mr-2 w-11"  for="toDate">To:</label>
                        <input type="date" id="fromDate" name="to_date" class="p-0 px-2 text-xs text-center"/>
                    </div>
                </div>
            </div>
        </div>
    </FilterComponent>
</template>
    

<script>
    import { mapActions, mapGetters } from 'vuex';
    import FilterComponent from './FilterComponent';
    import _debounce from 'lodash/debounce';

    export default {

        mounted() {
            this.filterData.id =  this.$route.query.id ? this.$route.query.id : '';
            this.filterData.firstName = this.$route.query.firstName ? this.$route.query.firstName : '';
            this.filterData.name = this.$route.query.name ? this.$route.query.name : '';
            if(this.$route.query.roles) {
                this.filterData.roles.push(...this.$route.query.roles)
            };
        },

        computed: {
            ...mapGetters('Users', ['getNextPage']),
            ...mapGetters('Roles', ['getRoles']),
        },

        data() {
            return {
                filterData: {
                    id: '',
                    firstName: '',
                    name: '',
                    roles: [],
                },
            }
        },

        methods: {
            ...mapActions('Users', ['fetchFilteredUsers', 'fetchUsers', 'reset']),

            callFilter: _debounce( async function() {
                try {
                    const query = {
                        page: 1,
                    }

                    if(this.filterData.id.length > 0) {
                        query.id = this.filterData.id;
                    }

                    if(this.filterData.firstName.length > 0) {
                        query.firstName = this.filterData.firstName;
                    }

                    if(this.filterData.name.length > 0) {
                        query.name = this.filterData.name;
                    }

                    if(this.filterData.roles.length > 0 ) {
                        query.roles = this.filterData.roles;
                    }

                    this.$router.replace({name:'Users', query: {...query}});
                    
                    this.reset();
                    await this.fetchUsers(query);
                  
                } catch ( error ) {
                    console.log(error)
                }
            }, 750),

            close() {
                this.$emit('closed')
            }
        },

        components: {
            FilterComponent
        } 
    }
</script>