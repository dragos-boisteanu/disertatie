<template>
    <ViewContainer>
        <template slot="header">
            Discounts
        </template>

        <div class="w-full md:flex md:gap-x-4 xl:w-3/4 2xl:w-1/2 ">
            <div class="flex flex-col bg-white shadow rounded-sm p-5 md:flex-1">
                <ul class="px-2 overflow-y-auto w-full max-h-80 md:flex-1 md:max-h-96 ">
                    <li 
                        v-for="(discount, index) in getDiscounts" :key="discount.id"
                        class="flex items-center justify-between border rounded-sm py-1 px-2 my-3 mr-2"
                    >
                        <div 
                            @click="selectDiscount(discount.id)"
                            class="cursor-pointer flex items-center gap-x-2">
                            <span>{{ index + 1 }}.</span>
                            <span>{{ discount.code }}</span>
                            <span>{{ discount.value }} %</span>
                            
                        </div>
                        <div>
                            <button @click="callDisableDiscount(discount.id)" v-if="discount.deletedAt === null">X</button>
                            <span v-else>
                                DISABLED
                            </span>
                        </div>
                    </li>
                </ul>
            </div>

           <div class="mt-4 md:mt-0 lg:flex-1">
                <form @submit.prevent="submit" class="flex flex-col items-stretch justify-items-start gap-y-3 md:flex-auto">
                    <div class="flex flex-col gap-y-3 bg-white shadow rounded-sm p-5">
                        <h2 class="mb-5 text-xl font-semibold">
                            Discount
                        </h2> 

                        <div class="flex-1 flex gap-x-4">
                            <div>
                                <label for="code" class="text-sm font-semibold">Code</label>
                                <div class="text-xs text-red-600 font-semibold mb-1" v-if="$v.discount.code.$error">
                                    <p v-if="!$v.discount.code.required">
                                        The code field is required
                                    </p>
                                    <p v-if="!$v.discount.code.alphaNum">
                                        The code field must contain only letters or numbers
                                    </p>
                                    <p v-if="!$v.discount.code.maxLength">
                                        The code field should not be longer than 25 characters
                                    </p>
                                </div>
                                <input 
                                    id="code"
                                    name="code" 
                                    type="text" 
                                    v-model="discount.code"   
                                    class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500" 
                                    :class="{'border-red-600' : $v.discount.code.$error, 'border-green-600': $v.discount.code.$dirty && !$v.discount.code.$error}"
                                    :disabled="waiting"  
                                    @blur="$v.discount.code.$touch()"                           
                                />
                            </div>

                            <div>
                                <label for="value" class="text-sm font-semibold">Value</label>
                                <div class="text-xs text-red-600 font-semibold mb-1" v-if="$v.discount.value.$error">
                                    <p v-if="!$v.discount.value.required">
                                        The value field is required
                                    </p>
                                    <p v-if="!$v.discount.value.integer">
                                        The value field must be an integer
                                    </p>
                                    <p v-if="!$v.discount.value.minValue">
                                        The value must be at least 1
                                    </p>
                                </div>
                                <input 
                                    id="value"
                                    name="value" 
                                    type="text" 
                                    v-model="discount.value"
                                    class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                                    :class="{'border-red-600' : $v.discount.value.$error, 'border-green-600': $v.discount.value.$dirty && !$v.discount.value.$error}" 
                                    :disabled="waiting"   
                                    @blur="$v.discount.value.$touch()"
                                />
                            </div>
                        </div>

                        <div>
                            <div>
                                <button 
                                    v-if="discountSelected"
                                    @click.prevent="clearSelection"
                                    class=" mb-3 inline-flex items-center justify-center px-2 py-1 w-full text-base text-white bg-lightBlue-600 rounded-sm active:shadow-inner active:bg-lightBlue-500 md:w-auto"
                                >                       
                                    Clear selection
                                </button>
                                <button 
                                    v-if="discount.deletedAt"
                                    @click.prevent="callRestoreDiscount"
                                    :disabled="waiting"  
                                    class="inline-flex items-center justify-center px-2 py-1 w-full text-base text-white bg-green-600 rounded-sm active:shadow-inner active:bg-green-500 md:w-auto disabled:bg-gray-500 disabled:pointer-events-none"
                                >
                                    <svg v-if="waiting" class="animate-spin mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>
                                        Restore
                                    </span>
                                </button>
                                <button 
                                    v-if="discount.deletedAt"
                                    @click.prevent="callDeleteDiscount"
                                    :disabled="waiting"  
                                    class="inline-flex items-center justify-center px-2 py-1 w-full text-base text-white bg-red-600 rounded-sm active:shadow-inner active:bg-red-500 md:w-auto disabled:bg-gray-500 disabled:pointer-events-none"
                                >
                                    <svg v-if="waiting" class="animate-spin mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>
                                        Delete
                                    </span>
                                </button>
                            </div>
                        </div>  
                    </div>
                    <div>
                        <button 
                            type="submit"
                            :disabled="waiting"  
                            class="inline-flex items-center justify-center px-2 py-1 w-full text-base text-white bg-green-600 rounded-sm active:shadow-inner active:bg-green-500 md:w-auto disabled:bg-gray-500 disabled:pointer-events-none"
                        >
                            <svg v-if="waiting" class="animate-spin mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span v-if="discountSelected">
                                Update
                            </span>
                            <span v-else>
                                Submit
                            </span>
                        </button>        
                    </div>
                </form>
            </div>
        </div>
    </ViewContainer>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';

    import ViewContainer from '../ViewContainer';
    import _find from 'lodash/find';

    import { required, integer, alphaNum, maxLength, minValue } from 'vuelidate/lib/validators'

    export default {

        computed: {
            ...mapGetters('Discounts', ['getDiscounts']),
        },

        data() {
            return {
                waiting: false,
                discountSelected: false,
                discount: {
                    code: '',
                    value: '',
                    deletedAt: null              
                },
            }
        },

        validations: {
            discount: {
                code: {
                    required,
                    alphaNum,
                    maxLength: maxLength(25)
                },
                value: {
                    required,
                    integer,
                    minValue: minValue(1)
                }
            }
        },

        methods: {
            ...mapActions('Discounts', ['postDiscount', 'patchDiscount', 'disableDiscount', 'deleteDiscount', 'restoreDiscount']),
            ...mapActions('Notification', ['openNotification']),

            selectDiscount(id) {
                this.discount = Object.assign({}, _find(this.getDiscounts, ['id', id]));
                this.discountSelected = true;
                this.$v.discount.$reset();
            },

            clearSelection() {
                this.discountSelected = false;
                this.resetForm();
            },

            resetForm() {
                this.$v.discount.$reset();
                this.discount = {
                    name: '',
                    value: '',
                    deletedAt: null              
                }
            },

            async submit() {
                this.$v.discount.$touch();

                if(!this.$v.discount.$invalid) {
                    try {
                        this.$Progress.start();

                        if(this.discountSelected) {

                            const originalDiscount = _find(this.getDiscounts, ['id', this.discount.id]);

                            const payload = {
                                vm: this,
                                discount: {}
                            }

                            let counter = 0;

                            Object.keys(this.discount).forEach(key => {
                                if(this.discount[key] !== originalDiscount[key]) {
                                    payload.discount[key] = this.discount[key];
                                    counter++;
                                }
                            });

                            if(counter > 0) {
                                payload.discount.id = this.discount.id;
                                await this.patchDiscount(payload);

                                this.openNotification({
                                    type: 'ok',
                                    show: true,
                                    message: 'Discount updated'
                                });
                            } else {
                                this.openNotification({
                                    type: 'info',
                                    show: true,
                                    message: 'Nothing to update'
                                });
                            }
                                    
                        } else {
                            await this.postDiscount(this.discount);
                            this.resetForm();
                        }

                        this.$Progress.finish();
                    } catch( error) {
                        this.$Progress.fail();
                        console.log(error);
                    }
                }
                
            },

            async callDisableDiscount(id) {
                try {
                    this.$Progress.start();

                    const payload = {
                        id,
                        vm: this
                    }

                    await this.disableDiscount(payload);

                    this.discount = Object.assign({}, _find(this.getDiscounts, ['id', payload.id]));
                    this.$Progress.finish();

                    this.openNotification({
                        type: 'ok',
                        show: true,
                        message: 'Discount disabled'
                    })

                } catch ( error ) {
                    this.$Progress.fail();

                    console.log(error);
                }
            },

            async callRestoreDiscount() {
                try {
                    this.$Progress.start();

                    const payload = {
                        id: this.discount.id,
                        vm: this
                    }

                    await this.restoreDiscount(payload);

                    this.discount = Object.assign({}, _find(this.getDiscounts, ['id', payload.id]));

                    this.$Progress.finish();
                    this.openNotification({
                        type: 'ok',
                        show: true,
                        message: 'Discount restored'
                    })
                } catch (error) {
                    this.$Progress.fail();
                    console.log(error)
                }
            },

            async callDeleteDiscount() {
                try {
                    this.$Progress.start();

                    await this.deleteDiscount(this.discount.id);

                    this.$Progress.finish();

                    this.resetForm();

                    this.openNotification({
                        type: 'ok',
                        show: true,
                        message: 'Discount permanently removed'
                    })
                } catch ( error ) {
                    this.$Progress.fail();

                    console.log(error);
                }
            }
        },

        components: {
            ViewContainer
        }
    }

</script>