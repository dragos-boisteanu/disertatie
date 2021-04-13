<template>
    <div class="w-full">
        <ValidationObserver ref="observer">
            <form class="flex flex-col bg-white shadow rounded-sm p-5 md:flex-1">
                <ValidationProvider 
                    vid="barcode" 
                    rules="required"
                    v-slot="{ errors, failed, passed }"
                    class="w-full"
                >
                    <label for="name" class="text-sm font-semibold">Barcode</label>
                    <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                    <div class="flex gap-x-3 items-center relative flex-1">
                        <input 
                            id="barcode"
                            name="barcode" 
                            type="text"
                            v-model="barcode"
                            class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                            :class="{'border-red-600': failed, 'border-green-500' : passed}"
                            :disabled="waiting"
                            @input="findProduct"
                        />
                        <svg  v-if="waiting" class="animate-spin mr-3 h-5 w-5 text-lightBlue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                </ValidationProvider>
            </form>
        </ValidationObserver>

        <div v-if="product" class="mt-4 flex flex-col bg-white shadow rounded-sm p-5 md:flex-1">
            <h2 class="text-xl font-semibold my-2">
                <span>{{product.name}}</span> <span>{{product.weight}}</span> <span>{{product.unit}}</span>
            </h2>

            <ValidationObserver v-slot="{ handleSubmit }" ref="updateForm">
                <form @submit.prevent="handleSubmit(submit)">
                    <div class="flex gap-2">
                        <div class="flex-1">
                            <label for="quantity" class="text-sm font-semibold">Stock quantity</label>
                            <div class="mb-1"></div>
                            <div class="flex gap-x-3 items-center relative flex-1">
                                <input 
                                    id="quantity"
                                    name="quantity" 
                                    type="text"   
                                    v-model="product.quantity"
                                    class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                                    :disabled="true"
                                />
                            </div>
                        </div>
                        <ValidationProvider 
                            vid="newQuantity" rules="required|integer" 
                            v-slot="{ errors, failed, passed }" 
                            class="flex-1"
                        >
                            <label for="newQuantity" class="text-sm font-semibold">Quantity</label>
                            <div class="text-xs text-red-600 font-semibold mb-1" v-show="errors"> {{ errors[0] }}</div>
                            <div class="flex gap-x-3 items-center relative flex-1">
                                <input 
                                    id="newQuantity"
                                    name="new quantity" 
                                    type="text"   
                                    v-model="newQuantity"
                                    class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                                    :class="{'border-red-600': failed, 'border-green-500' : passed}"
                                    :disabled="waiting || canNotUpdate"
                                />
                            </div>
                        </ValidationProvider> 
                    </div>
                    <div class="mt-5 flex gap-x-4 md:justify-start">
                        <button
                            v-if="!canNotUpdate"  
                            type="submit"
                            :disabled="waiting"  
                            class="inline-flex items-center justify-center px-2 py-1 w-full text-base text-white bg-green-600 rounded-sm active:shadow-inner active:bg-green-500 md:w-auto disabled:bg-gray-500 disabled:pointer-events-none"
                        >
                            <svg v-if="waiting" class="animate-spin mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                
                            <span>
                                Update
                            </span>
                        </button>
                        <button 
                            @click.prevent="clear"
                            class=" mb-3 inline-flex items-center justify-center px-2 py-1 w-full text-base text-white bg-lightBlue-600 rounded-sm active:shadow-inner active:bg-lightBlue-500 md:w-auto md:mb-0"
                        >                       
                            Clear
                        </button>
                    </div>
                </form>
            </ValidationObserver>

            <div v-if="hasIngredients" class="mt-4">
                <h3 class="font-semibold text-lg my-2">
                    Ingredients
                </h3>
                <ul>
                    <li v-for="ingredient in product.ingredients" :key="ingredient.id">
                        <span>{{ ingredient.name}}</span> <span>{{ingredient.quantity}}</span> <span>{{ingredient.unit.name}}</span> 
                        <router-link :to="{name: 'IngredientsStock', params: {id: ingredient.id}}" class="ml-5 text-sm text-lightBlue-600 hover:underline hover:text-lightBlue-400">View</router-link>
                    </li>
                </ul>
            </div>
        </div>
        <button 
            v-if="product"
            @click="findProduct"
            class="mt-4 inline-flex items-center justify-center px-2 py-1 w-full text-base text-white bg-lightBlue-600 rounded-sm active:shadow-inner active:bg-lightBlue-500 md:w-auto md:mb-0"
        >                       
            Refresh
        </button>

    </div>
</template>

<script>
    import _debounce from 'lodash/debounce';
    import { mapActions, mapGetters } from 'vuex';
    import { updateStock, downloadProduct } from '../../api/stocks.api';

    import Unit from '../products/UnitComponent';

    export default {

        mounted() {
            if(this.$route.params.barcode) {
                this.barcode = this.$route.params.barcode;
                this.findProduct();
            }
        },

        computed: {
            ...mapGetters('Units', ['getUnits']),

            canNotUpdate() {
                return this.product.hasIngredients === 1
                
            },

            hasIngredients() {
                return this.product.hasIngredients === 1 && this.product.ingredients.length > 0;
            }
        },

        data() {
            return {
                waiting: false,
                waitingForProduct: false,
                barcode: '',
                product: null,
                newQuantity: 0
            }
        }, 
        
        methods: {
            ...mapActions('Notification', ['openNotification']),

            findProduct: _debounce(async function() {
                try {
                    console.log(this.$refs.observer.errors)
                    if(this.barcode.length > 0) {
                        this.$Progress.start();
                        this.waiting = true;
                        
                        const response = await downloadProduct(this.barcode);
                        this.product = response.data.data;
                        
                        this.waiting = false;
                        this.$Progress.finish();

                    }
                             
                } catch ( error ) {
                    if(error.response) {
                        if(error.response.status == '404') {
                            this.openNotification({
                                type: 'err',
                                message: error.response.data.message,
                                show: true
                            });
                        }
                    }
                    this.waiting = false;
                    this.$Progress.fail();
                    console.log(error)
                    this.product = null;
                }
            }, 250),

            async submit() {
                try {
                    if(this.newQuantity !== 0) {
                        this.$Progress.start();
                        this.waiting = true;
                       
                        const payload = {
                            id: this.product.id,
                            data: {
                                type: 'product',
                                newQuantity: this.newQuantity
                            }
                        }

                        const response = await updateStock(payload);
                        this.product.quantity = parseInt(response.data.quantity);
                        this.newQuantity = 0;

                        this.waiting = false;
                        this.$Progress.finish();

                        this.openNotification({
                            type: 'ok',
                            message: response.data.message,
                            show: true
                        });
                    } else {
                        this.waiting = false;
                        this.$Progress.fail();
                        this.openNotification({
                            type: 'info',
                            message: 'Quantity must be less or greater than 0',
                            show: true
                        });
                    }
                    
                } catch ( error ) {
                    console.log(error)
                }
            },

            clear() {
                this.$refs.observer.reset();
                this.product = null;
                this.barcode = '';

                if(this.$route.params.barcode) {
                    this.$router.replace({name: 'ProuductsStock'})
                }
            }
        },

        components: {
            Unit
        }

    }
</script>