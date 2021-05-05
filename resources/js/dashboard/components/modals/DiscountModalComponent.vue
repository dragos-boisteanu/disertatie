<template>
    <Modal
        @close="close"
    >
        <template slot="header">
            Discount
        </template>
     
        <template slot="body">
            <div class="flex flex-col gap-3">
                <InputGroup
                    id="discount"
                    label="Discount"
                    :hasError="$v.selectedDiscountId.$error"
                >
                    <template v-slot:errors>
                        <p v-if="!$v.selectedDiscountId.required">
                            A discount must be selected
                        </p>
                    </template>
                    <Select 
                        v-model="selectedDiscountId" 
                        id="discount"
                        name="discount"
                        :eclass="{'border-red-600' : $v.selectedDiscountId.$error, 'border-green-600': $v.selectedDiscountId.$dirty && !$v.selectedDiscountId.$error}"
                        @change.native="selectDiscount"
                        @blur.native="$v.selectedDiscountId.$touch()"
                    >
                        <option value="" disabled>Select discount</option>
                        <option 
                            v-for="availableDiscount in availableDiscounts" 
                            :key="availableDiscount.id"
                            :value="availableDiscount.id"
                            class="flex items-center gap-x-3 disabled:bg-gray-100"
                        >
                            <span>
                                {{ availableDiscount.code }}
                            </span> 
                            <span>
                                {{ availableDiscount.value }}%
                            </span>
                        </option>
                    </Select>
                </InputGroup>

                <div class="flex flex-col gap-y-4 sm:flex-row items-center justify-between mt-3 gap-x-4">
                    <InputGroup
                        id="from"
                        label="From"
                        :hasError="$v.discount.fromDate.$error"
                    >
                        <template v-slot:errors> 
                            <p v-if="!$v.discount.fromDate.required">
                                From date is required
                            </p>
                        </template>
                        <date-picker 
                            v-model="discount.fromDate" 
                            type="datetime"
                            placeholder="Start date"
                            confirm-text="Ok"
                            valueType="format"
                            :input-class="fromDateClass"
                            :confirm="true"
                            :disabled="enableFromDate"
                            :disabled-date="disableDatesInterval"
                            @input="$v.discount.fromDate.$touch()"
                        >
                        </date-picker>
                    </InputGroup>
                    <InputGroup
                        id="to"
                        label="To"
                        :hasError="$v.discount.toDate.$error"
                    >
                        <template v-slot:errors> 
                            <p v-if="!$v.discount.toDate.required">
                                To date is required
                            </p>
                        </template>
                        <date-picker 
                            v-model="discount.toDate" 
                            type="datetime"
                            placeholder="End date"
                            confirm-text="Ok"
                            valueType="format"
                            :input-class="toDateClass"
                            :confirm="true"
                            :disabled="enableToDate"
                            :disabled-date="disableBeforeFromDate"
                            @input="$v.discount.toDate.$touch()"
                        >
                        </date-picker>
                    </InputGroup>
                </div>

            </div>
        </template>

        <template slot="footer">
            <button 
                @click.prevent="submit" 
                class="flex items-center bg-lightBlue-700 rounded-sm text-xs py-1 px-4 mr-2 text-white mt-2 hover:bg-lightBlue-600 active:bg-lightBlue-500 active:shadow-inner  disabled:bg-gray-500 disabled:pointer-events-none"
            >
                Save
            </button>
            <button 
                @click.prevent="close"
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

    import { required } from 'vuelidate/lib/validators'

    import Modal from './ModalComponent';
    import DatePicker from 'vue2-datepicker';
    import Input from '../inputs/TextInputComponent';
    import Select from '../inputs/SelectInputComponent';
    import InputGroup from '../inputs/InputGroupComponent';

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

            enableFromDate(){
                return this.selectedDiscountId === '' 
            },

            fromDateClass() {
                let customClass = "w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500";
                if(this.$v.discount.fromDate.$error) {
                    customClass = customClass.concat(' ', 'border-red-600')
                } else if (this.$v.discount.fromDate.$dirty && !this.$v.discount.fromDate.$error) {
                    customClass = customClass.concat(' ', 'border-green-600');
                }
                return customClass;
            },

            toDateClass() {
                let customClass = "w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500";
                if(this.$v.discount.toDate.$error) {
                    customClass = customClass.concat(' ', 'border-red-600')
                } else if (this.$v.discount.toDate.$dirty && !this.$v.discount.toDate.$error) {
                    customClass = customClass.concat(' ', 'border-green-600');
                }
                return customClass;
            }
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

        validations: {
            selectedDiscountId: {
                required
            },
            discount: {               
                fromDate: {
                    required
                },
                toDate: {
                    required
                }
            }
        },

        methods: {
            submit() {
                this.$v.$touch();

                if(!this.$v.$invalid) {
                    this.discount.id = this.selectedDiscountId;
                    this.$emit('saved', this.discount);
                }
            },

            selectDiscount() {
                this.discount = _find(this.availableDiscounts, ['id', parseInt(this.selectedDiscountId)]);
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
           DatePicker,
           Input,
           Select,
           InputGroup
           
        }
    }
</script>