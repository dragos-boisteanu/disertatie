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
            Products Filter
        </template>
        <div class="mt-5 px-3">
            <input 
                id="barcode" 
                name="barcode" 
                type="text"
                class="w-full border-b-2 border-lightBlue-600 p-2 text-sm rounded-sm outline-none"
                placeholder="Barcode"
                v-model="filterData.barcode"
                @keyup="callFilter"
            />

            <input 
                id="name" 
                name="name" 
                type="text"
                class="mt-3 w-full border-b-2 border-lightBlue-600 p-2 text-sm rounded-sm outline-none"
                placeholder="Product name"
                v-model="filterData.name"
                @keyup="callFilter"
            />

            <div class="mt-3 pb-2 border-b-2 border-lightBlue-600">
                <div class="mb-2 text-base font-semibold">
                    Is active
                </div>
                <div class="flex items-center flex-wrap gap-2">
                    <div class="flex justify-between items-center">
                        <input 
                            id="isActive"
                            name="active" type="radio" 
                            value="1" 
                            v-model="filterData.status"
                            class="mr-1 outline-none"
                            @click="callFilter"
                        />
                        <label for="isActive" class="text-sm capitalize">Active</label>
                    </div>
                    <div class="flex justify-between items-center">
                        <input 
                            id="isInactive"
                            name="inactive" type="radio" 
                            value="2" 
                            v-model="filterData.status"
                            class="mr-1 outline-none"
                            @click="callFilter"
                        />
                        <label for="isInactive" class="text-sm capitalize">Inactive</label>
                    </div>
                    <button 
                        class="text-sm  border px-2 py-1 rounded border-gray-400 hover:border-lightBlue-600"
                        @click="resetActiveFilter"
                    >
                        Reset
                    </button>
                </div>
            </div>

            <div class="mt-3 pb-2 border-b-2 border-lightBlue-600">
                <div class="mb-2 text-base font-semibold">
                    Categories
                </div>
                <div class="flex items-center flex-wrap gap-2">
                    <div class="flex justify-between items-center" v-for="category in getCategories" :key="category.id">
                        <input 
                            :id="category.name" 
                            :name="category.name"
                            :value="category.id" 
                            type="checkbox"
                            v-model="filterData.categories"
                            class="mr-1 outline-none"
                            @click="callFilter"
                        />
                        <label :for="category.name" class="text-sm capitalize">{{ category.name}}</label>
                    </div>
                </div>
            </div>

            <div class="mt-3 pb-2">
                <div class="mb-2 text-base font-semibold">
                    Price range
                </div>
                <div class="flex flex-col items-start gap-3 md:flex-row">
                    <div class="flex items-center">
                        <label class="text-sm font-semibold mr-3" for="priceStart">From:</label>
                        <input 
                            type="text" 
                            id="priceStart" 
                            name="priceStart" 
                            v-model="filterData.priceStart"
                            class="w-full  py-1 px-2 text-sm rounded-sm"
                            @change="callFilter"
                        />
                    </div>
                    <div class="flex items-center">
                        <label class="text-sm font-semibold mr-3" for="priceEnd">To:</label>
                        <input 
                            type="text" 
                            id="priceEnd" 
                            name="priceEnd" 
                            v-model="filterData.priceEnd"
                            class="w-full py-1 px-2 text-sm rounded-sm"
                            @change="callFilter"
                        />
                    </div>
                </div>
            </div>
        </div>
    </FilterComponent>
</template>

<script>
    import FilterComponent from './FilterComponent';
    import { mapActions, mapGetters } from 'vuex';
    import _debounce from 'lodash/debounce';


    export default {

        mounted() {
            const routerQuery = this.$route.query;

            Object.keys(routerQuery).forEach(key => {
                if(key === 'categories') {
                    this.filterData[key] = [];
                    this.filterData[key].push(...routerQuery[key])
                } 
                 
                this.filterData[key] = routerQuery[key];
            })
        },

        computed: {
            ...mapGetters('Categories', ['getCategories']),
        },

        data() {
            return {
                filterData: {
                    barcode: '',
                    id: '',
                    name: '',
                    status: '',
                    categories: [],
                    priceStart: '',
                    priceEnd: '',
                    orderBy: ''
                }
            }
        },

        methods: {
            ...mapActions('Products', ['fetchProducts', 'setFilteredState']),

            callFilter: _debounce( async function() {
                try {
                    const query = {}

                    Object.keys(this.filterData).forEach(key => {
                        if(this.filterData[key] !== '' ) {
                            query[key] = this.filterData[key];
                        }
                    })

                    query.page = 1;

                    await this.fetchProducts(query);

                    this.setFilteredState(true);
                                       
                    this.$router.replace({name:'Products', query: {...query}});
                  
                } catch ( error ) {
                    console.log(error)
                }
            }, 750),

            close() {
                this.$emit('closed')
            },

            resetActiveFilter() {
                this.filterData.status = '';
                this.callFilter();
            }
        },

        components: {
            FilterComponent
        }
    }
</script>