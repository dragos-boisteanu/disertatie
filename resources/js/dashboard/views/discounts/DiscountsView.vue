<template>
    <ViewContainer>
        <template slot="header">
            Discounts
        </template>

        <div class="w-full md:flex md:gap-x-4 xl:w-3/4 2xl:w-1/2 ">
            <div class="flex flex-col bg-white shadow rounded-sm p-5 md:flex-1">
                <table class="px-2 w-full rounded-sm max-h-80 md:max-h-96">
                    <thead class="w-full bg-gray-700 text-orange-500">
                        <tr class="text-left text-sm">
                            <th class="p-2 text-center">Index</th>
                            <th class="p-2">Code</th>
                            <th class="p-2">Value</th>
                            <th class="p-2"></th>
                        </tr>
                    </thead>
                    <tbody class="overflow-y-auto">
                        <tr 
                            v-for="(discount, index) in getDiscounts" :key="discount.id"
                            @click="selectDiscount(discount.id)"
                            class="transition-shadow transition-transform duration-500 ease-in-out text-sm rounded-md cursor-pointer border-white transform hover:scale-105
                            hover:bg-gray-50 hover:shadow-md"
                        >
                            <td class="p-2 text-center font-semibold">{{ index + 1 }}</td>
                            <td class="p-2">{{ discount.code }}</td>
                            <td class="p-2">{{ discount.value }}%</td>
                            <td class="p-2 flex items-center justify-center">
                                <button  @click="callDisableDiscount(discount.id)" v-if="discount.deletedAt === null">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0zm0 0h24v24H0V0zm0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none"/><path d="M12 6c3.79 0 7.17 2.13 8.82 5.5-.59 1.22-1.42 2.27-2.41 3.12l1.41 1.41c1.39-1.23 2.49-2.77 3.18-4.53C21.27 7.11 17 4 12 4c-1.27 0-2.49.2-3.64.57l1.65 1.65C10.66 6.09 11.32 6 12 6zm-1.07 1.14L13 9.21c.57.25 1.03.71 1.28 1.28l2.07 2.07c.08-.34.14-.7.14-1.07C16.5 9.01 14.48 7 12 7c-.37 0-.72.05-1.07.14zM2.01 3.87l2.68 2.68C3.06 7.83 1.77 9.53 1 11.5 2.73 15.89 7 19 12 19c1.52 0 2.98-.29 4.32-.82l3.42 3.42 1.41-1.41L3.42 2.45 2.01 3.87zm7.5 7.5l2.61 2.61c-.04.01-.08.02-.12.02-1.38 0-2.5-1.12-2.5-2.5 0-.05.01-.08.01-.13zm-3.4-3.4l1.75 1.75c-.23.55-.36 1.15-.36 1.78 0 2.48 2.02 4.5 4.5 4.5.63 0 1.23-.13 1.77-.36l.98.98c-.88.24-1.8.38-2.75.38-3.79 0-7.17-2.13-8.82-5.5.7-1.43 1.72-2.61 2.93-3.53z"/></svg>
                                </button>
                                <div v-else class="bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-md">
                                    Disabled
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <!-- <ul class="px-2 overflow-y-auto w-full max-h-80 md:flex-1 md:max-h-96 ">
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
                </ul> -->
            </div>

           <div class="mt-4 md:mt-0 lg:flex-1">
                <form @submit.prevent="submit" class="flex flex-col items-stretch justify-items-start gap-y-3 md:flex-auto">
                    <div class="flex flex-col gap-y-3 bg-white shadow rounded-sm p-5">
                        <h2 class="mb-5 text-xl font-semibold">
                            Discount
                        </h2> 

                        <div class="flex-1 flex gap-x-4">
                            <InputGroup 
                                id="name"
                                label="Name"
                                :hasError="$v.discount.code.$error"
                            >
                                <template v-slot:errors>
                                    <p v-if="!$v.discount.code.required">
                                        The code field is required
                                    </p>
                                    <p v-if="!$v.discount.code.alphaNum">
                                        The code field must contain only letters or numbers
                                    </p>
                                    <p v-if="!$v.discount.code.maxLength">
                                        The code field should not be longer than 25 characters
                                    </p>
                                </template>
                                <Input 
                                    v-model="discount.code"   
                                    id="code"
                                    name="code"
                                    :eclass="{'border-red-600' : $v.discount.code.$error, 'border-green-600': $v.discount.code.$dirty && !$v.discount.code.$error}"
                                    :disabled="waiting"  
                                    @blur.native="$v.discount.code.$touch()"                           
                                ></Input>
                            </InputGroup>

                            <InputGroup 
                                id="value"
                                label="Value"
                                :hasError="$v.discount.value.$error"
                            >
                                <template v-slot:errors>
                                    <p>
                                        The value field is required
                                    </p>
                                    <p v-if="!$v.discount.value.integer">
                                        The value field must be an integer
                                    </p>
                                    <p v-if="!$v.discount.value.minValue">
                                        The value must be at least 1
                                    </p>
                                </template>
                                <Input 
                                    v-model="discount.value"   
                                    id="value"
                                    name="value"
                                    :eclass="{'border-red-600' : $v.discount.value.$error, 'border-green-600': $v.discount.value.$dirty && !$v.discount.value.$error}"
                                    :disabled="waiting"  
                                    @blur.native="$v.discount.value.$touch()"                           
                                ></Input>
                            </InputGroup>                            
                        </div>

                        <div>
                            <Button 
                                v-if="discount.deletedAt"
                                type="secondary"
                                :waiting="waiting"
                                @click.native.prevent="callRestoreDiscount"
                                eclass="mb-3 md:mb-0"
                            >                       
                                Restore
                            </Button>
                            <Button 
                                v-if="discount.deletedAt"
                                type="danger"
                                :waiting="waiting"
                                @click.native.prevent="callDeleteDiscount"
                                eclass="mb-3 md:mb-0"
                            >                       
                                Delete
                            </Button>
                        </div>  
                    </div>
                    <div>
                        <Button 
                            v-if="discountSelected"
                            type="secondary"
                            @click.native.prevent="clearSelection"
                            eclass="mb-3 md:mb-0"
                        >                       
                            Clear selection
                        </Button>
                        <Button 
                            type="primary"
                            :waiting="waiting"
                            @click.native.prevent="submit"
                        >
                            <span v-if="discountSelected">
                                Update
                            </span>
                            <span v-else>
                                Submit
                            </span>
                        </Button>
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

    import Input from '../../components/inputs/TextInputComponent'
    import InputGroup from '../../components/inputs/InputGroupComponent'
    import Button from '../../components/buttons/ButtonComponent';

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
                    code: '',
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

                    this.discountSelected = false;
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
            ViewContainer,
            Input,
            InputGroup,
            Button
        }
    }

</script>