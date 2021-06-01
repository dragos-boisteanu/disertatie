<template>
    <ViewContainer>
        <ProductFilter
            v-if="showFilterState"
            :filterData="filterData"
            @closed="toggleFilterState"
            @filter="filter"
        />

        <template slot="header">
           Products List
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
                    @click="refreshProducsList"
                >
                    Refresh
                </button>
                <router-link
                    :to="{name: 'AddProduct'}" 
                    class="block w-full py-1 px-2 mt-2 text-center text-base text-white ripple-bg-orange-600 rounded-sm active:shadow-inner md:w-auto md:mt-0" 
                >
                    Add product
                </router-link>
            </div>
        
            <select  
                @change="order"
                v-model="orderBy"
                class="w-full p-1 mt-2 text-base border-gray-300 border rounded-sm md:w-auto">
                <option :value="1">Name asc</option>
                <option :value="2">Name desc</option>
                <option :value="3">Price asc</option>
                <option :value="4">Price desc</option>
            </select> 
        </div>

        <CardsList>
            <Card v-for="product in products" :key="product.id">
                <router-link :to="{name: 'Product', params: {id: product.id}}">
                    <div class="w-full flex justify-start items-center pb-2 border-b border-gray-100">
                        <div class="w-12 h-12 mr-4 rounded-md">
                            <img v-if="product.image" :src="product.image" class="w-full h-full rounded-md object-cover"/>
                            <svg v-else class="bg-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="48px" height="48px"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C8.43 2 5.23 3.54 3.01 6L12 22l8.99-16C18.78 3.55 15.57 2 12 2zM7 7c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm5 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>
                        </div>
                        <div class="flex-1">
                            <div class="font-semibold text-base">
                                <span class="border-gray-200">{{ product.name}}</span> 
                                <span>{{ product.weight}}<Unit :unit-id="product.unit_id"></Unit></span>
                            </div>
                            <div class="text-sm">
                               {{product.base_price}} RON / <Vat :category-id="product.category_id"></Vat>
                            </div>
                        </div>
                        <div>
                            <div class="text-xs font-semibold">
                                #{{product.id}}
                            </div>
                            <div class="mt-2">
                               <Status :deleted-at="product.deleted_at"/>
                            </div>
                        </div>
                    </div>
                    <div class="mt-2">
                        <div class="flex justify-between items-center">
                            <Category :category-id="product.category_id"></Category>
                            <Stock :quantity="product.quantity"></Stock>
                        </div>
                    </div>
                </router-link>
            </Card>
        </CardsList>

        <Pagination :data="pagination" :query="query" route="Products" @navigate="callDownloadProducts"></Pagination>

    </ViewContainer>
</template>

<script>
    import ViewContainer from '../ViewContainer';
    import Status from '../../components/StatusComponent';
    import Stock from '../../components/StockComponent';
    import ProductFilter from '../../components/filter/ProductFilterComponent';
    import Pagination from '../../components/PaginationComponent';
    import CardsList from '../../components/cards/CardsListComponent';
    import Card from '../../components/cards/CardComponent';
    import Category from '../../components/products/CategoryComponent';
    import Unit from '../../components/products/UnitComponent';
    import Vat from '../../components/products/VatComponent';

    import { mapGetters } from 'vuex';

    import _isEqual from 'lodash/isEqual';
    import _isEmpty from 'lodash/isEmpty';

    import { downloadProducts } from '../../api/products.api';

    export default {
        async beforeRouteEnter (to, from, next) {
            let data = {};

            if(Object.keys(to.query).length === 0) {
                const response = await downloadProducts();
                data = response.data;
            } else {
                const response = await downloadProducts(to.query);
                data = response.data;
            }

            next(vm => vm.setData(data));
        },

        computed: {
            ...mapGetters('Categories', ['getCategories']),

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
                products: [],
                pagination: {
                    currentPage: '',
                    lastPage: '',
                },
                filterData: {
                    barcode: '',
                    name: '',
                    categories: [],
                    priceStart: '',
                    priceEnd: '',
                    stockStatus: '',
                },
                showFilterState: false,
                orderBy: 1,
            }
        },

        methods: {
            async refreshProducsList() {
                try {

                    if(!_isEmpty(this.$route.query)) { 
                        this.$router.replace({name:'Products', query: {}});
                    }

                    this.orderBy = 1;
                    
                    this.resetFilterData();

                    const response = await downloadProducts();
                    this.setData(response.data);
                } catch ( error) {
                    console.log(error)
                }
            },

            async filter(query) {
                if(!_isEqual(this.filterData, query)) {
                    query.orderBy = this.orderBy;

                    this.$router.replace({name:'Products', query});
                
                    const response = await downloadProducts(query);
                    this.updateFilterData(query);

                    this.setData(response.data);
                }               
            },

            async callDownloadProducts(query) {
                const response = await downloadProducts(query);
                this.setData(response.data);
            },

            async order() {
                try {

                    const query = {};

                    Object.keys(this.filterData).forEach(key => {
                        if(this.filterData[key] !== "") {
                            query[key] = this.filterData[key];
                        };
                    })

                    query.page = 1;
                    query.orderBy = this.orderBy;
                
                    const response = await downloadProducts(query);
                    this.setData(response.data);

                    this.$router.replace({name:'Products', query});

                }  catch ( error ) {
                    console.log(error)
                }
            },

            toggleFilterState() {
                this.showFilterState = !this.showFilterState;
            },

            setData(data) {
                this.setProducts(data.data.products);
                this.setPagination(data.meta)
            },

            setProducts(products) {
                this.products = products;
            },

            setPagination(meta) {
                this.pagination.currentPage = meta.current_page;
                this.pagination.lastPage = meta.last_page;
            },

            resetFilterData(){
                Object.keys(this.filterData).forEach(key => {
                    this.filterData[key] = "";
                })

                this.filterData.categories = [];
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
            Stock,
            ProductFilter,
            Pagination,
            CardsList,
            Card,
            Category,
            Unit,
            Vat
        }
    }
</script>