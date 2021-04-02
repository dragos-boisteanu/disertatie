<template>
    <ViewContainer>
        <template slot="header">
            Add new product
        </template>

        <ValidationObserver v-slot="{ handleSubmit }" ref="observer">
            <form @submit.prevent="handleSubmit(submit)" class="flex flex-col lg:gap-x-6 lg:w-1/4">
            
                <file-pond
                    name="image"
                    ref="pond"
                    label-idle="Upload product image..."
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

                <div class="text-right mt-3">
                    <button 
                        :disabled="waitForFileUpload"
                        class="border border-gray-600 text-xs text-gray-700 px-4 py-1 rounded hover:border-gray-500 hover:text-gray-600" 
                        @click.prevent="clearImage"
                    >
                        Clear image
                    </button>
                </div>

                <ValidationProvider vid="barcode" rules="required" v-slot="{ errors, failed, passed }" class="w-full">
                    <label for="name" class="text-sm font-semibold">Barcode</label>
                    <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                    <div class="flex gap-x-1 items-center relative">
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
                        <svg v-show="checkingBarcode"  class="absolute -right-10 top-1/4 animate-spin mr-3 h-5 w-5 text-lightBlue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>

                </ValidationProvider>
                <ValidationProvider vid="name" rules="required|alpha_spaces|max:255" v-slot="{ errors, failed, passed }" class="w-full mt-2">
                    <label for="name" class="text-sm font-semibold">Name</label>
                    <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                    <input 
                        id="firstName"
                        name="first name" 
                        type="text" 
                        v-model="product.name" 
                        :disabled="waiting || locked"   
                        class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                        :class="{'border-red-600': failed, 'border-green-500' : passed}"
                    />
                </ValidationProvider>
                <ValidationProvider vid="description" rules="required|alpha_spaces|max:255" v-slot="{ errors, failed, passed }" class="w-full mt-2">
                        <label for="name" class="text-sm font-semibold">Description</label>
                        <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                        <input 
                            id="description"
                            name="description" 
                            type="text" 
                            v-model="product.description" 
                            :disabled="waiting || locked"   
                            class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                            :class="{'border-red-600': failed, 'border-green-500' : passed}"
                        />
                </ValidationProvider>
                <ValidationProvider vid="category_id" rules="required|integer" v-slot="{ errors, failed, passed }" class="w-full mt-2">
                    <label for="name" class="text-sm font-semibold">Category</label>
                    <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                    <select 
                        id="unit_id"
                        name="category" 
                        type="text" 
                        v-model="product.category_id" 
                        :disabled="waiting || locked"   
                        class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                        :class="{'border-red-600': failed, 'border-green-500' : passed}"
                    >
                        <option value="" disabled>Select category</option>
                        <option :value="category.id" v-for="category in getCategories" :key="category.id">{{ category.name }} ({{ category.vat}}% VAT)</option>
                    </select>
                </ValidationProvider>
                <ValidationProvider vid="base_price" rules="required|double:2,dot" v-slot="{ errors, failed, passed }" class="w-full mt-2">
                    <label for="name" class="text-sm font-semibold">Base price</label>
                    <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                    <input 
                        id="basePrice"
                        name="base price" 
                        type="text" 
                        v-model="product.base_price" 
                        :disabled="waiting || locked"   
                        class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                        :class="{'border-red-600': failed, 'border-green-500' : passed}"
                    />
                </ValidationProvider>
                <ValidationProvider vid="weight" rules="required|integer" v-slot="{ errors, failed, passed }" class="w-full mt-2">
                    <label for="name" class="text-sm font-semibold">Weight</label>
                    <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                    <input 
                        id="weight"
                        name="weight" 
                        type="number" 
                        v-model="product.weight" 
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
                        v-model="product.unit_id" 
                        :disabled="waiting || locked"   
                        class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                        :class="{'border-red-600': failed, 'border-green-500' : passed}"
                    >
                        <option value="" disabled>Select unit</option>
                        <option :value="unit.id" v-for="unit in getUnits" :key="unit.id">{{unit.name}} ({{ unit.description }})</option>
                    </select>
                </ValidationProvider>

                <div class="mt-3 flex md:justify-start">
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

    import _debounce from 'lodash/debounce';

    import vueFilePond from "vue-filepond";
    import "filepond/dist/filepond.min.css";
    import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
    import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

    const FilePond = vueFilePond(
        FilePondPluginFileValidateType,
    );

    export default {

        computed: {
            ...mapGetters('Categories', ['getCategories']),
            ...mapGetters('Units', ['getUnits']),
        },

        data() {
            return {
                checkingBarcode: false,
                locked: false,
                waiting: false,
                product: {
                    barcode: '',
                    name:'',
                    description: '',
                    base_price: '',
                    weight: '',
                    unit_id: '',
                    quantity: '',
                    category_id: '',
                },

                waitForFileUpload: false,
                files: null,
                csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            }
        },

        methods: {
            ...mapActions('Products', ['addProduct', 'getProductByBarcode']),
            
            async submit() {
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
                    await this.addProduct(payload);
                    this.$refs.observer.reset();
                    this.waiting = false
                } catch ( error ) {
                    console.log(error)
                    if(error.response.data.errors) {
                        this.$refs.observer.setErrors(error.response.data.errors)
                    }  
                    this.waiting = false
                    
                }
            },

            getProduct: _debounce( async function() {
                try {
                    this.checkingBarcode = true;
                    if(this.$refs.observer.errors['barcode'].length === 0) {
                        this.locked = true;
                        const response = await this.getProductByBarcode(this.product.barcode);
                        if(response.data.data) {
                            this.product = response.data.data;
                        } else {
                            this.resetProductData();
                            this.locked = false;
                        }
                        this.checkingBarcode = false;
                    } else {
                        this.checkingBarcode = false;
                        this.locked = false;
                    }              
                } catch (error) {
                    console.log(error)
                }
            }, 500),

            resetProductData() {
                // Object.keys(this.product).forEach(key => {
                //     if(key !== 'barcode') {
                //         this.product[key] = '';
                //     }
                // })
            },

            waitForFiletoUpload() {
                this.waitForFileUpload = true;
            },

            stopWaitingForFileToUpload() {
                this.waitForFileUpload = false;
            },

            addImagePathToProduct(value) {
                this.product.image = value;
                this.waitForFileUpload = false;
            },

            clearImage() {
                this.$refs.pond.removeFile({revert: true});
                delete this.product.image;
            }
        },

        components: {
            ViewContainer,
            FilePond
        }
    }
</script>