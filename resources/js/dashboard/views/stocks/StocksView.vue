<template>
    <ViewContainer>
        <template slot="header">
            Stocks
        </template>

        <div class="w-full border-b pb-2 flex items-center gap-x-2">
            <router-link :to="{name: 'ProuductsStock'}" class="text-center pb-1 mr-4 border-b-2 border-opacity-0 " >
                Products
            </router-link>
            <router-link :to="{name: 'IngredientsStock'}" class="text-center pb-1 border-b-2 border-opacity-0 border-trasnparent">
                Ingredients
            </router-link>
        </div>

        <div class="w-full mt-2 md:flex md:gap-x-4 xl:w-3/4 2xl:w-1/4 ">
            <keep-alive>
                <router-view :key="$route.fullPath"></router-view> 
            </keep-alive>
            <!-- <router-view></router-view> -->
        </div>

    </ViewContainer>
</template>

<script>
    import ViewContainer from '../ViewContainer';
    import ProductsStockComponent from '../../components/stocks/ProductsStockComponent';

    export default {

        data() {
            return {
                tab: 'products'
                
            }
        },

        components: {
            ViewContainer,
            ProductsStockComponent
        }
    }
</script>


<style scoped>
    .router-link-active,
    .router-link-exact-active {
        @apply border-b-2 border-lightBlue-600 ;
    }
</style>