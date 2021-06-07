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

        <div class="mt-5 px-3">
            <input 
                id="id" 
                name="id" 
                type="text"
                class="w-full border-b-2 border-lightBlue-600 p-2 text-sm rounded-sm outline-none focus:border-lightBlue-500 focus:shadow"
                placeholder="ID"
                v-model.trim.lazy="localFilterData.id"
                @change="callFilter"
            />

            <input 
                id="phoneNumber" 
                name="phoneNumber" 
                type="text"
                class="w-full mt-3 border-b-2 border-lightBlue-600 p-2 text-sm rounded-sm outline-none focus:border-lightBlue-500 focus:shadow"
                placeholder="Phone number"
                v-model.trim.lazy="localFilterData.phoneNumber"
                @change="callFilter"
            />

            <input 
                id="staffFirstName" 
                name="staffFirstName" 
                type="text"
                class="w-full mt-3 border-b-2 border-lightBlue-600 p-2 text-sm rounded-sm outline-none focus:border-lightBlue-500 focus:shadow"
                placeholder="Sfatff first name"
                v-model.trim.lazy="localFilterData.staffFirstName"
                @change="callFilter"
            />

            <input 
                id="staffLastName" 
                name="staffLastName" 
                type="text"
                class="w-full mt-3 border-b-2 border-lightBlue-600 p-2 text-sm rounded-sm outline-none focus:border-lightBlue-500 focus:shadow"
                placeholder="Sfatff Last Name"
                v-model.trim.lazy="localFilterData.staffLastName"
                @change="callFilter"
            />

            <div class="my-2 flex items-center flex-wrap gap-1">
                <div v-for="status in getOrdersStatuses" :key="status.id">
                    <input 
                        :id="status.id" 
                        :name="status.name"
                        :value="status.id" 
                        type="checkbox" 
                        v-model="localFilterData.statuses"
                        class="mr-1 outline-none"
                        @change="callFilter"
                    />
                    <label :for="status.id">
                    {{ status.name }}</label>
    
                </div>

            </div>
        </div>

        <template slot="header">
            Orders filter
        </template>

    </FilterComponent>

</template>

<script>
    import { mapGetters } from 'vuex';
    import FilterComponent from './FilterComponent'
    import _isEmpty from 'lodash/isEmpty';

    export default {

        mounted() {
            const routerQuery = this.$route.query;

            Object.keys(routerQuery).forEach(key => {
                this.filterData[key] = routerQuery[key];
            })
        },

        props: {
            filterData: {
                type: Object,
                required: true
            }
        },

        computed: {
            ...mapGetters('Statuses', ['getOrdersStatuses']),
        },
        
        data() {
            return {
                localFilterData: {
                    id: this.filterData.id,
                    phoneNumber: this.filterData.phoneNumber,
                    staffLastName: this.filterData.staffLastName,
                    staffFirstName: this.filterData.staffFirstName,
                    statuses: this.filterData.statuses,
                }
            }
        },
 
        methods: {
            async callFilter() {
                try {

                    const query = {};

                    Object.keys(this.localFilterData).forEach(key => {
                        if(!_isEmpty(this.localFilterData[key])) {
                            query[key] = this.localFilterData[key];
                        }
                    }) 

                    this.filter(query);
                } catch ( error ) {
                    throw error
                }
            },

            filter(query ){
                this.$emit('filter', query);
            },

            close() {
                this.$emit('closed')
            }
        },

        components: {
            FilterComponent
        }
    }
</script>