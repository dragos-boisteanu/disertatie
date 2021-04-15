<template>
    <Modal>
        <h1 class="text-3xl my-4">
            Add discount
        </h1>

        <div class="p-1 mb-3">
            <ValidationObserver v-slot="{ handleSubmit }" ref="observar">
                <form @submit.prevent="handleSubmit(submit)">
                    <ValidationProvider vid="discount" rules="required" v-slot="{ errors, failed, passed }" class="w-full">
                        <label for="discount" class="text-sm font-semibold">Discount</label>
                        <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                        <select 
                            id="discount"
                            name="discount"
                            v-model="discount" 
                            class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                            :class="{'border-red-600': failed, 'border-green-500' : passed}"
                        >
                            <option value="0" disabled>Select discount</option>
                            <option 
                                v-for="(discount, index) in getDiscounts" 
                                :key="discount.id"
                                :value="discount"
                                class="flex items-center gap-x-3"
                            >
                                <span>
                                    {{index+1}}
                                </span>
                                <span>
                                    <span>
                                        {{ discount.code }}
                                    </span> 
                                    <span>
                                        {{ discount.value }}%
                                    </span>
                                </span>
                            </option>
                        </select>
                    </ValidationProvider>
                    <div class="flex items-center justify-between mt-3 gap-x-4">
                        <ValidationProvider vid="fromDate" rules="required" v-slot="{ errors, failed, passed }" class="w-full">
                            <label for="from" class="text-sm font-semibold">From</label>
                            <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                            <input 
                                type="date" 
                                id="fromDate" 
                                name="fromDate" 
                                v-model="discount.fromDate"
                                class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                                :class="{'border-red-600': failed, 'border-green-500' : passed}"
                            />
                        </ValidationProvider>
                        <ValidationProvider vid="toDate" rules="required" v-slot="{ errors, failed, passed }" class="w-full">
                            <label for="from" class="text-sm font-semibold">To</label>
                            <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                            <input 
                                type="date" 
                                id="toDate" 
                                name="toDate" 
                                v-model="discount.toDate"
                                class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                                :class="{'border-red-600': failed, 'border-green-500' : passed}"
                            />
                        </ValidationProvider>
                    </div>
                    <div class="w-full flex justify-end items-center mt-4">
                        <button 
                            type="submit" 
                            class="flex items-center bg-lightBlue-700 rounded-sm text-xs py-1 px-4 mr-2 text-white mt-2 hover:bg-lightBlue-600 active:bg-lightBlue-500 active:shadow-inner  disabled:bg-gray-500 disabled:pointer-events-none"
                        >
                            Add
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
    import Modal from '../ModalComponent';

    export default {

        props: {
            productId: {
                type: Number,
                required: false
            }
        },

        computed: {
            ...mapGetters('Discounts', ['getDiscounts']),
        },

        mouted() {
            if(productId) {
                // call server and ask for product
                // bring product in
                // check if the discount that is being added alredy exists or not
                // if not, check to see if it's start date is greater than the most recent endDate of
                // already present discounts
            }
        },

        data() {
            return {
                product: {
                    id: '',
                    discounts: []
                },

                discount: {
                    id: '0',

                    fromDate: '',
                    toDate: ''
                }
            }
        },

        methods: {
            submit() {
                console.log(this.discount)
                this.$emit('discountAdded', this.discount);
            },

            close() {
                this.$emit('close');
            }
        },

        components: {
           Modal, 
        }
    }
</script>