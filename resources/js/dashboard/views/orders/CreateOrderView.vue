<template>
    <ViewContainer>
        <template slot="header">
            Create order
        </template>

        <OrderItemModal
            v-if="showAddProductModalState"
            :id="selectedItemId"
            :quantity="selectedItemQuantity"
            @closed="closeAddProductModal"
            @add="addProductToOrder"
            @edit="saveEdit"
        ></OrderItemModal>

        <form class="flex flex-col">
            <div class="flex flex-col lg:flex-row lg:items-start lg:gap-x-6 xl:w-9/12 2xl:w-2/4">
                <div class="flex flex-col gap-y-3 bg-white shadow rounded-sm p-5 lg:flex-1">
                    
                    <div class="flex flex-col gap-y-4 md:flex md:flex-row md:items-center md:justify-between md:gap-x-4">
                        <InputGroup
                            id="clientFirstName"
                            label="First name"
                            :hasError="$v.client.firstName.$error"
                            :eclass="{'flex-1':true}"
                            :required="true"
                        >
                            <template v-slot:errors>
                                <p v-if="!$v.client.firstName.required">
                                    The client first name field is required 
                                </p>
                                <p v-if="!$v.client.firstName.maxLength">
                                    The client first name must not be longer than 50 characters
                                </p>
                                <p v-if="!$v.client.firstName.alphaSpaces">
                                    The client first name field must contain only letters and spaces
                                </p>
                            </template>
                            <Input
                                v-model="client.firstName"
                                id="clientFirstName"
                                name="clientFirstName"
                                :class="{'border-red-600' : $v.client.firstName.$error, 'border-green-600': $v.client.firstName.$dirty && !$v.client.firstName.$error}"
                                @blur.native="$v.client.firstName.$touch()"
                            ></Input>
                        </InputGroup>

                        <InputGroup
                            id="clientName"
                            label="Name"
                            :hasError="$v.client.name.$error"
                            :eclass="{'flex-1':true}"
                        >
                            <template v-slot:errors>
                                <p v-if="!$v.client.name.maxLength">
                                    The client name must not be longer than 50 characters
                                </p>
                                <p v-if="!$v.client.name.alphaSpaces">
                                    The client name field must contain only letters and spaces
                                </p>
                            </template>
                            <Input
                                v-model="client.name"
                                id="clientName"
                                name="clientName"
                                :class="{'border-red-600' : $v.client.name.$error, 'border-green-600': $v.client.name.$dirty && !$v.client.name.$error}"
                                @blur.native="$v.client.name.$touch()"
                            ></Input>
                        </InputGroup>
                    </div>

                    <div class="flex flex-col gap-y-4 md:flex md:flex-row md:items-center md:justify-between md:gap-x-4">
                        <InputGroup
                            id="clientPhoneNumber"
                            label="Phone number"
                            :hasError="$v.client.phoneNumber.$error"
                            :eclass="{'flex-1':true}"
                            :required="true"
                        >
                            <template v-slot:errors>
                                <p v-if="!$v.client.phoneNumber.required">
                                    The client phobe number field is required 
                                </p>
                            </template>
                            <Input
                                v-model="client.phoneNumber"
                                id="clientPhoneNumber"
                                name="clientPhoneNumber"
                                :class="{'border-red-600' : $v.client.phoneNumber.$error, 'border-green-600': $v.client.phoneNumber.$dirty && !$v.client.phoneNumber.$error}"
                                @blur.native="getClient"

                            ></Input>
                        </InputGroup>

                        <InputGroup
                            id="clientEmail"
                            label="Email"
                            :hasError="$v.client.email.$error"
                            :eclass="{'flex-1':true}"
                        >
                            <template v-slot:errors>
                                <p v-if="!$v.client.email.email">
                                    The client email field must have an valid email address
                                </p>
                            </template>
                            <Input
                                v-model="client.email"
                                id="clientEmail"
                                name="clientEmail"
                                :class="{'border-red-600' : $v.client.email.$error, 'border-green-600': $v.client.email.$dirty && !$v.client.email.$error}"
                                @blur.native="$v.client.email.$touch()"
                            ></Input>
                        </InputGroup>   

                    </div>

                    <InputGroup
                        id="orderDeliveryMethod"
                        label="Delivery method"
                        :hasError="$v.order.deliveryMethodId.$error"
                        :eclass="{'flex-initial':true}"
                        :required="true"
                    >
                        <template v-slot:errors>
                            <p v-if="!$v.order.deliveryMethodId.required">
                                The delivery method field is required
                            </p>
                        </template>
                        <Select 
                            v-model="order.deliveryMethodId"
                            id="orderDeliveryMethod"
                            name="orderDeliveryMethod"
                            :class="{'border-red-600' : $v.order.deliveryMethodId.$error, 'border-green-600': $v.order.deliveryMethodId.$dirty && !$v.order.deliveryMethodId.$error}"             
                            @blur.native="$v.order.deliveryMethodId.$touch()"
                        >
                            <option value="" selected disabled>Select delivery method</option>
                            <option v-for="method in getDeliveryMethods" :key="method.id" :value="method.id">{{method.name}}</option>
                        </Select>
                    </InputGroup>

                    <div class="flex flex-col gap-2 md:flex-row md:items-center" v-if="showAddressFields">
                        <div class="flex items-center gap-x-2">   
                            <InputGroup
                                id="clientCounty"
                                label="County"
                                :hasError="$v.county.id.$error"
                                :eclass="{'flex-1':true}"
                                :required="true"
                            >  
                                <template v-slot:errors>
                                    <p v-if="!$v.county.id.required">
                                        The county field is required
                                    </p>
                                </template>
                                <Select 
                                    v-model="county.id"
                                    id="clientCounty"
                                    name="country"
                                    :class="{'border-red-600' : $v.county.id.$error, 'border-green-600': $v.county.id.$dirty && !$v.county.id.$error}"
                                    @change.native="getCitites"
                                    @blur.native="$v.county.id.$touch()"
                                >
                                    <option value="" disabled>Select user country</option>
                                    <option v-for="county in getCounties" :key="county.id" :value="county.id"> {{county.name}} </option>
                                </Select>
                            </InputGroup>

                            <InputGroup
                                id="clientCity"
                                label="City"
                                :hasError="$v.city.id.$error"
                                :eclass="{'flex-1':true}"
                                :required="true"
                            >
                                <template v-slot:errors>
                                    <p v-if="!$v.city.id.required">
                                        The city field is required
                                    </p>
                                </template>
                                <Select 
                                    v-model="city.id"
                                    id="clientCity"
                                    name="city"
                                    :disabled="county.id ? false : true"
                                    :class="{'border-red-600' : $v.city.id.$error, 'border-green-600': $v.city.id.$dirty && !$v.city.id.$error}"             
                                    @blur.native="$v.city.id.$touch()"
                                    @change.native="selectCity"
                                >
                                    <option value="" selected disabled>Select user city</option>
                                    <option v-for="city in cities" :key="city.id" :value="city.id">{{city.name}}</option>
                                </Select>
                            </InputGroup>
                        </div>
                        
                        <InputGroup
                            id="clientAddress"
                            label="Adrress"
                            :hasError="$v.address.$error"
                            :eclass="{'flex-1':true}"
                            :required="true"
                        >
                            <template v-slot:errors>
                                <p v-if="!$v.address.required">
                                    The client address field is required 
                                </p>
                                <p v-if="!$v.address.alphaNumSpaces">
                                    The client address field must contain only letters, spaces or numbers
                                </p>
                            </template>
                            <Input
                                v-model="address"
                                id="clientAddress"
                                name="clientAddress"
                                :class="{'border-red-600' : $v.address.$error, 'border-green-600': $v.address.$dirty && !$v.address.$error}"
                                @blur.native="$v.address.$touch()"
                            ></Input>
                        </InputGroup>
                    </div>

                    <InputGroup
                        id="observations"
                        label="Observations"
                        :hasError="$v.order.observations.$error"
                    >
                        <template v-slot:errors>
                            <p v-if="!$v.order.observations.alphaNumSpaces">
                                The observations field should only contain letters, numbers or spaces
                            </p>
                        </template>
                        <Textarea
                            v-model="order.observations"
                            id="observations"
                            name="observations"
                            :class="{'border-red-600' : $v.order.observations.$error, 'border-green-600': $v.order.observations.$dirty && !$v.order.observations.$error}"
                            @blur.native="$v.order.observations.$touch()"
                        ></Textarea>
                    </InputGroup>
                    
                    <!-- ORDER'S PRODUCTS TABLE -->
                    <div>
                        <div class="text-sm font-semibold">Products <span class="text-red-500">*</span></div>
                        <div v-if="$v.order.items.$error" class="text-xs text-red-600 font-semibold">
                            <p v-if="!$v.order.items.required">
                                The order must have at least 1 product
                            </p>
                        </div>
                        <table class="mt-1 px-2 w-full rounded-sm max-h-80 md:max-h-96 text-center">
                            <thead class="w-full bg-gray-700 text-orange-500">
                                <tr class="text-left text-sm">
                                    <th class="p-2 text-center rounded-tl">#</th>
                                    <th class="p-2 text-center">Name</th>
                                    <th class="p-2 text-center">Quantity</th>
                                    <th class="p-2 text-center">Unit Price</th>
                                    <th class="p-2 text-center ">VAT</th>
                                    <th class="p-2 text-center">Discount</th>
                                    <th class="p-2 text-center">Total Price</th>
                                    <th class="p-2"></th>
                                </tr>
                            </thead>
                            <tbody class="overflow-y-auto">
                                <OrderItem  
                                    v-for="(item, index) in order.items" 
                                    :key="index" :item="item" 
                                    :index="index"
                                    @edit="editOrderProduct(item)"
                                    @remove="removeProductFromOrder"
                                ></OrderItem>
                                 <tr v-if="order.items.length > 0" class="mt-1 font-bold border-t">                                    
                                    <td colspan="2" class="p-2 text-center">
                                        TOTAL
                                    </td>
                                    <td class="p-2">{{ orderTotalQuantity }}</td>
                                    <td class="p-2"></td>
                                    <td class="p-2"></td>
                                    <td class="p-2"></td>
                                    <td class="p-2 text-center">{{ orderTotalPrice }} Ron</td>
                                </tr>
                                <tr>
                                    <td colspan="8">
                                        <button 
                                            id="addItemBtn"
                                            class="w-full py-1 mt-2 text-white text-sm ripple-bg-orange-400 rounded-sm"
                                            @click.prevent="openAddProductModal"
                                        >
                                            Add product
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="mt-5 flex md:justify-start">
                <Button 
                    type="primary"
                    @click.native.prevent="submit"
                >
                    Submit
                </Button>
            </div>
        </form>
       
    </ViewContainer>
</template>

<script>
    import ViewContainer from '../ViewContainer';
    import Input from '../../components/inputs/TextInputComponent';
    import InputGroup from '../../components/inputs/InputGroupComponent';
    import Textarea from '../../components/inputs/TextareaInputComponent';
    import Select from '../../components/inputs/SelectInputComponent';
    import Button from '../../components/buttons/ButtonComponent';

    import OrderItem from '../../components/orders/OrderItemComponent';
    import OrderItemModal from '../../components/modals/OrderItemModalComponent';

    import { required, numeric, minLength, maxLength, email, requiredIf  } from 'vuelidate/lib/validators'
    import { alphaSpaces, alphaNumSpaces } from '../../validators/index';

    import { mapActions, mapGetters } from 'vuex';

    import _find from 'lodash/find'
    import _findIndex from 'lodash/findIndex'

    export default {

        computed: {
            // ...mapGetters('PaymentMethods', ['getPaymentMethods']),
            ...mapGetters('DeliveryMethods', ['getDeliveryMethods']),
            ...mapGetters('Counties', ['getCounties']),

            orderTotalQuantity() {
                let totalQuantity = 0
                this.order.items.forEach(item => {
                    totalQuantity += parseInt(item.quantity)
                })

                return totalQuantity;
            },
            
            orderTotalPrice() {
                let totalPrice = 0
                this.order.items.forEach(item => {
                    totalPrice += parseFloat(item.price * item.quantity)
                })

                return totalPrice.toFixed(2);
            },

            showAddressFields() {
                this.$v.address.$reset();
                this.$v.city.id.$reset();
                this.$v.county.id.$reset();
                return parseInt(this.order.deliveryMethodId) === 1;
            }
        },
        
        data() {
            return {
                county: {
                    id: '',
                    name: ''
                },

                city: {
                    id: '',
                    name: '',
                },

                cities: [],

                client: {
                    firstName: '',
                    name: '',
                    phoneNumber: '',
                    email: '',
                    id: '',
                },

                address: '',

                order: {
                    address: '',
                    deliveryMethodId: '',
                    observations: '',
                    items: []
                },

                selectedItemId: '',
                selectedItemQuantity: '',
                showAddProductModalState: false
            }
        },

        validations: {
            address: {
                requiredIf: requiredIf(function () {
                    return this.showAddressFields
                }),
                alphaNumSpaces
            },
            county: {
                id: {
                    required: requiredIf(function () {
                        return this.showAddressFields
                    }),
                    numeric,
                },
            },

            city: {
                id: {
                    required: requiredIf(function () {
                        return this.showAddressFields
                    }),
                    numeric
                }
            },

            client: {
                name: {
                    maxLength: maxLength(50),
                    alphaSpaces
                },
                firstName: {
                    required,
                    maxLength: maxLength(50),
                    alphaSpaces
                },
                phoneNumber: {
                    required
                },
                email: {
                    email
                }
            },

            order: {
                deliveryMethodId: {
                    required,
                    numeric
                },
                observations: {
                    alphaNumSpaces
                },
                items: {
                    required,
                    minLength: minLength(1)
                }
            }

        },

        methods: {
            ...mapActions('Users', ['getUserByPhoneNumber']),
            ...mapActions('Counties', ['fetchCitites']),
            ...mapActions('Notification', ['openNotification']),     
            ...mapActions('Users', ['downloadUserByPhoneNumber']),     
            ...mapActions('Orders', ['storeOrder']),  

            async submit() {
                try {
                    this.$v.$touch()

                    if(!this.$v.$invalid) {

                        if(this.showAddressFields) {
                            this.order.address = `${this.county.name}, ${this.city.name}, ${this.address}, ${this.client.phoneNumber}`;
                        } else {
                            this.order.address = 'Local';
                        }

                        if(this.client.id) {
                            this.order.clientId = this.client.id;
                        } else {
                            this.order.firstName = this.client.firstName
                        }

                        this.order.phoneNumber = this.client.phoneNumber;
                        if(this.client.email) {
                            this.order.email = this.client.email
                        }
                        
                        await this.storeOrder(this.order)

                        this.openNotification({
                            type: 'ok',
                            show: true,
                            message: 'Order created succesfully'
                        })

                        this.resetForm();
                    }
                } catch ( error ) {
                    this.openNotification({
                        type: 'err',
                        show: true,
                        message: 'Failed to create new order'
                    })
                }                          
            },

            saveEdit(product) {    
                const existingProductIndex = _findIndex(this.order.items, ['name', product.name]);
                this.$set(this.order.items[existingProductIndex], 'quantity', product.quantity);
            },

            addProductToOrder(product) {
                const existingProduct = _find(this.order.items, ['id', parseInt(product.id)]);
                const existingProductIndex = _findIndex(this.order.items, ['id', parseInt(product.id)]);

                if(existingProduct) {
                    const newQuantity = parseInt(existingProduct.quantity) + parseInt(product.quantity);
                    if(newQuantity <= existingProduct.stock) {
                        this.$set(this.order.items[existingProductIndex], 'quantity', newQuantity);
                        this.openNotification({
                            type: 'ok',
                            show: true,
                            message: 'Extrea product quantity updated'
                        })
                    } else {
                        this.openNotification({
                            type: 'err',
                            show: true,
                            message: 'Product total quantity is greater than the available stock'
                        })
                    }
                    
                } else {
                    this.order.items.push(product);
                    this.openNotification({
                        type: 'ok',
                        show: true,
                        message: 'Product added'
                    })
                }
            },

            removeProductFromOrder(id) {
                const productIndex = _findIndex(this.order.items, ['id', parseInt(id)]);
                this.order.items.splice(productIndex, 1);
            },

            editOrderProduct(product) {
                this.selectedItemId = product.id;
                this.selectedItemQuantity = product.quantity;
                this.showAddProductModalState = true;
            },

            openAddProductModal() {
                this.showAddProductModalState = true;
            },

            closeAddProductModal() {
                this.showAddProductModalState = false;
                if(this.selectedItemId && this.selectedItemQuantity) {
                    this.selectedItemId = '';
                    this.selectedItemQuantity = '';
                }
            },

            async getCitites() {
                try {
                    const selectedCounty =  _find(this.getCounties, ['id', parseInt(this.county.id)]);
                    this.county.name = selectedCounty.name;
                    this.cities= await this.fetchCitites(this.county.id);
                } catch ( error ) {
                    console.log(error)
                }
            },

            async getClient() {
                try {
                    this.$v.client.phoneNumber.$touch();

                    if(!this.$v.client.phoneNumber.$invalid) {
                        const response = await this.downloadUserByPhoneNumber(this.client.phoneNumber);
                        this.client.firstName = response.firstName;
                        this.client.name = response.name;
                        this.client.id = response.id;
                        this.client.email = response.email;
                    }
                    
                } catch ( error ) {
                    console.log(error)
                }
            },

            selectCity() {
                const selectedCity = _find(this.cities, ['id', parseInt(this.city.id)]);
                this.city.name = selectedCity.name;
            },

            resetForm() {
                this.$v.$reset();
                this.county = {
                    id: '',
                    name: ''
                },

                this.city = {
                    id: '',
                    name: '',
                },

                this.cities = [],

                this.client = {
                    firstName: '',
                    name: '',
                    phoneNumber: '',
                    email: '',
                },

                this.address = '',

                this.order = {
                    address: '',
                    deliveryMethodId: '',
                    observations: '',
                    items: []
                },

                this.selectedItemId = '',
                this.selectedItemQuantity = '',
                this.showAddProductModalState = false
            }
        },

        components: {
            ViewContainer,
            Input,
            InputGroup,
            Select,
            Textarea,
            Button,
            OrderItem,
            OrderItemModal
        }
    }
</script>