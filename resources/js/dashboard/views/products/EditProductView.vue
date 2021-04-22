<template>
    <ViewContainer>
        <template slot="header">
            Edit product #{{ product.id }}
        </template>

        <ValidationObserver v-slot="{ handleSubmit }" ref="observer">
            <form @submit.prevent="handleSubmit(submit)" class="flex flex-col">
                <div class="flex flex-col lg:flex-row lg:items-start lg:gap-x-6 xl:w-9/12 2xl:w-2/4">
                    <div class="flex flex-col gap-y-3 bg-white shadow rounded-sm p-5 lg:flex-1">
                        <!-- <div>
                            <file-pond
                                name="image"
                                ref="pond"
                                label-idle="Upload product image image..."
                                v-bind:allow-multiple="false"
                                accepted-file-types="image/jpeg"
                                :server="{
                                    url: '/api/dashboard/images',
                                    process: { 
                                        headers: {
                                            'X-CSRF-TOKEN': csrf
                                        },
                                        onload: (response) =>  addImagePathToProduct(response) ,
                                    },
                                    revert: {
                                        url: '/delete',
                                        headers: {
                                            'X-CSRF-TOKEN': csrf
                                        },
                                    }
                                }"
                                :files="files"
                                :onaddfilestart="waitForFiletoUpload"
                                :onprocessfileabort="stopWaitingForFileToUpload"
                            />
                            
                            <div class="text-right mt-6">
                                <button 
                                    :disabled="waitForFileUpload"
                                    class="border border-gray-600 text-xs text-gray-700 px-4 py-1 rounded hover:border-gray-500 hover:text-gray-600" 
                                    @click.prevent="clearImage"
                                >
                                    Clear image
                                </button>
                                <button 
                                    v-if="this.product.image"
                                    :disabled="waitForFileUpload"
                                    class="ml-4 border border-gray-600 text-xs text-gray-700 px-4 py-1 rounded hover:border-gray-500 hover:text-gray-600" 
                                    @click.prevent="removeImage"
                                >
                                    Remove image
                                </button>
                            </div>
                        </div> -->
                   
                        <div class="flex flex-col gap-y-4 md:flex md:flex-row md:items-center md:justify-between md:gap-x-4">
                            
                            <ValidationProvider 
                                vid="barcode" 
                                rules="required" 
                                v-slot="{ errors, failed, passed }" 
                                class="w-full mt-2"
                            >
                                <label for="name" class="text-sm font-semibold">Barcode</label>
                                <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                                <div class="flex gap-x-1 items-center relative">
                                    <input 
                                        id="barcode"
                                        name="barcode" 
                                        type="text" 
                                        v-model="localProduct.barcode" 
                                        :disabled="waiting"   
                                        class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                                        :class="{'border-red-600': failed, 'border-green-500' : passed}"
                                    />
                                </div>
                            </ValidationProvider>
                            <ValidationProvider 
                                vid="name" 
                                rules="required|alpha_spaces|max:255" 
                                v-slot="{ errors, failed, passed }" 
                                class="w-full mt-2"
                            >
                                <label for="name" class="text-sm font-semibold">Name</label>
                                <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                                <input 
                                    id="firstName"
                                    name="first name" 
                                    type="text" 
                                    v-model="localProduct.name" 
                                    :disabled="waiting || locked"   
                                    class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                                    :class="{'border-red-600': failed, 'border-green-500' : passed}"
                                />
                            </ValidationProvider>
                        </div>

                        <ValidationProvider 
                            vid="description" 
                            rules="required|alpha_spaces|max:255" 
                            v-slot="{ errors, failed, passed }" 
                            class="w-full mt-2"
                        >       
                            <label for="name" class="text-sm font-semibold">Description</label>
                            <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                            <textarea 
                                id="description"
                                name="description" 
                                type="text" 
                                v-model="localProduct.description" 
                                :disabled="waiting || locked"   
                                class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                                :class="{'border-red-600': failed, 'border-green-500' : passed}"
                            />
                        </ValidationProvider>

                        <div class="flex flex-col gap-y-4 md:flex md:flex-row md:items-center md:justify-between md:gap-x-4">

                            <ValidationProvider 
                                vid="base_price" 
                                rules="required|double:2,dot" 
                                v-slot="{ errors, failed, passed }" 
                                class="w-full mt-2"
                            >
                                <label for="name" class="text-sm font-semibold">Base price</label>
                                <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                                <input 
                                    id="basePrice"
                                    name="base price" 
                                    type="text" 
                                    v-model="localProduct.base_price" 
                                    :disabled="waiting || locked"   
                                    class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                                    :class="{'border-red-600': failed, 'border-green-500' : passed}"
                                />
                            </ValidationProvider>
                            <ValidationProvider 
                                vid="category_id" 
                                rules="required|integer" 
                                v-slot="{ errors, failed, passed }" 
                                class="w-full mt-2"
                            >
                                <label for="name" class="text-sm font-semibold">Category</label>
                                <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                                <select 
                                    id="unit_id"
                                    name="category"
                                    v-model="localProduct.category_id" 
                                    :disabled="waiting || locked"   
                                    class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                                    :class="{'border-red-600': failed, 'border-green-500' : passed}"
                                >
                                    <option value="" disabled>Select category</option>
                                    <option :value="category.id" v-for="category in getCategories" :key="category.id">{{ category.name }} ({{ category.vat}}% VAT)</option>
                                </select>
                            </ValidationProvider>
                        </div>

                        <div class="flex flex-col gap-y-4 md:flex md:flex-row md:items-center md:justify-between md:gap-x-4">
                            <ValidationProvider vid="weight" rules="required|integer" v-slot="{ errors, failed, passed }" class="w-full mt-2">
                                <label for="name" class="text-sm font-semibold">Weight</label>
                                <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                                <input 
                                    id="weight"
                                    name="weight" 
                                    type="number" 
                                    v-model="localProduct.weight" 
                                    :disabled="waiting || locked"   
                                    class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                                    :class="{'border-red-600': failed, 'border-green-500' : passed}"
                                />
                            </ValidationProvider>
                            <ValidationProvider vid="unit_id" rules="required|integer" v-slot="{ errors, failed, passed }" class="w-full mt-2">
                                <label for="name" class="text-sm font-semibold">Weight units</label>
                                <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                                <select 
                                    id="unit_id"
                                    name="weight units" 
                                    type="text" 
                                    v-model="localProduct.unit_id" 
                                    :disabled="waiting || locked"   
                                    class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                                    :class="{'border-red-600': failed, 'border-green-500' : passed}"
                                >
                                    <option value="" disabled>Select unit</option>
                                    <option :value="unit.id" v-for="unit in getUnits" :key="unit.id">{{unit.name}} ({{ unit.description }})</option>
                                </select>
                            </ValidationProvider>
                        </div>

                        <DiscountComponent 
                            :discount="localProduct.discount" 
                            @saved="addDiscount" 
                            @removed="removeDiscount"
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

    import IngredientsComponent from '../../components/products/IngredientsComponent';
    import DiscountComponent from '../../components/discounts/DiscountComponent';

    import vueFilePond from "vue-filepond";
    import "filepond/dist/filepond.min.css";
    import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
    import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

    import _find from 'lodash/find';
    import _filter from 'lodash/filter';
    import _findIndex from 'lodash/findIndex';

    const FilePond = vueFilePond(
        FilePondPluginFileValidateType,
    );

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
                files: [],
                csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            }
        },

        methods: {
            ...mapActions('Products', ['updateProduct']),
            ...mapActions('Notification', ['openNotification']),

            async submit() {
                try {
                    const payload = {
                        vm: this,
                        product: {
                            id: this.localProduct.id,
                        }
                    }

                    let counter = 0;

                    Object.keys(this.localProduct).forEach(key => {
                        
                        if(key === 'ingredients') {
                        
                            payload.product[key] = this.localProduct[key];
                            counter++;
                            
                        } else if (this.product[key] !== this.localProduct[key]) {
                            payload.product[key] = this.localProduct[key];
                            counter++;
                        }
                        
                    });

                    if(this.localProduct.ingredients.length === 0) {
                        delete payload.product.ingredients;
                    }

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
                    this.$Progress.fail();
                    console.log(error);
                }
            },

            waitForFiletoUpload() {
                this.waitForFileUpload = true;
            },

            addImagePathToProduct(value) {
                this.localProduct.image = value;
                this.waitForFileUpload = false;
            },

            stopWaitingForFileToUpload() {
                this.waitForFileUpload = false;
            },

            clearImage() {
                this.$refs.pond.removeFile({revert: true});
                this.localProduct.image = this.product.image
            },

            async removeImage() {
                try {
                    this.$Progress.start();
                    this.$refs.pond.removeFile({revert: false});

                    this.localProduct.image = 'clear';

                    await this.submit();

                    delete this.localProduct.image;
                    this.$Progress.finish();
                } catch ( error ) {
                    this.$Progress.fail();
                    console.log(error)
                    // notification
                }               
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
            IngredientsComponent,
            DiscountComponent,
            FilePond
        }
    }
</script>