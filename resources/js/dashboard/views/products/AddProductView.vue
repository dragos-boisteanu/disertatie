<template>
    <ViewContainer>

        <template slot="header">
            Add new product
        </template>

        <ValidationObserver v-slot="{ handleSubmit }" ref="observer">
            <form @submit.prevent="handleSubmit(submit)" class="lex flex-col">
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
                            <ValidationProvider 
                                vid="barcode" rules="required" 
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
                                        v-model="product.barcode" 
                                        @blur="getProduct"
                                        :disabled="waiting"   
                                        class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                                        :class="{'border-red-600': failed, 'border-green-500' : passed}"
                                    />
                                    <svg v-show="checkingBarcode" class="animate-spin mr-3 h-5 w-5 text-lightBlue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </div>
                            </ValidationProvider>

                            <ValidationProvider 
                                vid="name" 
                                rules="required|alpha_spaces|max:255" 
                                v-slot="{ errors, failed, passed }" 
                                class="w-full"
                            >
                                <label for="name" class="text-sm font-semibold">Name</label>
                                <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                                <input 
                                    id="firstName"
                                    name="first name" 
                                    type="text" 
                                    v-model="product.name" 
                                    :disabled="waiting"   
                                    class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                                    :class="{'border-red-600': failed, 'border-green-500' : passed}"
                                />
                            </ValidationProvider>
                        </div>

                        <ValidationProvider 
                            vid="description" 
                            rules="required|alpha_spaces|max:255" 
                            v-slot="{ errors, failed, passed }" 
                            class="w-full"
                        >
                            <label for="name" class="text-sm font-semibold">Description</label>
                            <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                            <textarea 
                                id="description"
                                name="description" 
                                type="text" 
                                v-model="product.description" 
                                :disabled="waiting"   
                                class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                                :class="{'border-red-600': failed, 'border-green-500' : passed}"
                            />
                        </ValidationProvider>

                        <div class="flex flex-col gap-y-4 md:flex md:flex-row md:items-center md:justify-between md:gap-x-4">
                            <ValidationProvider 
                                vid="base_price" 
                                rules="required|double:2,dot" 
                                v-slot="{ errors, failed, passed }" 
                                class="w-full"
                            >
                                <label for="name" class="text-sm font-semibold">Base price</label>
                                <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                                <input 
                                    id="basePrice"
                                    name="base price" 
                                    type="text" 
                                    v-model="product.base_price" 
                                    :disabled="waiting"   
                                    class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                                    :class="{'border-red-600': failed, 'border-green-500' : passed}"
                                />
                            </ValidationProvider>
                            <ValidationProvider 
                                vid="category_id" 
                                rules="required|integer" 
                                v-slot="{ errors, failed, passed }" 
                                class="w-full"
                            >
                                <label for="name" class="text-sm font-semibold">Category</label>
                                <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                                <select 
                                    id="unit_id"
                                    name="category" 
                                    type="text" 
                                    v-model="product.category_id" 
                                    :disabled="waiting"   
                                    class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                                    :class="{'border-red-600': failed, 'border-green-500' : passed}"
                                >
                                    <option value="" disabled>Select category</option>
                                    <option :value="category.id" v-for="category in getCategories" :key="category.id">{{ category.name }} ({{ category.vat}}% VAT)</option>
                                </select>
                            </ValidationProvider>
                        </div>

                        <div class="flex flex-col gap-y-4 md:flex md:flex-row md:items-center md:justify-between md:gap-x-4">
                            <ValidationProvider 
                                vid="weight" 
                                rules="required|integer" 
                                v-slot="{ errors, failed, passed }" 
                                class="w-full"
                            >
                                <label for="name" class="text-sm font-semibold">Weight</label>
                                <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                                <input 
                                    id="weight"
                                    name="weight" 
                                    type="number" 
                                    v-model="product.weight" 
                                    :disabled="waiting"   
                                    class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                                    :class="{'border-red-600': failed, 'border-green-500' : passed}"
                                />
                            </ValidationProvider>
                            <ValidationProvider 
                                vid="unit_id" 
                                rules="required|integer" 
                                v-slot="{ errors, failed, passed }" 
                                class="w-full"
                            >
                                <label for="name" class="text-sm font-semibold">Weight units</label>
                                <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                                <select 
                                    id="unit_id"
                                    name="weight units" 
                                    type="text"    
                                    v-model="product.unit_id" 
                                    :disabled="waiting"   
                                    class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                                    :class="{'border-red-600': failed, 'border-green-500' : passed}"
                                >
                                    <option value="" disabled>Select unit</option>
                                    <option :value="unit.id" v-for="unit in getUnits" :key="unit.id">{{unit.name}} ({{ unit.description }})</option>
                                </select>
                            </ValidationProvider>
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
        </ValidationObserver>
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
                    image: '',
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

        methods: {
            ...mapActions('Products', ['addProduct', 'getProductByBarcode']),
            ...mapActions('Notification', ['openNotification']),

            async submit() {
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

                    this.$refs.observer.reset();

                    this.waiting = false;
                    
                    this.$Progress.finish();

                    this.clearImage = true;

                    this.openNotification({
                        type: 'ok',
                        show: true,
                        message: 'Product added'
                    })
                } catch ( error ) {
                    this.$Progress.fail();

                    this.waiting = false

                    if(error.response) {
                        this.$refs.observer.setErrors(error.response.data.errors)
                    }  
                    
                }
            },
 
            getProduct: _debounce( async function() {
                try {
                    this.checkingBarcode = true;
                    if(this.$refs.observer.errors['barcode'].length === 0) {
                        this.waiting = true;
                        const response = await this.getProductByBarcode(this.product.barcode);
                        if(response.data) {
                            this.product = response.data.data;
                        } else {
                            this.waiting = false;
                        }
                        this.checkingBarcode = false;
                    } else {
                        this.checkingBarcode = false;
                        this.waiting = false;
                    }              
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