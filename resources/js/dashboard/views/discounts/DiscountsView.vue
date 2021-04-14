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

            <div class="mt-4 flex flex-col gap-y-3 bg-white shadow rounded-sm p-5 md:mt-0 lg:flex-1">
                <ValidationObserver v-slot="{ handleSubmit }" ref="observer">
                    <form @submit.prevent="handleSubmit(submit)" class="flex flex-col items-stretch justify-items-start gap-y-3 md:flex-auto">
                        <h2 class="mb-5 text-xl font-semibold">
                            Discount
                        </h2> 

                        <div class="w-full flex-1 flex items-center gap-x-4">
                            <ValidationProvider 
                                vid="code" 
                                rules="required|alpha_num|max:50" 
                                v-slot="{ errors, failed, passed }" 
                                class="flex-initial"
                            >
                                <label for="code" class="text-sm font-semibold">Code</label>
                                <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                                <input 
                                    id="code"
                                    name="code" 
                                    type="text" 
                                    v-model="discount.code" 
                                    :disabled="waiting"   
                                    class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                                    :class="{'border-red-600': failed, 'border-green-500' : passed}"
                                />
                            </ValidationProvider>

                            <ValidationProvider 
                                vid="value" 
                                rules="required|integer" 
                                v-slot="{ errors, failed, passed }" 
                                class="flex-1"
                            >
                                <label for="value" class="text-sm font-semibold">Value</label>
                                <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                                <input 
                                    id="value"
                                    name="value" 
                                    type="number" 
                                    v-model="discount.value" 
                                    :disabled="waiting"   
                                    class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                                    :class="{'border-red-600': failed, 'border-green-500' : passed}"
                                />
                            </ValidationProvider>
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
                </ValidationObserver>
            </div>
        </div>

    </ViewContainer>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

    import ViewContainer from '../ViewContainer';
    import _find from 'lodash/find';

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

        methods: {
            ...mapActions('Discounts', ['postDiscount', 'patchDiscount', 'disableDiscount', 'deleteDiscount', 'restoreDiscount']),
            ...mapActions('Notification', ['openNotification']),

            selectDiscount(id) {
                this.discount = Object.assign({}, _find(this.getDiscounts, ['id', id]));
                this.discountSelected = true;
                this.$refs.observer.reset();
            },

            clearSelection() {
                this.discountSelected = false;
                this.resetForm();
            },

            resetForm() {
                this.$refs.observer.reset();
                this.discount = {
                    name: '',
                    value: '',              
                }
            },

            async submit() {
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
                    console.log(this.discount)
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