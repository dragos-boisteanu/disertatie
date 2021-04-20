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
                            <option value="" disabled>Select discount</option>
                            <option 
                                v-for="discount in discounts" 
                                :key="discount.id"
                                :value="discount"
                                class="flex items-center gap-x-3 disabled:bg-gray-100"
                                :disabled="discount.exists"
                            >
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
                    <div class="flex flex-col gap-y-4 md:flex-row items-center justify-between mt-3 gap-x-4">
                        <ValidationProvider vid="fromDate" rules="required" v-slot="{ errors }" class="w-full">
                            <label for="from" class="text-sm font-semibold">From</label>
                            <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                            <date-picker
                                :input-attr="{name: 'from'}" 
                                v-model="discount.fromDate" 
                                type="date"
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
                                type="date"
                                placeholder="End date"
                                :confirm="true"
                                confirm-text="Ok"
                                valueType="format"
                                :disabled-date="disableBeforeFromDate"
                                >
                            </date-picker>
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
    import _find from 'lodash/find';
    import _findIndex from 'lodash/findIndex';

    import Modal from '../ModalComponent';

    import DatePicker from 'vue2-datepicker';

    export default {

        props: {
            productId: {
                type: Number,
                required: false
            },

            productDiscounts: {
                type: Array,
                required: false,
                default: null
            }
        },

        computed: {
            ...mapGetters('Discounts', ['getDiscounts']),

            enableToDate(){
                return this.discount.fromDate ? false : true
            }
        },

        mounted() {
            // if(productId) {
                // call server and ask for product
                // bring product in
                // check if the discount that is being added alredy exists or not
                // if not, check to see if it's start date is greater than the most recent endDate of
                // already present discounts
            // }
            
            this.getAvailableDiscounts()

            if(this.productDiscounts.length > 0) {
                this.productDiscounts.forEach(discount => {
                    this.datesToDisable.push(...this.getDatesBetweenDates(new Date(discount.fromDate), new Date(discount.toDate)));
                })

                this.discounts.forEach(discount => {
                    const foundDiscount = _find(this.productDiscounts, ['id', discount.id]);
                    if(foundDiscount) {
                        discount.exists = true;
                    }
                })
            }            
        },

        data() {
            return {
                product: {
                    id: '',
                    discounts: []
                },

                discounts: [],

                datesToDisable: [],

                discount: {
                    id: '0',
                    fromDate: '',
                    toDate: ''
                }
            }
        },

        methods: {
            submit() {
                this.$emit('discountAdded', this.discount);
            },

            getDatesBetweenDates(startDate, endDate) {
                let dates = [];  
                //to avoid modifying the original date
                const theDate = new Date(startDate)
                while (theDate <= endDate) {
                    dates = [...dates, new Date(theDate)]
                    theDate.setDate(theDate.getDate() + 1)
                }
                return dates;
            },

            disableDatesInterval(date) {
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                if(this.productDiscounts.length > 0) {
                    const dateIndex = _findIndex(this.datesToDisable, dateToDisable => {
                        console.log(new Date(dateToDisable).getTime() === date.getTime())
                        const dateToDisableWithTime = new Date(dateToDisable);
                        dateToDisableWithTime.setHours(0, 0, 0, 0);
                        return dateToDisableWithTime.getTime() === date.getTime()
                    })

                    if(dateIndex > -1) {
                        return true;
                    }
                }
                return date < today;               
            },

            disableBeforeFromDate(date) {
                if(this.productDiscounts.length > 0) {
                    const dateIndex = _findIndex(this.datesToDisable, dateToDisable => {
                        const dateToDisableWithTime = new Date(dateToDisable);
                        dateToDisableWithTime.setHours(0, 0, 0, 0);
                        return dateToDisableWithTime.getTime() === date.getTime()
                    })

                    if(dateIndex > -1) {
                        return true;
                    }
                }

                const fromDate = new Date(this.discount.fromDate);
                return date < fromDate
            },

            getAvailableDiscounts() {
                this.discounts =  JSON.parse(JSON.stringify(this.getDiscounts.filter(discount => discount.deletedAt === null)))
            },

            close() {
                this.$emit('close');
            }
        },

        components: {
           Modal, 
           DatePicker
        }
    }
</script>