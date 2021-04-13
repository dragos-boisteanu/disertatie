<template>
    <div class="w-full">
        <ValidationObserver v-slot="{ handleSubmit }" ref="observer" >
            <form @submit.prevent="handleSubmit(findIngredient)" class="flex flex-col gap-y-4 bg-white shadow rounded-sm p-5 md:flex-row md:items-center md:flex-1 gap-x-4 w-full lg:w-1/2 2xl:w-full">
                <ValidationProvider 
                    vid="id" rules="integer" 
                    v-slot="{ errors, failed, passed }" 
                    
                    class="flex-1"
                >
                    <label for="name" class="text-sm font-semibold">Id</label>
                    <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                    <div class="flex gap-x-3 items-center relative flex-1">
                        <input 
                            id="id"
                            name="id" 
                            type="text" 
                            v-model="filter.id"
                            :disabled="waiting"   
                            class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                            :class="{'border-red-600': failed, 'border-green-500' : passed}"
                        />
                        
                    </div>
                </ValidationProvider>

                <ValidationProvider 
                    vid="name" rules="alpha_spaces" 
                    v-slot="{ errors, failed, passed }" 
                    class="flex-initial"
                >
                    <label for="name" class="text-sm font-semibold">Name</label>
                    <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                    <div class="flex gap-x-3 items-center relative flex-1">
                        <input 
                            id="name"
                            name="name" 
                            type="text" 
                            v-model="filter.name"
                            :disabled="waiting"   
                            class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                            :class="{'border-red-600': failed, 'border-green-500' : passed}"
                        />
                    </div>
                </ValidationProvider>

                <button 
                    type="submit"
                    :disabled="waiting"
                    class="inline-flex items-center justify-center mt-7 px-2 py-1 w-full text-base text-white bg-green-600 rounded-sm active:shadow-inner active:bg-green-500 md:w-auto disabled:bg-gray-500 disabled:pointer-events-none"
                >
                    <svg v-if="waiting" class="animate-spin mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
        
                    <span>
                        Search
                    </span>
                </button>
                
            </form>
        </ValidationObserver>

        <div v-if="ingredient" class="mt-4 flex flex-col bg-white shadow rounded-sm p-5 md:flex-1">
            <h2 class="text-xl font-semibold my-2">
                <span>{{ingredient.name}}</span>
            </h2>

            <ValidationObserver v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(submit)">
                    <div class="flex gap-2">
                        <div class="flex-1">
                            <label for="name" class="text-sm font-semibold">Stock quantity</label>
                            <div class="mb-1"></div>
                            <div class="flex gap-x-3 items-center relative flex-1">
                                <input 
                                    id="quantity"
                                    name="quantity" 
                                    type="text"   
                                    v-model="ingredient.quantity"
                                    class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                                    :disabled="true"
                                />
                            </div>
                        </div>
                        <div class="flex-1">
                            <label for="unit" class="text-sm font-semibold">Unit</label>
                            <div class="mb-1"></div>
                            <div class="flex gap-x-3 items-center relative flex-1">
                                <input 
                                    id="unit"
                                    name="unit" 
                                    type="text"   
                                    v-model="ingredient.unit"
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
                            <label for="name" class="text-sm font-semibold">Quantity</label>
                            <div class="text-xs text-red-600 font-semibold mb-1" v-show="errors"> {{ errors[0] }}</div>
                            <div class="flex gap-x-3 items-center relative flex-1">
                                <input 
                                    id="newQuantity"
                                    name="new quantity" 
                                    type="text"   
                                    v-model="newQuantity"
                                    class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                                    :class="{'border-red-600': failed, 'border-green-500' : passed}"
                                    :disabled="waiting"
                                />
                            </div>
                        </ValidationProvider> 
                    </div>
                    <div class="mt-5 flex gap-x-4 md:justify-start">
                        <button 
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
                            v-if="ingredient"
                            @click.prevent="clear"
                            class=" mb-3 inline-flex items-center justify-center px-2 py-1 w-full text-base text-white bg-lightBlue-600 rounded-sm active:shadow-inner active:bg-lightBlue-500 md:w-auto md:mb-0"
                        >                       
                            Clear
                        </button>
                    </div>
                </form>
            </ValidationObserver>
        </div>

        <button 
            v-if="ingredient"
            @click="findIngredient"
            class="mt-4 inline-flex items-center justify-center px-2 py-1 w-full text-base text-white bg-lightBlue-600 rounded-sm active:shadow-inner active:bg-lightBlue-500 md:w-auto md:mb-0"
        >                       
            Refresh
        </button>
    </div>
    
</template>

<script>
    import { downloadIngredientById, downloadIngredientByName, updateStock } from '../../api/stocks.api';
    import _debounce from 'lodash/debounce'
import { mapActions } from 'vuex';

    export default {

        async mounted() {
            if(this.$route.params.id) {
                this.filter.id = this.$route.params.id;
                await this.findIngredient();
            }
        },

        data() {
            return {
                waiting: false,
                searchingForIngredientId: false,
                searchingForIngredientByName: false,

                newQuantity: 0,

                filter: {
                    id: '',
                    name: '',
                },

                ingredient: null
            }
        },

        methods: {
            ...mapActions('Notification', ['openNotification']),

            async findIngredient() {
                try {
                    this.$Progress.start();

                    let response = null;

                    if(this.filter.id) {
                        response = await downloadIngredientById(this.filter.id);
                    }

                    if(response) {
                        this.ingredient = response.data.data;
                    }

                    this.$Progress.finish();
                } catch ( error ) {
                   
                    this.$Progress.fail();
                    console.log(error);
                }
            },

            async submit() {
                try {
                    if(this.newQuantity !== 0) {
                        this.$Progress.start();

                        const payload = {
                            id: this.ingredient.id,
                            data: {
                                type: 'ingredient',
                                newQuantity: this.newQuantity
                            }
                        }

                        const response = await updateStock(payload);
                        this.ingredient.quantity = parseInt(response.data.quantity);
                        this.newQuantity = 0;

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
                    this.$Progress.fail();
                    console.log(error)
                }
            },

            clear() {
                this.$refs.observer.reset();
                this.ingredient = null;
                this.filter = {
                    id: '',
                    name: ''
                };

                if(this.$route.params.id) {
                    this.$router.replace({name: 'IngredientsStock'})
                }
            }
        }
    }

</script>