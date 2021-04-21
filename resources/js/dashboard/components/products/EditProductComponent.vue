<template>
    <Modal>
        <template slot="header">
            Edit product #{{localProduct.id}}
        </template>

        <div class="p-1 mb-3">
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

            <ValidationObserver ref="observar">
                <form class="flex flex-col gap-3">
                    <ValidationProvider vid="barcode" rules="required" v-slot="{ errors, failed, passed }" class="w-full">
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
                    <ValidationProvider vid="name" rules="required|alpha_spaces|max:255" v-slot="{ errors, failed, passed }" class="w-full mt-2">
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
                    <ValidationProvider vid="description" rules="required|alpha_spaces|max:255" v-slot="{ errors, failed, passed }" class="w-full mt-2">
                            <label for="name" class="text-sm font-semibold">Description</label>
                            <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                            <input 
                                id="description"
                                name="description" 
                                type="text" 
                                v-model="localProduct.description" 
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
                            v-model="localProduct.category_id" 
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
                            v-model="localProduct.base_price" 
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

                    <div class="w-full mt-4">
                        <input type="checkbox" id="hasIngredients" @change="clearIngredients" v-model="localProduct.hasIngredients" :disabled="waiting || locked"/>
                        <label for="hasIngredients" >Has ingredients</label>
                    </div>

                    <div class="w-full mt-2" v-if="localProduct.hasIngredients">
                        <label for="name" class="text-sm font-semibold">Ingredients</label>
                        <!-- <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div> -->
                        <ul v-if="localProduct.ingredients.length > 0"
                            class="flex items-center gap-x-2 my-1"
                        >
                            <li v-for="ingredient in localProduct.ingredients" :key="ingredient.id"
                                class="text-xs p-1 px-2 bg-white rounded border flex items-center gap-x-1 cursor-pointer hover:border-gray-600"
                                :class="{'disabled pointer-events-none bg-gray-100': waiting || locked}"
                                @click="removeIngredient(ingredient.id)"
                            > 
                                <span>  {{ ingredient.quantity}}{{ ingredient.unit.name}}</span>
                                <span> {{ingredient.name}} </span>
                            </li>
                        </ul>
                        <div class="relative flex items-center gap-x-3 bg-white w-full text-sm rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500">

                            <input type="text" name="ingredients" class="outline-none  p-2 h-full w-full rounded" v-model="ingredientInput" @keyup="findIngredient" :disabled="waiting || locked" />

                            <ul class="absolute top-8 left-0 right-0 bg-white rounded border my-2 shadow max-h-24 overflow-y-auto" v-if="foundIngredients.length > 0">
                                <li v-for="ingredient in foundIngredients" :key="ingredient.id"
                                    @click="selectIngredient(ingredient.id)"
                                    class="p-1 cursor-pointer hover:bg-gray-50"    
                                >
                                    <div>
                                        {{ingredient.name}}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </form>
            </ValidationObserver>
        </div>

        <template slot="footer">
            <button 
                @click="submit"
                :disabled="waiting || waitForFileUpload"  
                class="flex items-center bg-lightBlue-700 rounded-sm text-xs py-1 px-4 mr-2 text-white mt-2 hover:bg-lightBlue-600 active:bg-lightBlue-500 active:shadow-inner  disabled:bg-gray-500 disabled:pointer-events-none"
            >
                <svg v-if="waiting" class="animate-spin mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Save
            </button>
            <button 
                @click="close"
                class="bg-transparent rounded-sm text-xs py-1 px-4 text-black text-bold mt-2 hover:text-gray-600"
            >
                Cancel
            </button>
        </template>

    </Modal>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import Modal from '../ModalComponent'

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
        props: {
            product: {
                type: Object,
                requried: true
            }
        },

        mounted() {
           this.localProduct = JSON.parse(JSON.stringify(this.product));
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

                localProduct: {
                    barcode: '',
                    name:'',
                    description: '',
                    base_price: '',
                    weight: '',
                    unit_id: '',
                    quantity: '',
                    category_id: '',
                    hasIngredients: false,
                    ingredients: []
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
                            hasIngredients: this.localProduct.hasIngredients
                        }
                    }

                    let counter = 0;

                    Object.keys(this.localProduct).forEach(key => {
                        
                        if(key === 'ingredients') {
                            if(this.localProduct[key].length !== this.product[key].length ) {
                                payload.product[key] = this.localProduct[key];
                                counter++;
                            }
                        } else if (this.product[key] !== this.localProduct[key]) {
                            payload.product[key] = this.localProduct[key];
                            counter++;
                        }
                        
                    });

                    if(counter > 0) {
                        this.$Progress.start();

                        const response = await this.updateProduct(payload);
                        if(response.data.image) {
                            payload.product.image = response.data.image;
                        }

                        if(response.data.quantity) {
                            payload.product.quantity = response.data.quantity;
                        }
                        
                        this.$emit('updated', payload.product);

                        counter = 0;
                        
                        this.$Progress.finish();
                        this.close();

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

            clearIngredients() {
                if(this.localProduct.hasIngredients) {
                    this.localProduct.ingredients = [];
                }
            },

            toggleIngredients() {
                this.localProduct.hasIngredients = !this.localProduct.hasIngredients;
            },

            findIngredient(){
                if(this.ingredientInput.length > 0) {
                    const lastSpaceIndex = this.ingredientInput.lastIndexOf(" ");
                    this.foundIngredients = _filter(this.getIngredients, ingredient =>  (new RegExp ('^' + `${this.ingredientInput.substring(lastSpaceIndex +1 )}`, 'i').test( ingredient.name )));
                }else {
                    this.foundIngredients = [];
                }
            },

            selectIngredient(id) {
                const selectedIngredient = _find(this.foundIngredients, ['id', id]);
                const localProductIngredients = _find(this.localProduct.ingredients, ['id', id]);

                if(localProductIngredients) {
                    this.openNotification({
                        type: 'info',
                        show: true,
                        message: 'The product already has this ingredient'
                    })
                } else {
                    const indexOfFirstSpace = this.ingredientInput.indexOf(" ");
                
                    selectedIngredient.quantity = this.ingredientInput.substring(0, indexOfFirstSpace);

                    this.localProduct.ingredients.push(selectedIngredient);

                    this.ingredientInput = '';
                    this.foundIngredients = [];
                }
            },

            removeIngredient(id) {
                const ingredientIndex = _findIndex(this.localProduct.ingredients, ['id', id]);
                this.localProduct.ingredients.splice(ingredientIndex, 1);
            },
            
            close() {
                this.$emit('close');
            }
        },

        components: {
            Modal,
            FilePond
        }
    }
</script>