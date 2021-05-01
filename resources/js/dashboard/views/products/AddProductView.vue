<template>
    <ViewContainer>

        <template slot="header">
            Add new product
        </template>

        <form @submit.prevent="submit" class="lex flex-col">
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
                        <div class="w-full" >
                            <label for="name" class="text-sm font-semibold">Barcode</label>
                            <div class="text-xs text-red-600 font-semibold mb-1" v-if="$v.product.barcode.$error"> 
                                <p v-if="!$v.product.barcode.required">
                                    The barcode field is required
                                </p>
                            </div>
                            <div class="flex gap-x-3 items-center relative flex-1">
                                <input 
                                    id="barcode"
                                    name="barcode" 
                                    type="text" 
                                    v-model="product.barcode"
                                    class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500" 
                                    :class="{'border-red-600' : $v.product.barcode.$error, 'border-green-600': $v.product.barcode.$dirty && !$v.product.barcode.$error}"   
                                    :disabled="waiting"
                                    @blur="getProduct"
                                    @input="$v.product.barcode.$touch()"
                                />
                                <svg v-show="checkingBarcode" class="animate-spin mr-3 h-5 w-5 text-lightBlue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </div>
                        </div>

                        <div class="w-full">
                            <label for="name" class="text-sm font-semibold">Name</label>
                            <div class="text-xs text-red-600 font-semibold mb-1" v-if="$v.product.name.$error">
                                <p v-if="!$v.product.name.required">
                                    The name field is required
                                </p>
                                <p v-if="!$v.product.name.maxLength">
                                    The namme field must be shorter than 50 characters
                                </p>
                                <p v-if="!$v.localProduct.name.alphaSpaces">
                                    The name field must contain only letters and spaces
                                </p>
                            </div>
                            <input 
                                id="firstName"
                                name="first name" 
                                type="text" 
                                v-model="product.name" 
                                class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                                :class="{'border-red-600' : $v.product.name.$error, 'border-green-600': $v.product.name.$dirty && !$v.product.name.$error}"
                                :disabled="waiting" 
                                @input="$v.product.name.$touch()"
                            />
                        </div>
                    </div>

                    <div class="w-full" >
                        <label for="name" class="text-sm font-semibold">Description</label>
                        <div class="text-xs text-red-600 font-semibold mb-1" v-if="$v.product.description.$error">
                            <p v-if="!$v.product.description.required">
                                The description field is required
                            </p>
                            <p v-if="!$v.product.description.maxLength">
                                The description field must be shorter than 255 characters
                            </p>
                            <p v-if="!$v.localProduct.description.alphaNumSpaces">
                                The description field must contain only letters, numbers and spaces
                            </p>
                        </div>
                        <textarea 
                            id="description"
                            name="description" 
                            type="text" 
                            v-model="product.description" 
                            class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                            :class="{'border-red-600' : $v.product.description.$error, 'border-green-600': $v.product.description.$dirty && !$v.product.description.$error}"
                            :disabled="waiting"
                            @input="$v.product.description.$touch()"
                        />
                    </div>

                    <div class="flex flex-col gap-y-4 md:flex md:flex-row md:items-center md:justify-between md:gap-x-4">
                        <div class="w-full">
                            <label for="name" class="text-sm font-semibold">Base price</label>
                            <div class="text-xs text-red-600 font-semibold mb-1" v-if="$v.product.base_price.$error">
                                <p v-if="!$v.product.base_price.required">
                                    The base price field is required
                                </p>
                            </div>
                            <input 
                                id="basePrice"
                                name="base price" 
                                type="text" 
                                v-model="product.base_price"
                                class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                                :class="{'border-red-600' : $v.product.base_price.$error, 'border-green-600': $v.product.base_price.$dirty && !$v.product.base_price.$error}"
                                :disabled="waiting"
                                @input="$v.product.base_price.$touch()"  
                            />
                        </div>
                        <div class="w-full">
                            <label for="name" class="text-sm font-semibold">Category</label>
                            <div class="text-xs text-red-600 font-semibold mb-1" v-if="$v.product.category_id.$error">
                                <p v-if="!$v.product.category_id.error">
                                    The category field is required
                                </p>
                            </div>
                            <select 
                                id="unit_id"
                                name="category" 
                                type="text" 
                                v-model="product.category_id"                                      
                                class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                                :class="{'border-red-600' : $v.product.category_id.$error, 'border-green-600': $v.product.category_id.$dirty && !$v.product.category_id.$error}"
                                :disabled="waiting"  
                                @change="$v.product.category_id.$touch()"
                            >
                                <option value="" disabled>Select category</option>
                                <option :value="category.id" v-for="category in getCategories" :key="category.id">{{ category.name }} ({{ category.vat}}% VAT)</option>
                            </select>
                        </div>
                    </div>

                    <div class="flex flex-col gap-y-4 md:flex md:flex-row md:items-center md:justify-between md:gap-x-4">
                        <div class="w-full">
                            <label for="name" class="text-sm font-semibold">Weight</label>
                            <div class="text-xs text-red-600 font-semibold mb-1" v-if="$v.product.weight.$error">
                                <p v-if="!$v.product.weight.required">
                                    The weight field is required
                                </p>
                            </div>
                            <input 
                                id="weight"
                                name="weight" 
                                type="number" 
                                v-model="product.weight" 
                                class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"
                                :class="{'border-red-600' : $v.product.weight.$error, 'border-green-600': $v.product.weight.$dirty && !$v.product.weight.$error}"
                                :disabled="waiting" 
                                @input="$v.product.weight.$touch()"
                            />
                        </div>
                        <div class="w-full">
                            <label for="name" class="text-sm font-semibold">Weight units</label>
                            <div class="text-xs text-red-600 font-semibold mb-1" v-if="$v.product.unit_id.$error">
                                <p v-if="!$v.product.unit_id.required">
                                    The weight unit field is required
                                </p>
                            </div>
                            <select 
                                id="unit_id"
                                name="weight units" 
                                type="text"    
                                v-model="product.unit_id"
                                class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                                :class="{'border-red-600' : $v.product.unit_id.$error, 'border-green-600': $v.product.unit_id.$dirty && !$v.product.unit_id.$error}"
                                :disabled="waiting" 
                                @change="$v.product.unit_id.$touch()"
                            >
                                <option value="" disabled>Select unit</option>
                                <option :value="unit.id" v-for="unit in getUnits" :key="unit.id">{{unit.name}} ({{ unit.description }})</option>
                            </select>
                        </div>
                    </div>

                    <!-- DISCOUNT -->
                    <DiscountComponent 
                        :discount="product.discount" 
                        @saved="addDiscount" 
                        @removed="removeDiscount"
                    ></DiscountComponent>

                    <!-- INGREDIENTS -->
                    <IngredientsComponent
                        :ingredients="product.ingredients"
                        @saved="saveIngredient"
                        @removed="removeIngredient"
                    ></IngredientsComponent>
                    
                </div>
            </div>
        
            <div class="mt-5 flex md:justify-start">
                <button 
                    type="submit"
                    :disabled="waiting || waitForFileUpload"  
                    class="inline-flex items-center justify-center px-2 py-1 w-full text-base text-white bg-green-600 rounded-sm active:shadow-inner active:bg-green-500 md:w-auto disabled:bg-gray-500 disabled:pointer-events-none"
                >
                    <svg v-if="waiting" class="animate-spin mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
            
                    <span>
                        Submit
                    </span>
                </button>
            </div>
        </form>
    </ViewContainer>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';

    import ViewContainer from '../ViewContainer';
    
    import ImageUploadComponent from '../../components/ImageUploadComponent';
    import IngredientsComponent from '../../components/products/IngredientsComponent';
    import DiscountComponent from '../../components/discounts/DiscountComponent'

    import _debounce from 'lodash/debounce';
    import _find from 'lodash/find';
    import _filter from 'lodash/filter';
    import _findIndex from 'lodash/findIndex';

    import { required, integer, decimal, maxLength, minValue } from 'vuelidate/lib/validators'
    import { alphaSpaces, alphaNumSpaces } from '../../validators/index';

    export default {

        computed: {
            ...mapGetters('Categories', ['getCategories']),
            ...mapGetters('Units', ['getUnits']),
            ...mapGetters('Ingredients', ['getIngredients']),
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
                    discount: null,
                    hasIngredients: false,
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
                }
            }
        },

        methods: {
            ...mapActions('Products', ['addProduct', 'getProductByBarcode']),
            ...mapActions('Notification', ['openNotification']),

            async submit() {

                this.$v.$touch();

                if(!this.$v.$invalid) {
                    try {           
                        this.$Progress.start()
                        this.waiting = true;

                        const payload = {}

                        if(this.checkingBarcode) {
                            payload.barcode = this.product.barcode;
                        } else {
                            Object.keys(this.product).forEach(key => {
                                payload[key] = this.product[key];
                            })
                        }

                        console.log(payload)

                        if(payload.discount === null) {
                            delete payload.discount
                        }

                        if(payload.ingredients.length === 0) {
                            delete payload.ingredients
                        }

                        await this.addProduct(payload);

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
                        
                        this.$Progress.finish();

                        this.clearImage = true;

                        this.openNotification({
                            type: 'ok',
                            show: true,
                            message: 'Product added'
                        })

                        this.$v.$reset();

                    } catch ( error ) {

                        console.log(error)
                        this.$Progress.fail();

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

            addDiscount(discount) {
                this.product.discount = discount;
            },

            removeDiscount() {
                this.product.discount = null; 
            },

        },

        components: {
            ViewContainer,
            ImageUploadComponent,
            IngredientsComponent,
            DiscountComponent,
        }
    }
</script>