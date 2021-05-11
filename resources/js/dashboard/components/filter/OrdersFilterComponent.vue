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
                v-model.trim.lazy="filterData.id"
                @change="callFilter"
            />

            <input 
                id="phoneNumber" 
                name="phoneNumber" 
                type="text"
                class="w-full mt-3 border-b-2 border-lightBlue-600 p-2 text-sm rounded-sm outline-none focus:border-lightBlue-500 focus:shadow"
                placeholder="Phone number"
                v-model.trim.lazy="filterData.phoneNumber"
                @change="callFilter"
            />

            <input 
                id="clientFirstName" 
                name="clientFirstName" 
                type="text"
                class="w-full mt-3 border-b-2 border-lightBlue-600 p-2 text-sm rounded-sm outline-none focus:border-lightBlue-500 focus:shadow"
                placeholder="Client first name"
                v-model.trim.lazy="filterData.clientFirstName"
                @change="callFilter"
            />

            <input 
                id="clientName" 
                name="clientName" 
                type="text"
                class="w-full mt-3 border-b-2 border-lightBlue-600 p-2 text-sm rounded-sm outline-none focus:border-lightBlue-500 focus:shadow"
                placeholder="Client name"
                v-model.trim.lazy="filterData.clientName"
                @change="callFilter"
            />

            <input 
                id="staffFirstName" 
                name="staffFirstName" 
                type="text"
                class="w-full mt-3 border-b-2 border-lightBlue-600 p-2 text-sm rounded-sm outline-none focus:border-lightBlue-500 focus:shadow"
                placeholder="Sfatff first name"
                v-model.trim.lazy="filterData.staffFirstName"
                @change="callFilter"
            />

            <input 
                id="staffName" 
                name="staffName" 
                type="text"
                class="w-full mt-3 border-b-2 border-lightBlue-600 p-2 text-sm rounded-sm outline-none focus:border-lightBlue-500 focus:shadow"
                placeholder="Sfatff name"
                v-model.trim.lazy="filterData.staffName"
                @change="callFilter"
            />
        </div>

        <template slot="header">
            Orders filter
        </template>

    </FilterComponent>

</template>

<script>
    import { mapActions } from 'vuex'
    import FilterComponent from './FilterComponent'

    export default {

        mounted() {
            const routerQuery = this.$route.query;

            Object.keys(routerQuery).forEach(key => {
                this.filterData[key] = routerQuery[key];
            })
        },
        
        data() {
            return {
                filterData: {
                    id: '',
                    phoneNumber: '',
                    clientName: '',
                    clientFirstName: '',
                    staffName: '',
                    staffFirstName: '',
                    orderBy: ''
                }
            }
        },
 
        methods: {
            ...mapActions('Orders', ['downloadOrders']),

            async callFilter() {
                try {
                    const query = {}

                    Object.keys(this.filterData).forEach(key => {
                        if(this.filterData[key] !== '') {
                            query[key] = this.filterData[key];
                        }
                    })

                    query.page = 1;

                    await this.downloadOrders(query);

                    this.$router.replace({name:'Orders', query: {...query}});
                } catch ( error ) {
                    throw error
                }
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