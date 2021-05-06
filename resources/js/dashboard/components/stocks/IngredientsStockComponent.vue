<template>
    <div class="w-full">
        <form class="flex flex-col gap-y-4 bg-white shadow rounded-sm p-5 md:flex-row md:items-center md:flex-1 gap-x-4 w-full lg:w-1/2 2xl:w-full">
            <InputGroup
                id="id"
                label="Id"
                :hasError="$v.filter.id.$error"
                :eclass="{'flex-1':true}"
            >
                <template v-slot:errors>
                    <p v-if="!$v.filter.id.integer">
                        The id field must be an integer
                    </p>
                    <p v-if="!$v.filter.id.minValue">
                        The id filed must be atleast 1
                    </p>
                </template>
                <Input 
                    v-model="filter.id"
                    id="id"
                    name="id" 
                    :class="{'border-red-600' : $v.filter.id.$error, 'border-green-600': $v.filter.id.$dirty && !$v.filter.id.$error}"
                    :disabled="searching || updating"  
                    @blur.native="$v.filter.id.$touch()"
                    @focus.native="clearName"
                />
            </InputGroup>

            <InputGroup
                id="name"
                label="Name"
                :hasError="$v.filter.name.$error"
                :eclass="{'flex-1':true}"
            >
                <template v-slot:errors>
                    <p v-if="!$v.filter.name.alphaSpaces">
                        The name field must contain only letters or spaces
                    </p>
                    <p v-if="!$v.filter.name.maxLength">
                        The name field must not be longer than 50 characters
                    </p>
                </template>
                <Input 
                    v-model="filter.name"
                    id="name"
                    name="name"  
                    :eclass="{'border-red-600' : $v.filter.name.$error, 'border-green-600': $v.filter.name.$dirty && !$v.filter.name.$error}"
                    :disabled="searching || updating"  
                    @blur.native="$v.filter.name.$touch()"
                    @focus.native="clearId"
                />
            </InputGroup>

            <Button 
                type="primary"
                :disabled="disableSearchButton"
                :waiting="searching"
                @click.native.prevent="findIngredient"
                eclass="mt-6"
            >
                Search
            </Button>
        </form>

        <div v-if="getIngredientStockDetails" class="mt-4 flex flex-col bg-white shadow rounded-sm p-5 md:flex-1">
            <h2 class="text-xl font-semibold my-2">
                <span>{{getIngredientStockDetails.name}}</span>
            </h2>
            <form>
                <div class="flex gap-2">
                    <InputGroup
                        id="stock"
                        label="Stock"
                        :eclass="{'flex-1':true}"
                    >
                        <Input 
                            v-model="getIngredientStockDetails.quantity"
                            id="stock"
                            name="stock"      
                            :disabled="true"
                        />
                    </InputGroup>
                    <InputGroup 
                        id="unit"
                        label="unit"
                        :eclass="{'flex-1':true}"
                    >
                        <Input 
                            v-model="getIngredientStockDetails.unit"
                            id="unit"
                            name="unit"   
                            :disabled="true"
                        />
                    </InputGroup>
                    <InputGroup
                        id="quanity"
                        label="Quanity"
                        :hasError="$v.newQuantity.$error"
                        :eclass="{'flex-1':true}"
                    >
                        <template v-slot:errors>
                            <p v-if="!$v.newQuantity.required">
                                The quantity field is required
                            </p>
                            <p v-if="!$v.newQuantity.integer">
                                The quantity must be an integer
                            </p>
                        </template>
                        <Input    
                            v-model="newQuantity"
                            id="quanity"
                            name="quanity"
                            :eclass="{'border-red-600' : $v.newQuantity.$error, 'border-green-600': $v.newQuantity.$dirty && !$v.newQuantity.$error}"
                            :disabled="updating"
                            @blur.native="$v.newQuantity.$touch()"
                        />
                    </InputGroup> 
                </div>
                <div class="mt-5 flex gap-x-4 md:justify-start">
                    <Button 
                        type="primary"
                        :disabled="updating || refreshing"
                        :waiting="updating"  
                        @click.native.prevent="submit"
                    >
                        Update
                    </Button>
                    <Button 
                        v-if="getIngredientStockDetails"
                        @click.native.prevent="clear"
                        type="secondary"
                        :disable="updating || refreshing"
                    >                       
                        Clear
                    </Button>
                </div>
            </form>
        </div>

        <Button 
            type="secondary"
            v-if="getIngredientStockDetails"
            @click.native="findIngredient"
            eclass="mt-4"
            :disabled="refreshing"
            :waiting="refreshing"
        >                       
            Refresh
        </Button>
    </div>
    
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';

    import { required, integer, minValue, maxLength } from 'vuelidate/lib/validators'
    import { alphaSpaces } from '../../validators/index';

    import Input from '../inputs/TextInputComponent';
    import InputGroup from '../inputs/InputGroupComponent';
    import Button from '../buttons/ButtonComponent';

    import _debounce from 'lodash/debounce'

    export default {

        async mounted() {

            if(this.getIngredientStockDetails && (this.getIngredientStockDetails.id === this.$route.params.id || this.getIngredientStockDetails.name === this.$route.params.name )) {
                this.filter.id = this.getIngredientStockDetails.id;
                this.filter.name = this.getIngredientStockDetails.name
            } else {
                if(this.$route.params.id) {
                    this.clearIngredientStockDetails();
                    this.filter.id = this.$route.params.id;
                    await this.findIngredient();
                    
                } else if (this.$route.params.name) {
                    this.clearIngredientStockDetails();
                    this.filter.name = this.$route.params.name;
                    await this.findIngredient();
                }
            }
        },

        destroyed() {
            if(this.getProductStockDetails === null) {
                this.clearIngredientStockDetails();
            }
        },

        computed: {
            ...mapGetters('Stocks', ['getIngredientStockDetails', 'getProductStockDetails']),

            disableSearchButton() {
                return this.filter.id.length === 0 && this.filter.name.length === 0
            },
        },

        data() {
            return {
                searching: false,
                updating: false,
                refreshing: false,

                newQuantity: '',

                filter: {
                    id: '',
                    name: '',
                },

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
            ...mapActions('Stocks', ['clearIngredientStockDetails', 'updateStock','downloadIngredientStockDetails']),

            async findIngredient() {
                try {
                    this.$Progress.start();

                    if(this.getIngredientStockDetails) {
                        this.refreshing = true;
                    } else {
                        this.searching = true;
                    }

                    if(this.filter.id) {
                        this.$v.filter.id.$touch();
                        if(!this.$v.filter.id.$invalid) {
                            await this.downloadIngredientStockDetails(this.filter.id);
                        }
                    } else {
                        this.$v.filter.name.$touch()
                        if(!this.$v.filter.name.$invalid) {
                            await this.downloadIngredientStockDetails(this.filter.name)
                        }
                    }

                    if(this.getIngredientStockDetails) {
                        this.refreshing = false;
                        this.searching = false;
                    } else {
                        this.searching = false;
                    }

                    this.$Progress.finish();
                } catch ( error ) {
                    this.clearIngredientStockDetails();
                    if(error.response && error.response.status === 404) {
                        this.openNotification({
                            type: 'err',
                            show: true,
                            message: 'No ingredient found'
                        });
                    }
                    // this.$v.filter.$touch();
                   if(this.getIngredientStockDetails) {
                        this.refreshing = false;
                    } else {
                        this.searching = false;
                    }
                    this.$Progress.fail();
                }
            },

            async submit() {
                this.$v.newQuantity.$touch();

                if(!this.$v.newQuantity.$invalid) {
                    try {
                        this.updating = true;
                        this.$Progress.start();

                        const payload = {
                            id: this.getIngredientStockDetails.id,
                            data: {
                                type: 'ingredient',
                                newQuantity: this.newQuantity
                            }
                        }

                        const response = await this.updateStock(payload);

                        this.newQuantity = '';

                        this.$Progress.finish();
                        this.updating = false;
                        
                        this.$v.newQuantity.$reset();
                        this.openNotification({
                            type: 'ok',
                            message: response.data.message,
                            show: true
                        });
                            
                    } catch ( error ) {
                        this.updating = false;
                        this.$v.newQuantity.$touch();
                        this.$Progress.fail();
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
                this.filter = {
                    id: '',
                    name: ''
                };

                this.clearIngredientStockDetails();

                this.$v.$reset();

                if(this.$route.params.id) {
                    this.$router.replace({name: 'IngredientsStock'})
                }
            }
        },

        components: {
            Input,
            InputGroup,
            Button
        }
    }

</script>
                InputGroupComponent