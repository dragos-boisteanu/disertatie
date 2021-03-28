<template>
    <Modal>
         <h1 class="text-3xl my-4">
            Edit user
        </h1>
        <div class="p-1">
            <ValidationObserver v-slot="{ handleSubmit }" ref="observar">
                <form @submit.prevent="handleSubmit(submit)" class="flex flex-col gap-3">
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
                            type="text" 
                            v-model="localProduct.category_id" 
                            :disabled="waiting || locked"   
                            class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                            :class="{'border-red-600': failed, 'border-green-500' : passed}"
                        >
                            <option value="" disabled>Select category</option>
                            <option :value="category.id" v-for="category in getCategories" :key="category.id">{{ category.name }} ({{ category.vat}}% VAT)</option>
                        </select>
                    </ValidationProvider>
                    <ValidationProvider vid="base_price" rules="required|double:2,comma" v-slot="{ errors, failed, passed }" class="w-full mt-2">
                        <label for="name" class="text-sm font-semibold">Base price</label>
                        <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                        <input 
                            id="basePrice"
                            name="base_price" 
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
                    <div class="w-full flex justify-end items-center mt-4">
                        <button 
                            type="submit"
                            :disabled="waiting"  
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
                    </div>
                </form>
            </ValidationObserver>
        </div>

    </Modal>
</template>

<script>
import { mapGetters } from 'vuex';
    import Modal from '../ModalComponent'

    export default {
        props: {
            product: {
                type: Object,
                requried: true
            }
        },

        mounted() {
            Object.assign(this.localProduct, this.product);
        },

        computed: {
            ...mapGetters('Categories', ['getCategories']),
            ...mapGetters('Units', ['getUnits']),
        },

        data() {
            return {
                locked: false,
                waiting: false,
                localProduct: {
                    barcode: '',
                    name:'',
                    description: '',
                    base_price: '',
                    weight: '',
                    unit_id: '',
                    quantity: '',
                    category_id: '',
                }
            }
        },

        methods: {
            close() {
                this.$emit('close');
            }
        },

        components: {
            Modal,
        }
    }
</script>