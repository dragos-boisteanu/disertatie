<template>
    <Modal>

        <template slot="header">
            Discount
        </template>
     
        <template slot="body">
            <ValidationObserver ref="discountObserver">
                <form class="flex flex-col gap-3">

                    <ValidationProvider vid="discount" rules="required" v-slot="{ errors, failed, passed }" class="w-full">
                        <label for="discount" class="text-sm font-semibold">Discount</label>
                        <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                        <select 
                            id="discount"
                            name="discount"
                            v-model="selectedDiscountId" 
                            class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                            :class="{'border-red-600': failed, 'border-green-500' : passed}"
                            @change="selectDiscount"
                        >
                            <option value="" disabled>Select discount</option>
                            <option 
                                v-for="availableDiscount in availableDiscounts" 
                                :key="availableDiscount.id"
                                :value="availableDiscount.id"
                                class="flex items-center gap-x-3 disabled:bg-gray-100"
                            >
                                <span>
                                    <span>
                                        {{ availableDiscount.code }}
                                    </span> 
                                    <span>
                                        {{ availableDiscount.value }}%
                                    </span>
                                </span>
                            </option>
                        </select>
                    </ValidationProvider>

                    <div class="flex flex-col gap-y-4 sm:flex-row items-center justify-between mt-3 gap-x-4">
                        <ValidationProvider vid="fromDate" rules="required" v-slot="{ errors }" class="w-full">
                            <label for="from" class="text-sm font-semibold">From</label>
                            <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                            <date-picker
                                :input-attr="{name: 'from'}" 
                                v-model="discount.fromDate" 
                                type="datetime"
                                placeholder="Start date"
                                :confirm="true"
                                confirm-text="Ok"
                                valueType="format"
                                :disabled-date="disableDatesInterval"
                            >
                            </date-picker>
                        </ValidationProvider>
                        <ValidationProvider vid="toDate" rules="required" v-slot="{ errors}" class="w-full">
                            <label for="from" class="text-sm font-semibold">To</label>
                            <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                            <date-picker 
                                :disabled="enableToDate"
                                v-model="discount.toDate" 
                                type="datetime"
                                placeholder="End date"
                                :confirm="true"
                                confirm-text="Ok"
                                valueType="format"
                                :disabled-date="disableBeforeFromDate"
                                >
                            </date-picker>
                        </ValidationProvider>
                    </div>

                </form>
            </ValidationObserver>
        </template>

        <template slot="footer">
            <button 
                @click="submit" 
                class="flex items-center bg-lightBlue-700 rounded-sm text-xs py-1 px-4 mr-2 text-white mt-2 hover:bg-lightBlue-600 active:bg-lightBlue-500 active:shadow-inner  disabled:bg-gray-500 disabled:pointer-events-none"
            >
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
    import { mapGetters } from 'vuex';
    import _find from 'lodash/find';

    import Modal from './ModalComponent';
    import DatePicker from 'vue2-datepicker';

    export default {

        props: {
            propDiscount: {
                type: Object,
                required: false,
                default: null
            }
        },

        computed: {
            ...mapGetters('Discounts', ['getDiscounts']),

            enableToDate(){
                return this.discount.fromDate ? false : true
            },
        },

        mounted() {            
            this.getAvailableDiscounts()

            if(this.propDiscount) {
                this.discount = JSON.parse(JSON.stringify(this.propDiscount))
                this.selectedDiscountId = this.discount.id
            }    
        },

        data() {
            return {
                availableDiscounts: [],

                selectedDiscountId: '',

                discount: {
                    id: '0',
                    fromDate: '',
                    toDate: ''
                }
            }
        },

        methods: {
            submit() {
                let counter = 0;
                const observer = this.$refs.discountObserver.errors;

                Object.keys(observer).forEach(key => {
                    if(observer[key].length === 0) {
                        counter++;
                    }
                })
                
                if(counter === 0) {
                    this.discount.id = this.selectedDiscountId;
                    this.$emit('saved', this.discount);
                }
               
            },

            selectDiscount() {
                this.discount = _find(this.availableDiscounts, ['id', this.selectedDiscountId]);
            },

            disableDatesInterval(date) {
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                return date < today;               
            },

            disableBeforeFromDate(date) {
                return date < new Date(this.discount.fromDate)
            },

            getAvailableDiscounts() {
                this.availableDiscounts =  JSON.parse(JSON.stringify(this.getDiscounts.filter(discount => discount.deletedAt === null)))
            },

            close() {
                this.$emit('closed');
            }
        },

        components: {
           Modal, 
           DatePicker
        }
    }
</script>