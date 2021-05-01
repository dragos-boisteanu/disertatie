<template>
    <div class="w-full">
        <form @submit.prevent="findIngredient" class="flex flex-col gap-y-4 bg-white shadow rounded-sm p-5 md:flex-row md:items-center md:flex-1 gap-x-4 w-full lg:w-1/2 2xl:w-full">
            <div class="flex-1" >
                <label for="name" class="text-sm font-semibold">Id</label>
                <div class="text-xs text-red-600 font-semibold mb-1" v-if="$v.filter.id.$error">
                    <p v-if="!$v.filter.id.integer">
                        The id field must be an integer
                    </p>
                    <p v-if="!$v.filter.id.minValue">
                        The id filed must be atleast 1
                    </p>
                </div>
                <input 
                    id="id"
                    name="id" 
                    type="text" 
                    v-model="filter.id" 
                    class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"
                    :class="{'border-red-600' : $v.filter.id.$error, 'border-green-600': $v.filter.id.$dirty && !$v.filter.id.$error}"
                    :disabled="waiting"  
                    @blur="$v.filter.id.$touch()"
                    @focus="clearName"
                />
            </div>

            <div class="flex-1">
                <label for="name" class="text-sm font-semibold">Name</label>
                <div class="text-xs text-red-600 font-semibold mb-1" v-if="$v.filter.name.$error">
                    <p v-if="!$v.filter.name.alphaSpaces">
                        The name field must contain only letters or spaces
                    </p>
                    <p v-if="!$v.filter.name.maxLength">
                        The name field must not be longer than 50 characters
                    </p>
                </div>
                <div class="flex gap-x-3 items-center relative flex-1">
                    <input 
                        id="name"
                        name="name" 
                        type="text" 
                        v-model="filter.name" 
                        class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"
                        :class="{'border-red-600' : $v.filter.name.$error, 'border-green-600': $v.filter.name.$dirty && !$v.filter.name.$error}"
                        :disabled="waiting"  
                        @blur="$v.filter.name.$touch()"
                        @focus="clearId"
                    />
                </div>
            </div>

            <button 
                type="submit"
                :disabled="waiting || disableSearchButton"
                class="inline-flex items-center justify-center mt-6 px-2 py-1 w-full text-base text-white bg-green-600 rounded-sm active:shadow-inner active:bg-green-500 md:w-auto disabled:bg-gray-500 disabled:pointer-events-none"
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

        <div v-if="ingredient" class="mt-4 flex flex-col bg-white shadow rounded-sm p-5 md:flex-1">
            <h2 class="text-xl font-semibold my-2">
                <span>{{ingredient.name}}</span>
            </h2>
            <form @submit.prevent="submit">
                <div class="flex gap-2">
                    <div class="flex-1">
                        <label for="name" class="text-sm font-semibold">Stock</label>
                        <div class="mb-1"></div>
                        <input 
                            id="quantity"
                            name="quantity" 
                            type="text"   
                            v-model="ingredient.quantity"
                            class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                            :disabled="true"
                        />
                    </div>
                    <div class="flex-1">
                        <label for="unit" class="text-sm font-semibold">Unit</label>
                        <div class="mb-1"></div>
                        <input 
                            id="unit"
                            name="unit" 
                            type="text"   
                            v-model="ingredient.unit"
                            class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                            :disabled="true"
                        />
                    </div>
                    <div class="flex-1" >
                        <label for="name" class="text-sm font-semibold">Quantity</label>
                        <input 
                            id="newQuantity"
                            name="new quantity" 
                            type="text"   
                            v-model="newQuantity"
                            class="w-full mt-1 text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"
                            :class="{'border-red-600' : $v.newQuantity.$error, 'border-green-600': $v.newQuantity.$dirty && !$v.newQuantity.$error}"
                            :disabled="waiting"
                            @blur="$v.newQuantity.$touch()"
                        />
                        <div class="text-xs text-red-600 font-semibold mt-1" v-if="$v.newQuantity.$error">
                            <p v-if="!$v.newQuantity.required">
                                The quantity field is required
                            </p>
                            <p v-if="!$v.newQuantity.integer">
                                The quantity must be an integer
                            </p>
                        </div>
                    </div> 
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
                        class="inline-flex items-center justify-center px-2 py-1 w-full text-base text-white bg-lightBlue-600 rounded-sm active:shadow-inner active:bg-lightBlue-500 md:w-auto disabled:bg-gray-500 disabled:pointer-events-none"
                    >                       
                        Clear
                    </button>
                </div>
            </form>
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
    import { downloadIngredientStockDetails, updateStock } from '../../api/stocks.api'
    import { mapActions } from 'vuex';

    import { required, integer, minValue, maxLength } from 'vuelidate/lib/validators'
    import { alphaSpaces } from '../../validators/index';

    import _debounce from 'lodash/debounce'

    export default {

        async mounted() {
            if(this.$route.params.id) {
                this.filter.id = this.$route.params.id;
                await this.findIngredient();
            }
        },

        computed: {
            disableSearchButton() {
                return this.filter.id.length === 0 && this.filter.name.length === 0
            },

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

        validations: {
            filter: {
                id:{
                    integer,
                    minValue: minValue(1)
                },
                name: {
                    alphaSpaces,
                    maxLength: maxLength(50)
                    
                }
            },
            newQuantity: {
                required,
                integer
            }
        },

        methods: {
            ...mapActions('Notification', ['openNotification']),

            async findIngredient() {
            
                if(true) {
                    console.log('here2')
                    try {
                        this.$Progress.start();

                        let response = null;

                        if(this.filter.id.length > 0) {
                            console.log('here1')
                            this.$v.filter.id.$touch();
                            if(!this.$v.filter.id.$invalid) {
                                response = await downloadIngredientStockDetails(this.filter.id);
                            }
                            
                        } else {
                            console.log('here')
                            this.$v.filter.name.$touch()
                            if(!this.$v.filter.name.$invalid) {
                                response = await downloadIngredientStockDetails(this.filter.name)
                            }
                        }

                        if(response) {
                            this.ingredient = response.data.data;
                            this.$v.newQuantity.$reset();
                        }

                        this.$Progress.finish();
                    } catch ( error ) {
                        if(error.response && error.response.status === 404) {
                            this.openNotification({
                                type: 'err',
                                show: true,
                                message: 'No ingredient found'
                            });
                        }
                        // this.$v.filter.$touch();
                        this.$Progress.fail();
                    }
                }
            },

            async submit() {
                this.$v.newQuantity.$touch();

                if(!this.$v.newQuantity.$invalid) {
                    try {
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
                            
                    } catch ( error ) {
                        this.$v.newQuantity.$touch();
                        this.$Progress.fail();
                        console.log(error)
                    }
                }
            },

            clearId() {
                this.filter.id = ""
                this.$v.filter.id.$reset();
            },

            clearName() {
                this.filter.name = ""
                this.$v.filter.name.$reset();
            },

            clear() {
                this.ingredient = null;
                this.filter = {
                    id: '',
                    name: ''
                };

                this.$v.$reset();

                if(this.$route.params.id) {
                    this.$router.replace({name: 'IngredientsStock'})
                }
            }
        }
    }

</script>