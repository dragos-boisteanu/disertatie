<template>
    <ViewContainer>

        <template slot="header">
            Add new product
        </template>

        <form @submit.prevent="submit" class="flex flex-col">
            <div class="flex flex-col lg:flex-row lg:items-start lg:gap-x-6 xl:w-9/12 2xl:w-2/4">
                <div class="flex flex-col gap-y-3 bg-white shadow rounded-sm p-5 lg:flex-1">

                    <!-- IMAGE UPLOAD -->
                    <ImageUploadComponent
                        :disabled="waiting || waitForFileUpload"
                        :clear="clearImage"
                        @waitForFileToUpload="toggleWaitForFileUpload"
                        @setImagePath="setImagePath"
                    ></ImageUploadComponent>

                    <div class="flex flex-col gap-y-4 md:flex md:flex-row md:items-center md:justify-between md:gap-x-4">
                        <InputGroup
                            id="barcode"
                            label="Barcode"
                            :hasError="$v.product.barcode.$error"
                            :eclass="{'flex-1': true}"
                        >
                            <template v-slot:errors> 
                                <p v-if="!$v.product.barcode.required">
                                    The barcode field is required
                                </p>
                            </template>
                            <div class="flex gap-x-3 items-center relative flex-1">
                                <Input 
                                    v-model="product.barcode"
                                    id="barcode"
                                    name="barcode" 
                                    :class="{'border-red-600' : $v.product.barcode.$error, 'border-green-600': $v.product.barcode.$dirty && !$v.product.barcode.$error}"   
                                    :disabled="waiting"
                                    @blur.native="getProduct"
                                    @input.native="$v.product.barcode.$touch()"
                                />
                                <svg v-show="checkingBarcode" class="animate-spin mr-3 h-5 w-5 text-lightBlue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </div>
                        </InputGroup>

                        <InputGroup
                            id="name"
                            label="Name"
                            :hasError="$v.product.name.$error"
                            :eclass="{'flex-1': true}"
                        >
                            <template v-slot:errors>
                                <p v-if="!$v.product.name.required">
                                    The name field is required
                                </p>
                                <p v-if="!$v.product.name.maxLength">
                                    The namme field must be shorter than 50 characters
                                </p>
                                <p v-if="!$v.product.name.alphaSpaces">
                                    The name field must contain only letters and spaces
                                </p>
                            </template>
                            <Input 
                                v-model="product.name" 
                                id="firstName"
                                name="first name"  
                                :class="{'border-red-600' : $v.product.name.$error, 'border-green-600': $v.product.name.$dirty && !$v.product.name.$error}"
                                :disabled="waiting" 
                                @input.native="$v.product.name.$touch()"
                            />
                        </InputGroup>
                    </div>

                    <InputGroup 
                        id="name"
                        label="Description"
                        :hasError="$v.product.description.$error"
                    >
                        <template v-slot:errors>
                            <p v-if="!$v.product.description.required">
                                The description field is required
                            </p>
                            <p v-if="!$v.product.description.maxLength">
                                The description field must be shorter than 255 characters
                            </p>
                            <p v-if="!$v.product.description.alphaNumSpaces">
                                The description field must contain only letters, numbers and spaces
                            </p>
                        </template>
                        <Textarea 
                            v-model="product.description" 
                            id="description"
                            name="description"
                            :eclass="{'border-red-600' : $v.product.description.$error, 'border-green-600': $v.product.description.$dirty && !$v.product.description.$error}"
                            :disabled="waiting"
                            @input.native="$v.product.description.$touch()"
                        />
                    </InputGroup>

                    <div class="flex flex-col gap-y-4 md:flex md:flex-row md:items-center md:justify-between md:gap-x-4">
                        <InputGroup
                            id="name"
                            label="Base price"
                            :hasError="$v.product.base_price.$error"
                            :eclass="{'flex-1': true}"
                        >
                            <template v-slot:errors>
                                <p v-if="!$v.product.base_price.required">
                                    The base price field is required
                                </p>
                            </template>
                            <Input
                                v-model="product.base_price" 
                                id="basePrice"
                                name="base price"     
                                :class="{'border-red-600' : $v.product.base_price.$error, 'border-green-600': $v.product.base_price.$dirty && !$v.product.base_price.$error}"
                                :disabled="waiting"
                                @input.native="$v.product.base_price.$touch()"  
                            />
                        </InputGroup>
                        <InputGroup
                            id="category"
                            label="Category"
                            :hasError="$v.product.category_id.$error"
                            :eclass="{'flex-1': true}"
                        >
                            <template v-slot:errors>
                                <p v-if="!$v.product.category_id.error">
                                    The category field is required
                                </p>
                            </template>
                            <Select 
                                v-model="product.category_id" 
                                id="unit_id"
                                name="category"
                                :class="{'border-red-600' : $v.product.category_id.$error, 'border-green-600': $v.product.category_id.$dirty && !$v.product.category_id.$error}"
                                :disabled="waiting"  
                                @blur.native="$v.product.category_id.$touch()"
                            >
                                <option value="" disabled>Select category</option>
                                <option :value="category.id" v-for="category in getCategories" :key="category.id">{{ category.name }} ({{ category.vat}}% VAT)</option>
                            </Select>
                        </InputGroup>
                    </div>

                    <div class="flex flex-col gap-y-4 md:flex md:flex-row md:items-center md:justify-between md:gap-x-4">
                        <InputGroup
                            id="weight"
                            label="Weight"
                            :hasError="$v.product.weight.$error"
                            :eclass="{'flex-1': true}"
                        >
                            <template v-slot:errors>
                                <p v-if="!$v.product.weight.required">
                                    The weight field is required
                                </p>
                            </template>
                            <Input 
                                v-model="product.weight" 
                                id="weight"
                                name="weight"                               
                                :eclass="{'border-red-600' : $v.product.weight.$error, 'border-green-600': $v.product.weight.$dirty && !$v.product.weight.$error}"
                                :disabled="waiting" 
                                @input.native="$v.product.weight.$touch()"
                            />
                        </InputGroup>
                        <InputGroup
                            id="unitId"
                            label="Weight units"
                            :hasError="$v.product.unit_id.$error"
                            :eclass="{'flex-1': true}"
                        >
                            <template v-slot:errors>
                                <p v-if="!$v.product.unit_id.required">
                                    The weight unit field is required
                                </p>
                            </template>
                            <Select     
                                v-model="product.unit_id"
                                id="unit_id"
                                name="unitId"     
                                :eclass="{'border-red-600' : $v.product.unit_id.$error, 'border-green-600': $v.product.unit_id.$dirty && !$v.product.unit_id.$error}"          
                                :disabled="waiting" 
                                @blur.native="$v.product.unit_id.$touch()"
                                
                            >
                                <option value="" disabled>Select unit</option>
                                <option :value="unit.id" v-for="unit in getUnits" :key="unit.id">{{unit.name}} ({{ unit.description }})</option>
                            </Select>
                        </InputGroup>
                    </div>

                    <InputGroup
                        id="discount"
                        label="Discount"
                    >
                        <Select 
                            v-model="product.discountId" 
                            id="discount"
                            name="discount"
                        >
                            <option value="" selected>Select discount</option>
                            <option 
                                v-for="availableDiscount in availableDiscounts" 
                                :key="availableDiscount.id"
                                :value="availableDiscount.id"
                                class="flex items-center gap-x-3 disabled:bg-gray-100"
                            >
                                <span>
                                    {{ availableDiscount.code }}
                                </span> 
                                <span>
                                    {{ availableDiscount.value }}%
                                </span>
                            </option>
                        </Select>
                    </InputGroup>

                    <!-- INGREDIENTS -->
                    <IngredientsComponent
                        :ingredients="product.ingredients"
                        @saved="saveIngredient"
                        @removed="removeIngredient"
                    ></IngredientsComponent>
                    
                </div>
            </div>
        
            <div class="mt-5 flex md:justify-start">
                <Button 
                    type="primary"
                    :disabled="waiting || waitForFileUpload"  
                    :waiting="waiting"
                    @click.native.prevent="submit"
                >
                    Submit
                </Button>
            </div>
        </form>
    </ViewContainer>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';

    import ViewContainer from '../ViewContainer';
    
    import ImageUploadComponent from '../../components/ImageUploadComponent';
    import IngredientsComponent from '../../components/products/IngredientsComponent';

    import Input from '../../components/inputs/TextInputComponent';
    import Select from '../../components/inputs/SelectInputComponent';
    import Textarea from '../../components/inputs/TextareaInputComponent';
    import InputGroup from '../../components/inputs/InputGroupComponent';

    import Button from '../../components/buttons/ButtonComponent';

    import _debounce from 'lodash/debounce';
    import _find from 'lodash/find';
    import _filter from 'lodash/filter';
    import _findIndex from 'lodash/findIndex';

    import { required, integer, decimal, maxLength } from 'vuelidate/lib/validators'
    import { alphaSpaces, alphaNumSpaces } from '../../validators/index';

    import { storeProduct } from '../../api/products.api';

    export default {

        computed: {
            ...mapGetters('Categories', ['getCategories']),
            ...mapGetters('Units', ['getUnits']),
            ...mapGetters('Ingredients', ['getIngredients']),
            ...mapGetters('Discounts', ['getDiscounts']),

            availableDiscounts() {
                return this.getDiscounts.filter(discount => discount.deletedAt === null);
            }
        },

        data() {
            return {
                checkingBarcode: false,
                waiting: false,
                waitForFileUpload: false,

                ingredientInput: '',
                foundIngredients: [],
        
                clearImage: false,

                product: {
                    barcode: '',
                    name:'',
                    description: '',
                    base_price: '',
                    weight: '',
                    unit_id: '',
                    category_id: '',
                    ingredients: [],
                    hasIngredients: false,
                    discountId: ''
                },
            }
        },

        validations: {
            product: {
                barcode: {
                    required
                },
                name: {
                    required,
                    maxLength: maxLength(50),
                    alphaSpaces
                },
                description: {
                    required,
                    maxLength: maxLength(255),
                    alphaNumSpaces
                },
                base_price: {
                    required,
                    decimal
                },
                weight: {
                    required,
                },
                unit_id: {
                    required,
                    integer
                },
                category_id: {
                    required,
                },
            }
        },

        methods: {
            ...mapActions('Products', ['addProduct', 'getProductByBarcode']),
            ...mapActions('Notification', ['openNotification']),

            async submit() {

                this.$v.$touch();

                if(!this.$v.$invalid) {
                    try {           
                        this.waiting = true;

                        const payload = {}

                        if(this.checkingBarcode) {
                            payload.barcode = this.product.barcode;
                        } else {
                            Object.keys(this.product).forEach(key => {
                                payload[key] = this.product[key];
                            })
                        }

                        if(payload.discount === null) {
                            delete payload.discount
                        }

                        if(payload.ingredients.length === 0) {
                            delete payload.ingredients
                        }

                        await storeProduct(payload);

                        this.product = {
                            barcode: '',
                            name:'',
                            description: '',
                            base_price: '',
                            weight: '',
                            unit_id: '',
                            quantity: '',
                            category_id: '',
                            ingredients: [],
                            discount: null,
                        },

                        this.waiting = false;
                        
                        this.clearImage = true;

                        this.openNotification({
                            type: 'ok',
                            show: true,
                            message: 'Product added'
                        })

                        this.$v.$reset();

                    } catch ( error ) {

                        console.log(error)

                        this.waiting = false

                        if(error.response && error.response.data.errors) {
                            this.$v.$touch();
                        }
                    }
                }
            },
 
            getProduct: _debounce( async function() {
                try {
                    // this.checkingBarcode = true;
                    // if(this.$refs.observer.errors['barcode'].length === 0) {
                    //     this.waiting = true;
                    //     const response = await this.getProductByBarcode(this.product.barcode);
                    //     if(response.data) {
                    //         this.product = response.data.data;
                    //     } else {
                    //         this.waiting = false;
                    //     }
                    //     this.checkingBarcode = false;
                    // } else {
                    //     this.checkingBarcode = false;
                    //     this.waiting = false;
                    // }              
                } catch (error) { 
                    console.log(error)
                }
            }, 500),

            toggleWaitForFileUpload(waitForFileToUpload) {
                console.log(waitForFileToUpload);
                this.waitForFileUpload = waitForFileToUpload;
            },

            setImagePath(imagePath) {
                this.product.image = imagePath;
            },

            saveIngredient(ingredient) {
                const ingredientIndex = _findIndex(this.product.ingredients, ['id', parseInt(ingredient.id)]);

                if(ingredientIndex > -1) {
                    Object.keys(ingredient).forEach(key => {
                        this.$set(this.product.ingredients[ingredientIndex], key, ingredient[key]);
                    })
                } else {
                    this.product.ingredients.push(ingredient);
                }

            },

            removeIngredient(ingredientId) {
                const ingredientIndex = _findIndex(this.product.ingredients, ['id', parseInt(ingredientId)]);
                this.product.ingredients.splice(ingredientIndex, 1);
            },
        },

        components: {
            ViewContainer,
            ImageUploadComponent,
            IngredientsComponent,
            Input,
            Select,
            Textarea,
            InputGroup,
            Button
        }
    }
</script>