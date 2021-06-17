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
                v-model="localFilterData.id"
                @keyup="callFilter"
            />

            <input 
                id="name" 
                name="id" 
                type="text" 
                class="mt-3 w-full border-b-2 border-lightBlue-600 p-2 text-sm rounded-sm outline-none"
                placeholder="First name"
                v-model="localFilterData.firstName"
                @keyup="callFilter"    
            />

            <input 
                id="id" 
                name="name" 
                type="text" 
                class="mt-3 w-full border-b-2 border-lightBlue-600 p-2 text-sm rounded-sm outline-none"
                placeholder="Name"
                v-model="localFilterData.name"
                @keyup="callFilter"    
            />

            <input 
                id="email" 
                name="email" 
                type="text" 
                class="mt-3 w-full border-b-2 border-lightBlue-600 p-2 text-sm rounded-sm outline-none"
                placeholder="Email"
                v-model="localFilterData.email"
                @keyup="callFilter"    
            />

            <input 
                id="phoneNumber" 
                name="phoneNumber" 
                type="text" 
                class="mt-3 w-full border-b-2 border-lightBlue-600 p-2 text-sm rounded-sm outline-none"
                placeholder="Phone number"
                v-model="localFilterData.phoneNumber"
                @keyup="callFilter"    
            />

            <div class="mt-3 pb-2 border-b-2 border-lightBlue-600">
                <div class="mb-2 text-base font-semibold">
                    Roles
                </div>
                <div class="flex items-center flex-wrap gap-2">
                    <div class="flex justify-between items-center" v-for="role in getRoles" :key="role.id">
                        <input 
                            :id="role.name" 
                            :name="role.name"
                            :value="role.id" 
                            type="checkbox" 
                            v-model="localFilterData.roles"
                            class="mr-1 outline-none"
                            @click="callFilter"
                        />
                        <label :for="role.name" class="text-sm capitalize">{{ role.name}}</label>
                    </div>
                </div>
            </div>

            <!-- <div class="mt-3 pb-2 border-b-2 border-lightBlue-600">
                <div class="mb-2 text-base font-semibold">
                    Has email verified
                </div>
                <div class="flex items-center flex-wrap gap-2">
                    <div class="flex justify-between items-center">
                        <input 
                            id="isVerified"
                            name="verified" type="radio" 
                            value="1" 
                            v-model="localFilterData.verified"
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
                            v-model="localFilterData.verified"
                            class="mr-1 outline-none"
                            @click="callFilter"
                        />
                        <label for="isNotVerified" class="text-sm capitalize">Not verified</label>
                    </div>
                    <button 
                        class="text-sm  border px-2 py-1 rounded border-gray-400 hover:border-lightBlue-600"
                        @click="resetVerifiedFilter"
                    >
                        Reset
                    </button>
                </div>
            </div> -->

            <div class="mt-3 pb-2 border-b-2 border-lightBlue-600">
                <div class="mb-2 text-base font-semibold">
                    Joined date
                </div>
                <div class="flex flex-col items-start gap-3 md:flex-row">
                    <div class="flex items-center">
                        <label class="text-sm font-semibold mr-3" for="fromDate">From:</label>
                        <input 
                            type="date" 
                            id="fromDate" 
                            name="from_date" 
                            v-model="localFilterData.fromDate"
                            class="py-1 px-2 text-sm text-center rounded-sm"
                            @change="callFilter"
                        />
                    </div>
                    <div class="flex items-center">
                        <label class="text-sm font-semibold mr-3" for="toDate">To:</label>
                        <input 
                            type="date" 
                            id="toDate" 
                            name="to_date" 
                            v-model="localFilterData.toDate"
                            class="py-1 px-2 text-sm text-center rounded-sm"
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
    import _isEmpty from 'lodash/isEmpty';

    export default {

        props: {
            filterData: {
                type: Object,
                required: true
            }
        },

        computed: {
            ...mapGetters('Roles', ['getRoles']),
        },

        data() {
            return {
                localFilterData: {
                    id: this.filterData.id,
                    firstName: this.filterData.firstName,
                    lastName: this.filterData.lastName,
                    roles: this.filterData.roles,
                    email: this.filterData.email,
                    phoneNumber: this.filterData.phoneNumber,
                    verified: this.filterData.verified,
                    fromDate: this.filterData.fromDate,
                    toDate: this.filterData.toDate,
                },
            }
        },

        methods: {
            ...mapActions('Notification', ['openNotification']),
            
            callFilter: _debounce( async function() {
                try {
                    const query = {}

                    Object.keys(this.localFilterData).forEach(key => {
                        if(!_isEmpty(this.localFilterData[key])) {
                            query[key] = this.localFilterData[key];
                        }
                    })
                                        
                  this.filter(query);
    
                } catch ( error ) {
                    console.log(error)
                }
            }, 500),

            close() {
                this.$emit('closed')
            },

            filter(query) {
                this.$emit('filter', query)
            }
        },

        components: {
            FilterComponent
        } 
    }
</script>