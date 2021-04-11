<template>
    <ViewContainer>
        <template slot="header">
            Stocks
        </template>

        <div class="w-full border-b pb-4 flex items-center gap-x-2">
            <div class="border-r pr-2">
                Products
            </div>
            <div>
                Ingredients
            </div>
        </div>

        <div class="w-full mt-2 md:flex md:gap-x-4 xl:w-3/4 2xl:w-1/4 ">
            <ProductsStockComponent></ProductsStockComponent>
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