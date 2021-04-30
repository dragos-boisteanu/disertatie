<template>
    <ViewContainer>
        <template slot="header">
            Edit product #{{ product.id }}
        </template>

        <ValidationObserver v-slot="{ handleSubmit }" ref="observer">
            <form @submit.prevent="handleSubmit(submit)" class="flex flex-col">
                <div class="flex flex-col lg:flex-row lg:items-start lg:gap-x-6 xl:w-2/3">
                    <div class="flex flex-col gap-y-3 bg-white shadow rounded-sm p-5 lg:flex-1">

                        <!-- IMAGE UPLOAD -->
                        <div class="flex items-center gap-x-5">
                            <div class="w-32 h-32 rounded-md md:mr-4">
                                <img v-if="product.image" :src="product.image" class="w-full h-full rounded-md object-cover"/>
                                <svg v-else class="bg-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="128px" height="128px"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C8.43 2 5.23 3.54 3.01 6L12 22l8.99-16C18.78 3.55 15.57 2 12 2zM7 7c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm5 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>
                            </div>

                            <div class="flex-1">
                                <ImageUploadComponent
                                    :disabled="waiting || waitForFileUpload"
                                    :clear="clearImage"
                                    @waitForFileToUpload="toggleWaitForFileUpload"
                                    @setImagePath="setImagePath"
                                ></ImageUploadComponent>
                                <button v-if="product.image" @click.prevent="removeImage">
                                    Remove image
                                </button>
                            </div>
                        </div>
                        
                        <div class="flex flex-col gap-y-4 md:flex md:flex-row md:items-center md:justify-between md:gap-x-4">
                            <div class="w-full mt-2">
                                <label for="name" class="text-sm font-semibold">Barcode</label>
                                <div class="text-xs text-red-600 font-semibold mb-1" v-if="$v.localProduct.barcode.$error">
                                    <p v-if="!$v.localProduct.barcode.required">
                                        The barcode field is required
                                    </p>
                                </div>
                                <div class="flex gap-x-1 items-center relative">
                                    <input 
                                        id="barcode"
                                        name="barcode" 
                                        type="text" 
                                        v-model="localProduct.barcode" 
                                        class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                                        :class="{'border-red-600' : $v.localProduct.barcode.$error, 'border-green-600': $v.localProduct.barcode.$dirty && !$v.localProduct.barcode.$error}"
                                        :disabled="waiting"
                                        @input="$v.localProduct.barcode.$touch()"  
                                    />
                                </div>
                            </div>
                            <div class="w-full mt-2" >
                                <label for="name" class="text-sm font-semibold">Name</label>
                                <div class="text-xs text-red-600 font-semibold mb-1" v-if="$v.localProduct.name.$error"> 
                                    <p v-if="!$v.localProduct.name.required">
                                        The name field is required
                                    </p>
                                </div>
                                <input 
                                    id="firstName"
                                    name="first name" 
                                    type="text" 
                                    v-model="localProduct.name"   
                                    class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                                    :class="{'border-red-600' : $v.localProduct.name.$error, 'border-green-600': $v.localProduct.name.$dirty && !$v.localProduct.name.$error}"
                                    :disabled="waiting || locked"
                                    @input="$v.localProduct.name.$touch()"
                                />
                            </div>
                        </div>

                        <div class="w-full mt-2" >       
                            <label for="name" class="text-sm font-semibold">Description</label>
                            <div class="text-xs text-red-600 font-semibold mb-1" v-if="$v.localProduct.description.$error">
                                <p v-if="!$v.localProduct.description.required">
                                    The description field is required
                                </p>
                            </div>
                            <textarea 
                                id="description"
                                name="description" 
                                type="text" 
                                v-model="localProduct.description"
                                class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500" 
                                :class="{'border-red-600' : $v.localProduct.description.$error, 'border-green-600': $v.localProduct.description.$dirty && !$v.localProduct.description.$error}"
                                :disabled="waiting || locked"
                                @input="$v.localProduct.description.$touch()"
                            />
                        </div>

                        <div class="flex flex-col gap-y-4 md:flex md:flex-row md:items-center md:justify-between md:gap-x-4">

                            <div class="w-full mt-2" >
                                <label for="name" class="text-sm font-semibold">Base price</label>
                                <div class="text-xs text-red-600 font-semibold mb-1" v-if="$v.localProduct.base_price.$error">
                                    <p v-if="!$v.localProduct.base_price.required">
                                        The base price field is required
                                    </p>
                                    <p v-if="!$v.localProduct.base_price.decimal">
                                        The base price must be in decimal format
                                    </p>
                                    <p v-if="!$v.localProduct.base_price.minValue">
                                        The base price field must be at least 1
                                    </p>
                                </div>
                                <input 
                                    id="basePrice"
                                    name="base price" 
                                    type="text" 
                                    v-model="localProduct.base_price"   
                                    class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                                    :class="{'border-red-600' : $v.localProduct.base_price.$error, 'border-green-600': $v.localProduct.base_price.$dirty && !$v.localProduct.base_price.$error}"
                                    :disabled="waiting || locked" 
                                    @input="$v.localProduct.base_price.$touch()"
                                />
                            </div>
                            <div class="w-full mt-2">
                                <label for="name" class="text-sm font-semibold">Category</label>
                                <div class="text-xs text-red-600 font-semibold mb-1" v-if="$v.localProduct.category_id.$error"> 
                                   <p v-if="!$v.localProduct.category_id.required">
                                       The category field is mandatory
                                   </p>
                                </div>
                                <select 
                                    id="unit_id"
                                    name="category"
                                    v-model="localProduct.category_id" 
                                    class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                                    :class="{'border-red-600' : $v.localProduct.category_id.$error, 'border-green-600': $v.localProduct.category_id.$dirty && !$v.localProduct.category_id.$error}"
                                    :disabled="waiting || locked"
                                    @change="$v.localProduct.category_id.$touch()"
                                >
                                    <option value="" disabled>Select category</option>
                                    <option :value="category.id" v-for="category in getCategories" :key="category.id">{{ category.name }} ({{ category.vat}}% VAT)</option>
                                </select>
                            </div>
                        </div>

                        <div class="flex flex-col gap-y-4 md:flex md:flex-row md:items-center md:justify-between md:gap-x-4">
                            <div class="w-full mt-2">
                                <label for="name" class="text-sm font-semibold">Weight</label>
                                <div class="text-xs text-red-600 font-semibold mb-1" v-if="$v.localProduct.weight.$error">
                                    <p v-if="!$v.localProduct.weight.required">
                                        The weight field is required
                                    </p>
                                    <p v-if="!$v.localProduct.weight.integer">
                                        The weight field must be an integer
                                    </p>
                                </div>
                                <input 
                                    id="weight"
                                    name="weight" 
                                    type="text" 
                                    v-model="localProduct.weight"  
                                    class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                                    :class="{'border-red-600' : $v.localProduct.weight.$error, 'border-green-600': $v.localProduct.weight.$dirty && !$v.localProduct.weight.$error}"
                                    :disabled="waiting || locked" 
                                    @input="$v.localProduct.weight.$touch()"
                                />
                            </div>
                            <div class="w-full mt-2">
                                <label for="name" class="text-sm font-semibold">Weight unit</label>
                                <div class="text-xs text-red-600 font-semibold mb-1" v-if="$v.localProduct.unit_id.$error">
                                    <p v-if="!$v.localProduct.unit_id.required">
                                        The weight unit field is required
                                    </p>
                                </div>
                                <select 
                                    id="unit_id"
                                    name="weight units" 
                                    type="text" 
                                    v-model="localProduct.unit_id" 
                                    class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                                    :class="{'border-red-600' : $v.localProduct.unit_id.$error, 'border-green-600': $v.localProduct.unit_id.$dirty && !$v.localProduct.unit_id.$error}"
                                    :disabled="waiting || locked"  
                                    @change="$v.localProduct.unit_id.$touch()"
                                >
                                    <option value="" disabled>Select unit</option>
                                    <option :value="unit.id" v-for="unit in getUnits" :key="unit.id">{{unit.name}} ({{ unit.description }})</option>
                                </select>
                            </div>
                        </div>

                        <DiscountComponent 
                            :discount="localProduct.discount" 
                            @saved="addDiscount" 
                            @removed="removeDiscount"
                            :beginsAt="localProduct.discountStartsAt"
                            :endsAt="localProduct.discountEndsAt"
                        ></DiscountComponent>

                        <IngredientsComponent
                            :ingredients="localProduct.ingredients"
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
    import { mapGetters, mapActions } from 'vuex';
    import store from '../../store/index'

    import ViewContainer from '../ViewContainer'

    import ImageUploadComponent from '../../components/ImageUploadComponent';
    import IngredientsComponent from '../../components/products/IngredientsComponent';
    import DiscountComponent from '../../components/discounts/DiscountComponent';

    import _find from 'lodash/find';
    import _filter from 'lodash/filter';
    import _findIndex from 'lodash/findIndex';
    import _isEqual from 'lodash/isEqual';

    import { required, integer, decimal, maxLength, minValue } from 'vuelidate/lib/validators'

    export default {

        async beforeRouteEnter (to, from, next) {
            const id = to.params.id;
            try{
                if(store.getters['Products/getProducts'].length > 0) {
                    const product = await store.dispatch('Products/getProduct', id);
                    next(vm => vm.setProduct(product));
                } else {
                    const product = await store.dispatch('Products/fetchProduct', id);
                    next(vm => vm.setProduct(product));
                }
            } catch(error) {
                store.dispatch('Notification/openNotification', {
                    type: 'err',
                    show: true,
                    message: 'Something wrong happened'
                })
            }
        },

        computed: {
            ...mapGetters('Categories', ['getCategories']),
            ...mapGetters('Units', ['getUnits']),
            ...mapGetters('Ingredients', ['getIngredients']),
        },

        data() {
            return {
                locked: false,
                waiting: false,

                ingredientInput: '',
                foundIngredients: [],

                product: {},

                localProduct: {
                    barcode: '',
                    name:'',
                    description: '',
                    base_price: '',
                    weight: '',
                    unit_id: '',
                    quantity: '',
                    category_id: '',
                    discount: null,
                    ingredients: [],
                },
                
                waitForFileUpload: false,
                clearImage: false,
            }
        },

        validations: {
            localProduct: {
                barcode: {
                    required,

                },
                name: {
                    required,
                    maxLength: maxLength(50)
                },
                description: {
                    required,
                    maxLength: maxLength(255)
                },
                base_price: {
                    required,
                    decimal,
                    minValue: minValue(1)
                },
                weight: {
                    required,
                    integer
                },
                unit_id: {
                    required,
                },
                category_id: {
                    required,
                }
            }
        },

        methods: {
            ...mapActions('Products', ['updateProduct']),
            ...mapActions('Notification', ['openNotification']),

            async submit() {

                this.$v.$touch();

                if(!this.$v.$invalid) {
                    try {
                        const payload = {
                            vm: this,
                            product: {
                                id: this.localProduct.id,
                            }
                        }

                        let counter = 0;
                        
                        Object.keys(this.localProduct).forEach(key => {
                            if(key === 'discount') {
                                if(!_isEqual(this.localProduct[key], this.product[key])) {
                                    payload.product[key] = this.localProduct[key];
                                    counter++;
                                }

                            } else if(key === 'ingredients') {
                                if(!_isEqual(this.localProduct[key], this.product[key])) {
                                    payload.product[key] = this.localProduct[key];
                                    payload.product.hasIngredients = true;
                                    counter++;
                                }
                                
                            } else if (this.product[key] !== this.localProduct[key]) {
                                payload.product[key] = this.localProduct[key];
                                counter++;
                            }
                        });
                    
                        if(counter > 0) {
                            this.$Progress.start();

                            await this.updateProduct(payload);

                            counter = 0;
                            
                            this.$router.push({name: 'Product', params: {id: this.product.id}})

                            this.$Progress.finish()
                            
                            this.openNotification({
                                type: 'ok',
                                show: true,
                                message: 'Product updated'
                            })
                        } else {
                            this.openNotification({
                                type: 'info',
                                show: true,
                                message: 'Nothing to update'
                            })
                        }
                    } catch ( error ) {
                        this.openNotification({
                            type: 'err',
                            show: true,
                            message: 'Something went wrong'
                        })
                        this.$v.$touch();
                        this.$Progress.fail();
                        console.log(error);
                    }
                }
                
            },

            removeImage() {
                this.product.image = "";
                this.localProduct.image = "clear";
            },

            toggleWaitForFileUpload(waitForFileToUpload) {
                console.log(waitForFileToUpload);
                this.waitForFileUpload = waitForFileToUpload;
            },

            setImagePath(imagePath) {
                console.log(imagePath)
                this.localProduct.image = imagePath;
            },

            setProduct(product){
                this.product = product;
                this.localProduct = JSON.parse(JSON.stringify(this.product))
            },

            saveIngredient(ingredient) {
                const ingredientIndex = _findIndex(this.localProduct.ingredients, ['id', parseInt(ingredient.id)]);

                if(ingredientIndex > -1) {
                    Object.keys(ingredient).forEach(key => {
                        this.$set(this.localProduct.ingredients[ingredientIndex], key, ingredient[key]);
                    })
                } else {
                    this.localProduct.ingredients.push(ingredient);
                }
            },

            removeIngredient(ingredientId) {
                const ingredientIndex = _findIndex(this.localProduct.ingredients, ['id', parseInt(ingredientId)]);
                this.localProduct.ingredients.splice(ingredientIndex, 1);
            },

            addDiscount(discount) {
                this.localProduct.discount = discount;
            },

            removeDiscount() {
                this.localProduct.discount = undefined; 
            },

        },

        components: {
            ViewContainer,
            ImageUploadComponent,
            IngredientsComponent,
            DiscountComponent
        }
    }
</script>