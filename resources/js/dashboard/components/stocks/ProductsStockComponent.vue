<template>
    <div class="w-full">
        <div ref="observer">
            <form class="flex items-center gap-x-4 bg-white shadow rounded-sm p-5 md:flex-1">
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
                        :disabled="searching"
                        @blur.native="$v.barcode.$touch()"
                    />
                </InputGroup>
                <Button 
                    type="primary"
                    :disabled="disableSearchButton"
                    :waiting="searching"
                    eclass="mt-6"
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
                            :eclass="{'border-red-600' : $v.newQuantity.$error, 'border-green-600': $v.newQuantity.$dirty && !$v.newQuantity.$error}"
                            :disabled="updating || canNotUpdate"
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
                        :disabled="updating" 
                        :waiting="updating"
                        @click.native.prevent="submit" 
                    >
                        Update
                    </Button>
                    <Button
                        type="secondary"
                        :disabled="updating || refreshing" 
                        @click.native.prevent="clear" 
                    >
                        Clear
                    </Button>
                </div>
            </form>
        </div>
        <Button 
            type="secondary"
            v-if="getProductStockDetails"
            @click.native="findProduct"
            eclass="mt-4"
            :disabled="refreshing || updating"
            :waiting="refreshing"
        >                       
            Refresh
        </Button>

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
                searching: false,
                updating: false,
                refreshing: false,
                barcode: '',
                newQuantity: ''
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

                        if(this.getProductStockDetails) {
                            this.refreshing = true;
                        } else {
                            this.searching = true;
                        }
                                             
                        await this.downloadProductStockDetails(this.barcode);
          
                        if(this.getProductStockDetails) {
                            this.refreshing = false;
                            this.searching = false;
                        } else {
                            this.searching = false;
                        }

                    } catch ( error ) {
                        if(error.response && error.response.status == '404') {
                            this.openNotification({
                                type: 'err',
                                message: error.response.data.message,
                                show: true
                            });
                        }

                        if(this.getProductStockDetails) {
                            this.refreshing = false;
                            this.searching = false;
                        } else {
                            this.searching = false;
                        }

                    }
                }
            },

            async submit() {
                this.$v.newQuantity.$touch();

                if(!this.$v.newQuantity.invalid) {
                    try {
                        if(parseInt(this.newQuantity) !== 0) {

                            this.updating = true; 
                        
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

                            this.updating = false;

                            this.openNotification({
                                type: 'ok',
                                message: response.data.message,
                                show: true
                            });
                        } else {
                            this.updating = false;
                            this.openNotification({
                                type: 'info',
                                message: 'Quantity must be less or greater than 0',
                                show: true
                            });
                        }
                    } catch ( error ) {
                        if(error.response && error.response.data.errors) {
                            this.$v.newQuantity.$touch();
                        }
                        this.openNotification({
                            type: 'err',
                            message: 'Something went wrong',
                            show: true
                        });
                        this.updating = false;
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