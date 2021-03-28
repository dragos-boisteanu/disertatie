<template>
    <ViewContainer>
        <ProductFilter
            v-if="showFilterState"
            @closed="toggleFilterState"
        />

        <template slot="header">
           Products List
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
                    @click="refreshProducsList"
                >
                    Refresh
                </button>
            </div>
        
            <select  
                @change="order"
                v-model="orderBy"
                class="w-full p-1 mt-2 text-base border-gray-300 border rounded-sm md:w-auto">
                <option :value="1">Name asc</option>
                <option :value="2">Name desc</option>
                <option :value="3">Price asc</option>
                <option :value="4">Price desc</option>
                <option :value="5">Quantity asc</option>
                <option :value="6">Quantity desc</option>
            </select> 
        </div>

        <CardsList>
            <Card v-for="product in getProducts" :key="product.id" class="w-full p-2 mt-4 rounded text-sm shadow-sm  hover:shadow-md bg-white md:w-49 lg:w-350px xl:w-375px 2xl:w-400px">
                <router-link :to="{name: 'Product', params: {id: product.id}}">
                    <div class="w-full flex justify-start items-center pb-2 border-b border-gray-100">
                        <div class="w-12 h-12 mr-4 bg-gray-500 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="48px" height="48px"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C8.43 2 5.23 3.54 3.01 6L12 22l8.99-16C18.78 3.55 15.57 2 12 2zM7 7c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm5 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>
                        </div>
                        <div class="flex-1">
                            <div class="font-semibold text-base">
                                <span class="pr-1 border-r border-gray-200">{{ product.name}}</span> 
                                <span>{{ product.weight}}<Unit :unit-id="product.unit_id"></Unit></span>
                            </div>
                            <div class="text-sm">
                               {{product.base_price}} RON / {{ product.vat }}% VAT
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
        <Pagination :data="getPaginationData" route="Products" :query="query" @navigate="loadProducts" ></Pagination>
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

    import store from '../../store/index';
    import { mapActions, mapGetters } from 'vuex';

    export default {
        async beforeRouteEnter (to, from, next) {
            if(Object.keys(to.query).length === 0) {
                await store.dispatch('Products/fetchProducts', {page: 1});
                next();
            } else {
                await store.dispatch('Products/fetchProducts', to.query);
                next();
            } 
        },

        computed: {
            ...mapGetters('Categories', ['getCategories']),
            ...mapGetters('Products', ['getProducts','getPaginationData']),

            query() {
                return this.$route.query
            }
        },

        data() {
            return {
                showFilterState: false,
                orderBy: 1
            }
        },

        methods: {
            ...mapActions('Products', ['fetchProducts', 'sortProductsList']),

            async refreshProducsList() {
                try {
                    if(Object.keys(this.$route.query).length > 0) { 
                        this.$router.replace({name:'Products', query: {}});
                    }

                    await this.fetchProducts();

                    this.orderBy = 1;

                } catch ( error) {
                    console.log(error)
                }
            },

            async loadProducts(page) {
                try {
                    await this.fetchProducts(this.query)
                } catch ( error ) {
                    console.log(error);
                }
            },

            toggleFilterState() {
                this.showFilterState = !this.showFilterState;
            },

            order() {
                this.sortProductsList(this.orderBy);    
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
            Unit
        }
    }
</script>