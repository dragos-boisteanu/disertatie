<template>
    <FilterComponent>
        <template slot="header">
            <div class="">
                Users Filter
            </div>
        </template>
        <div class="mt-5 px-3">
            <input 
                id="id" 
                name="id" 
                type="text" 
                class="w-full border-b border-lightBlue-600 p-2 text-sm rounded-sm outline-none" placeholder="ID"
                v-model="filterData.id"
                @keyup="callFilter"
            />

            <input id="id" name="id" type="text" class="mt-3 w-full border-b border-lightBlue-600 p-2 text-sm rounded-sm outline-none" placeholder="First name"/>

            <input id="id" name="id" type="text" class="mt-3 w-full border-b border-lightBlue-600 p-2 text-sm rounded-sm outline-none" placeholder="Name"/>
            <div class="mt-3 pb-2 border-b border-lightBlue-600">
                <div class="mb-2 text-base font-semibold">
                    Roles
                </div>
                <div class="flex items-center flex-wrap gap-2">
                    <div class="flex justify-between items-center" v-for="role in getRoles" :key="role.id">
                        <input :id="role.name" :name="role.name" type="checkbox" :value="role.id" class="mr-1 outline-none"/>
                        <label :for="role.name" class="text-sm capitalize">{{ role.name}}</label>
                    </div>
                </div>
            </div>
           <div class="mt-3 pb-2 border-b border-lightBlue-600">
                <div class="mb-2 text-base font-semibold">
                    Joined date
                </div>
                <div class="flex flex-col gap-2 items-start justify-start">
                    <div class="flex">
                        <label class="font-semibold mr-2 w-11" for="fromDate">From:</label>
                        <input type="date" id="fromDate" name="from_date" class="p-0 px-2 text-xs text-center"/>
                    </div>
                    
                    <div class="flex">
                        <label class="font-semibold mr-2 w-11"  for="toDate">To:</label>
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
        computed: {
            ...mapGetters('Users', ['getFilteredNextPage']),
            ...mapGetters('Roles', ['getRoles']),
        },

        data() {
            return {
                filterData: {
                    id: '',
                    firstName: '',
                    name: ''
                },
            }
        },

        methods: {
            ...mapActions('Users', ['fetchFilteredUsers']),

            callFilter: _debounce( async function() {
                try {
                    const query = {
                        page: this.getFilteredNextPage
                    }

                    if(this.filterData.id.length > 0) {
                        query.id = this.filterData.id;
                    }

                    if(this.filterData.firstName.lenght > 0) {
                        query.firstName = this.filterData.firstName
                    }

                    if(this.filterData.name.length > 0) {
                        query.name = this.filterData.name
                    }

                    await this.fetchFilteredUsers(query, true);
                       
                    

                } catch ( error ) {
                    console.log(error)
                }
            }, 500)
        },

        components: {
            FilterComponent
        } 
    }
</script>