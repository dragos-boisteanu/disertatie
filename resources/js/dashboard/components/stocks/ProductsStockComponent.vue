<template>
    <div class="w-full">
        <div ref="observer">
            <form class="flex items-end gap-x-4 bg-white shadow rounded-sm p-5 md:flex-1">
                <InputGroup
                    id="barcode"
                    label="Barcode"
                    :hasError="$v.barcode.$error"
                    :eclass="{'flex-auto':true}"
                >
                    <template v-slot:errors>
                        <p v-if="!$v.barcode.required">
                            The barcode field is required  
                        </p>
                    </template>
                    <Input 
                        v-model="barcode"
                        id="barcode"
                        name="barcode" 
                        :class="{'border-red-600' : $v.barcode.$error, 'border-green-600': $v.barcode.$dirty && !$v.barcode.$error}"
                        :disabled="waiting"
                        @blur.native="$v.barcode.$touch()"
                    />
                </InputGroup>
                <Button 
                    type="primary"
                    :disabled="waiting || disableSearchButton"
                    :waiting="waiting"
                    :eclass="{'flex-0':true}"
                    @click.native.prevent="findProduct"
                >
                    Search
                </Button>
            </form>
        </div>

        <div v-if="getProductStockDetails" class="mt-4 flex flex-col bg-white shadow rounded-sm p-5 md:flex-1">
            <h2 class="text-xl font-semibold my-2">
                <span>{{getProductStockDetails.name}}</span> <span>{{getProductStockDetails.weight}}</span> <span>{{getProductStockDetails.unit}}</span>
            </h2>

            <div>
                <form>
                    <div class="flex gap-2">
                        <InputGroup
                            id="quantity"
                            label="Quantity"
                            :eclass="{'flex-1':true}"
                        >
                            <Input 
                                v-model="getProductStockDetails.quantity"
                                id="quantity"
                                name="quantity" 
                                :disabled="true"
                            />
                        </InputGroup>
                        <InputGroup
                            id="quantity"
                            label="Quantity"
                            :hasError="$v.newQuantity.$error"
                            :eclass="{'flex-1':true}"
                        >
                            <template v-slot:errors>
                                <p v-if="!$v.newQuantity.required">
                                    The new quantity field is required
                                </p>
                                <p v-if="!$v.newQuantity.integer">
                                    The new quantity field must be an integer
                                </p>
                            </template>
                            <Input 
                                v-model="newQuantity"
                                id="newQuantity"
                                name="new quantity"
                                :class="{'border-red-600' : $v.newQuantity.$error, 'border-green-600': $v.newQuantity.$dirty && !$v.newQuantity.$error}"
                                :disabled="waiting || canNotUpdate"
                                @blur.native="$v.newQuantity.$touch()"
                            />
                        </InputGroup> 
                    </div>
                    <div v-if="hasIngredients" class="mt-4">
                        <h3 class="font-semibold text-lg my-2">
                            Ingredients
                        </h3>
                        <ul>
                            <li v-for="ingredient in getProductStockDetails.ingredients" :key="ingredient.id">
                                <span>{{ ingredient.name}}</span> <span>{{ingredient.quantity}}</span> <span>{{ingredient.unit.name}}</span> 
                                <router-link :to="{name: 'IngredientsStock', params: {id: ingredient.id}}"  class="ml-5 text-sm text-lightBlue-600 hover:underline hover:text-lightBlue-400">View</router-link>
                            </li>
                        </ul>
                    </div>
                    <div class="mt-5 flex gap-x-4 md:justify-start">
                        <Button
                            v-if="!canNotUpdate"
                            type="primary"
                            :disabled="waiting" 
                            @click.native.prevent="submit" 
                        >
                            Update
                        </Button>
                        <Button
                            type="secondary"
                            :disabled="waiting" 
                            @click.native.prevent="clear" 
                        >
                            Clear
                        </Button>
                    </div>
                </form>
            </div>
        </div>
        <button 
            v-if="getProductStockDetails"
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

    import Unit from '../products/UnitComponent';
    import Input from '../inputs/TextInputComponent';
    import InputGroup from '../inputs/InputGroupComponent';
    import Button from '../buttons/ButtonComponent';

    import { required, integer, } from 'vuelidate/lib/validators'

    export default {
        async mounted() {
            if(this.$route.params.barcode) {
                this.resetStockStore();
                this.barcode = this.$route.params.barcode;
                await this.findProduct();
            } else if (this.getProductStockDetails) {
                this.barcode = this.getProductStockDetails.barcode;
            }
        },

        computed: {
            ...mapGetters('Units', ['getUnits']),
            ...mapGetters('Stocks', ['getProductStockDetails']),

            canNotUpdate() {
                return this.getProductStockDetails.hasIngredients === 1
            },

            hasIngredients() {
                return this.getProductStockDetails.hasIngredients === 1 && this.getProductStockDetails.ingredients.length > 0;
            },

            disableSearchButton() {
                return this.barcode && this.barcode.length === 0;
            },
        },

        data() {
            return {
                waiting: false,
                waitingForProduct: false,
                barcode: '',
                newQuantity: 0
            }
        }, 

        validations: {
            newQuantity: {
                required,
                integer
            },
            barcode: {
                required,
            }
        },
        
        methods: {
            ...mapActions('Notification', ['openNotification']),
            ...mapActions('Stocks', ['resetStockStore', 'updateStock', 'downloadProductStockDetails']),

            async findProduct() {
                this.$v.barcode.$touch();
                if(!this.$v.barcode.invalid) {
                    try {
                        this.$Progress.start();
                        this.waiting = true;
                        
                        await this.downloadProductStockDetails(this.barcode);
          
                        this.waiting = false;
                        this.$Progress.finish();
                    } catch ( error ) {
                        if(error.response && error.response.status == '404') {
                            this.openNotification({
                                type: 'err',
                                message: error.response.data.message,
                                show: true
                            });
                        }
                        this.waiting = false;
                        this.$Progress.fail();
                    }
                }
            },

            async submit() {
                this.$v.newQuantity.$touch();

                if(!this.$v.newQuantity.invalid) {
                    try {
                        if(this.newQuantity !== 0) {
                            this.$Progress.start();
                            this.waiting = true;
                        
                            const payload = {
                                id: this.getProductStockDetails.id,
                                data: {
                                    type: 'product',
                                    newQuantity: this.newQuantity
                                }
                            }

                            const response = await this.updateStock(payload);

                            this.newQuantity = '';

                            this.$v.newQuantity.$reset();

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
                        this.$Progress.fail();
                        if(error.response && error.response.data.errors) {
                            this.$v.newQuantity.$touch();
                        }
                        this.openNotification({
                            type: 'err',
                            message: 'Something went wrong',
                            show: true
                        });
                        this.waiting = false;
                        console.log(error)
                    }
                }
            },

            clear() {
                this.barcode = '';

                this.$v.$reset();

                this.resetStockStore();

                if(this.$route.params.barcode) {
                    this.$router.replace({name: 'ProuductsStock'})
                }
            }
        },

        components: {
            Unit,
            Input,
            InputGroup,
            Button
        }

    }
</script>