<template>
    <ViewContainer v-if="product">
        <template slot="header">
           Product #{{product.id}}
        </template>

        <div class="w-full pb-2 mb-2 flex flex-col justify-center items-center border-b border-gray-100 md:flex-row md:justify-start">
            <div class="w-32 h-32 rounded-md md:mr-4">
                <img v-if="product.image" :src="product.image" class="w-full h-full rounded-md object-cover"/>
                <svg v-else class="bg-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="128px" height="128px"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C8.43 2 5.23 3.54 3.01 6L12 22l8.99-16C18.78 3.55 15.57 2 12 2zM7 7c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm5 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>
            </div>
            <div class="flex flex-col items-center justify-center lg:items-start">
                <div class="flex gap-x-2 items-center font-semibold text-2xl mt-2">
                    <h1 class="pr-2 border-r border-gray-200">{{ product.name}}</h1> 
                    <span class="text-base">{{ product.weight}}<Unit :unit-id="product.unit_id"></Unit></span>
                </div>
                <div class="text-sm">
                    {{product.base_price}} RON / <Vat :category-id="product.category_id"></Vat>
                </div>
                <div class="flex justify-center w-full mt-2 md:justify-start">
                    <Status :deleted-at="product.deleted_at"/>
                    <Category :category-id="product.category_id"></Category>
                    <Stock :quantity="product.quantity"></Stock>
                </div>
                <div class="flex items-center gap-x-2">   
                    <button 
                        @click="editProduct"
                        class="bg-amber-700 rounded-sm text-xs py-1 px-4 text-white mt-2 hover:bg-amber-600 active:bg-amber-400 active:shadow-inner active:outline-none"
                    >
                        Edit
                    </button>
                    <div v-if="canDisable">
                        <button 
                            v-if="product.deleted_at"
                            @click="restore"
                            class="bg-white border border-green-500 rounded-sm text-xs py-1 px-4 text-black hover:border-green-400 mt-2 active:shadow-inner active:outline-none"
                        >
                            Restore
                        </button>
                        <button 
                            v-else
                            @click="disable"
                            class="bg-white border border-red-500 rounded-sm text-xs py-1 px-4 text-black mt-2 hover:border-red-400 active:shadow-inner active:outline-none"
                        >
                            Disable
                        </button>
                    </div>
                    <button 
                        v-if="canDelete"
                        @click="callDeleteUser"
                        class="bg-red-700 rounded-sm text-xs py-1 px-4 text-white mt-2 hover:bg-red-600 active:bg-red-400 active:shadow-inner active:outline-none"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div> 
        <div v-if="hasDiscount" class="text-sm mb-2 pb-2 border-b border-gray-100">
            <h2 class="font-bold text-lg my-2">Discount</h2>
            <div>
                <div>
                    <span class="font-semibold">Code:</span> {{ product.discount.code }}
                </div>
                <div>
                    <span class="font-semibold">Value:</span> {{product.discount.value}}%
                </div>
                <div>
                   <span class="font-semibold">Interval:</span> {{ product.discountStartsAt}} > {{ product.discountEndsAt }}
                </div>
            </div>
           
        </div>
        <div class="text-sm mb-2 pb-2 border-b border-gray-100">
            <h2 class="font-bold text-lg my-2">Descriere</h2>
            {{product.description}}
        </div>
        <div v-if="product.hasIngredients">
            <h2 class="font-bold text-lg my-2">Ingredients</h2>
            <ul>
                <li 
                    v-for="ingredient in product.ingredients" :key="ingredient.id"
                    class="flex items-center gap-x-2"
                >
                    <div class="font-semibold text-sm">
                        {{ingredient.name}}
                    </div>
                    <div class="text-xs">
                       {{ingredient.quantity}} {{ingredient.unit.name}}
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
    // import ProductEdit from '../../components/products/EditProductComponent';
    import Category from '../../components/products/CategoryComponent';
    import Unit from '../../components/products/UnitComponent';
    import Vat from '../../components/products/VatComponent';

    import store from '../../store/index';
    import { mapGetters, mapActions } from 'vuex';

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

        computed: {
             ...mapGetters('Users', ['getLoggedUser']),

            canDelete() {
                if(this.getLoggedUser) {
                    return this.getLoggedUser.role_id === 7
                }
            },

            canDisable() {
                if(this.getLoggedUser) {
                    return this.getLoggedUser.role_id === 6 || this.getLoggedUser.role_id === 7              
                }
            },

            hasDiscount() {
                return this.product.discount ? true : false
            }
        },

        data() {
            return {
                editProductState: false,
                product: null,
            }
        },

        methods: {

            ...mapActions('Products', ['disableProduct', 'restoreProduct', 'deleteProduct']),
            
            updateProduct(product) {
                Object.keys(product).forEach(key => {         
                    this.product[key] = product[key];
                })
            },

            setProduct(product) {
                this.product = product;
            },

            editProduct() {
                this.$router.push({name: 'EditProduct', params: {id: this.product.id}})
            },

            async disable() {
                try {
                    this.$Progress.start();

                    const payload = {
                        vm: this,
                        id: this.product.id
                    }

                    const response = await this.disableProduct(payload);
                    this.product.deleted_at = response.deleted_at;

                    this.$Progress.finish();

                } catch ( error ) {
                    this.$Progress.fail()

                    console.log(error);
                }
            },

            async restore() {
                try {
                    this.$Progress.start()

                    const payload = {
                        vm: this,
                        id: this.product.id
                    }

                    const response = await this.restoreProduct(payload);
                    this.product.deleted_at = response.deleted_at;

                    this.$Progress.finish();

                } catch ( error ) {
                    this.$Progress.fail();
                    console.log(error);
                }
            },

            async callDeleteUser() {
                try {
                    this.$Progress.start();

                    await this.deleteProduct(this.product.id);
                    this.$router.push({name: 'Products'});

                    this.$Progress.finish();

                } catch ( error ) {
                    this.$Progress.fail();
                    console.log(error)
                }
            },

        },

        components: {
            ViewContainer,
            Stock,
            Status,
            // ProductEdit,
            Category,
            Unit,
            Vat
        }
    }
</script>