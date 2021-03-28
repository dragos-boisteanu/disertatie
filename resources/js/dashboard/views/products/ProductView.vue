<template>
    <ViewContainer v-if="product">

        <ProductEdit 
            v-if="editProductState" 
            @close="toggleEditProductState"
            @updated="updateProduct"
            :product="product"
        >
        </ProductEdit>

        <template slot="header">
           Product #{{product.id}}
        </template>

        <div class="w-full pb-2 mb-2 flex flex-col justify-center items-center border-b border-gray-100 md:flex-row md:justify-start">
            <div class="w-32 h-32 bg-gray-500 rounded-md md:mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="128px" height="128px"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C8.43 2 5.23 3.54 3.01 6L12 22l8.99-16C18.78 3.55 15.57 2 12 2zM7 7c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm5 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>
            </div>
            <div class="flex flex-col items-center justify-center lg:items-start">
                <div>
                    <div class="flex gap-x-2 items-center font-semibold text-2xl mt-2">
                        <h1 class="pr-2 border-r border-gray-200">{{ product.name}}</h1> 
                        <span class="text-base">{{ product.weight}}{{product.unit}}</span>
                    </div>
                </div>
                <div class="text-sm">
                    {{product.base_price}} RON / {{ product.vat }}% VAT
                </div>
                <div class="flex justify-center w-full mt-2 md:justify-start">
                     <Status :deleted-at="product.deleted_at"/>
                    <div class="py-1 px-2 text-xs ml-2 text-white rounded-sm bg-amber-600"> 
                        {{ product.category}} 
                    </div>  
                    <Stock :quantity="product.quantity"></Stock>
                </div>
                <button 
                    @click="toggleEditProductState"
                    class="bg-amber-700 rounded-sm text-xs py-1 px-4 text-white mt-2 hover:bg-amber-600 active:bg-amber-400 active:shadow-inner"
                >
                    Edit
                </button>
            </div>
        </div> 
        <div class="text-sm mb-2 pb-2 border-b border-gray-100">
            <h2 class="font-bold text-lg my-2">Descriere</h2>
            {{product.description}}
        </div>
        <div>
            <h2 class="font-bold text-lg my-2">Ingredients</h2>
            <ul>
                <li class="flex items-center gap-x-2">
                    <div class="font-semibold text-sm">
                        Nume:
                    </div>
                    <div class="text-xs">
                        23g
                    </div>
                </li>
            </ul>
        </div>

    </ViewContainer>
</template>


<script>
    import ViewContainer from '../ViewContainer';
    import Status from '../../components/StatusComponent';
    import Stock from '../../components/StockComponent';
    import ProductEdit from '../../components/products/EditProductComponent';

    import store from '../../store/index';

    export default {

        async beforeRouteEnter(to, from, next) {
            try {
                const id = to.params.id;
                if(store.getters['Products/getProducts'].length > 0) {
                    let product = await store.dispatch('Products/getProduct', id);
                    if(!product) {
                        product = await store.dispatch('Products/fetchProduct', id);
                    }
                    next(vm => vm.setProduct(product));
                } else {
                    const product = await store.dispatch('Products/fetchProduct', id);
                    next(vm => vm.setProduct(product));
                }
            } catch ( error ) {
                console.log(error)
            }
        },

        data() {
            return {
                editProductState: false,
                product: null,
            }
        },

        methods: {
            
            updateProduct(product) {
                console.log(product);
            },

            setProduct(product) {
                this.product = product;
            },

            toggleEditProductState() {
                this.editProductState = !this.editProductState;
            },

        },

        components: {
            ViewContainer,
            Stock,
            Status,
            ProductEdit
        }
    }
</script>