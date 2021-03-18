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
                id="name" 
                name="id" 
                type="text" 
                class="mt-3 w-full border-b-2 border-lightBlue-600 p-2 text-sm rounded-sm outline-none"
                placeholder="First name"
                v-model="filterData.firstName"
                @keyup="callFilter"    
            />

            <input 
                id="id" 
                name="name" 
                type="text" 
                class="mt-3 w-full border-b-2 border-lightBlue-600 p-2 text-sm rounded-sm outline-none"
                placeholder="Name"
                v-model="filterData.name"
                @keyup="callFilter"    
            />

            <input 
                id="email" 
                name="email" 
                type="text" 
                class="mt-3 w-full border-b-2 border-lightBlue-600 p-2 text-sm rounded-sm outline-none"
                placeholder="Email"
                v-model="filterData.email"
                @keyup="callFilter"    
            />

            <input 
                id="phoneNumber" 
                name="phoneNumber" 
                type="text" 
                class="mt-3 w-full border-b-2 border-lightBlue-600 p-2 text-sm rounded-sm outline-none"
                placeholder="Phone number"
                v-model="filterData.phoneNumber"
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
                    Has email verified
                </div>
                <div class="flex items-center flex-wrap gap-2">
                    <div class="flex justify-between items-center">
                        <input 
                            id="isVerified"
                            name="verified" type="radio" 
                            value="1" 
                            v-model="filterData.verified"
                            class="mr-1 outline-none"
                            @click="callFilter"
                        />
                        <label for="isVerified" class="text-sm capitalize">Verified</label>
                    </div>
                    <div class="flex justify-between items-center">
                        <input 
                            id="isNotVerified"
                            name="verified" type="radio" 
                            value="2" 
                            v-model="filterData.verified"
                            class="mr-1 outline-none"
                            @click="callFilter"
                        />
                        <label for="isNotVerified" class="text-sm capitalize">Not verified</label>
                    </div>
                </div>
            </div>
           <div class="mt-3 pb-2 border-b-2 border-lightBlue-600">
                <div class="mb-2 text-base font-semibold">
                    Joined date
                </div>
                <div class="flex  flex-col items-start gap-3 md:flex-row">
                    <div class="flex items-center">
                        <label class="text-sm font-semibold mr-3" for="fromDate">From:</label>
                        <input 
                            type="date" 
                            id="fromDate" 
                            name="from_date" 
                            v-model="filterData.fromDate"
                            class="py-1 px-2 text-sm text-center border-b-2 border-lightBlue-600 rounded-sm"
                            @change="callFilter"
                        />
                    </div>
                    <div class="flex items-center">
                        <label class="text-sm font-semibold mr-3" for="toDate">To:</label>
                        <input 
                            type="date" 
                            id="fromDate" 
                            name="to_date" 
                            v-model="filterData.toDate"
                            class="py-1 px-2 text-sm text-center border-b-2 border-lightBlue-600 rounded-sm"
                            @change="callFilter"
                        />
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
            this.filterData.email = this.$route.query.email ? this.$route.query.email : '';
            this.filterData.phoneNumber = this.$route.query.phoneNumber ? this.$route.query.phoneNumber : '';
            this.filterData.fromDate = this.$route.query.fromDate ? this.$route.query.fromDate : '';
            this.filterData.toDate = this.$route.query.toDate ? this.$route.query.toDate : '';
            this.filterData.verified = this.$route.query.verified ? this.$route.query.verified : '';
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
                    email: '',
                    phoneNumber: '',
                    verified: '',
                    fromDate: '',
                    toDate: '',
                },
            }
        },

        methods: {
            ...mapActions('Users', ['fetchFilteredUsers', 'fetchUsers', 'reset']),

            callFilter: _debounce( async function() {
                try {
                    const query = {}

                    if(this.filterData.id.length > 0) {
                        query.id = this.filterData.id;
                    }

                    if(this.filterData.firstName.length > 0) {
                        query.firstName = this.filterData.firstName;
                    }

                    if(this.filterData.name.length > 0) {
                        query.name = this.filterData.name;
                    }

                    if(this.filterData.email.length > 0) {
                        query.email = this.filterData.email;
                    }

                    if(this.filterData.phoneNumber.length > 0) {
                        query.phoneNumber = this.filterData.phoneNumber;
                    }

                    if(this.filterData.roles.length > 0 ) {
                        query.roles = this.filterData.roles;
                    }

                    if(this.filterData.fromDate.length > 0 ) {
                        query.fromDate = this.filterData.fromDate;
                    }

                    if(this.filterData.toDate.length > 0 ) {
                        query.toDate = this.filterData.toDate;
                    }

                    if(this.filterData.verified.length > 0 ) {
                        query.verified = this.filterData.verified;
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