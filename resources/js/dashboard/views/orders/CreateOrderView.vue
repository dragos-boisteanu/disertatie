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
                                <p v-if="!$v.client.name.required">
                                    The client name field is required 
                                </p>
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
                                @blur.native="$v.client.phoneNumber.$touch()"
                            ></Input>
                        </InputGroup>

                        <InputGroup
                            id="clientEmail"
                            label="Email"
                            :hasError="$v.client.email.$error"
                            :eclass="{'flex-1':true}"
                        >
                            <template v-slot:errors>
                                <p v-if="!$v.client.email.required">
                                    The client email field is required 
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

                    <div class="flex flex-col gap-2 md:flex-row md:items-center">
                        <div class="flex items-center gap-x-2">   
                            <InputGroup
                                id="clientCounty"
                                label="County"
                                :hasError="$v.countyId.$error"
                                :eclass="{'flex-1':true}"
                            >  
                                <template v-slot:errors>
                                    <p v-if="!$v.countyId.required">
                                        The county field is required
                                    </p>
                                </template>
                                <Select 
                                    v-model="countyId"
                                    id="clientCounty"
                                    name="country"
                                    :class="{'border-red-600' : $v.countyId.$error, 'border-green-600': $v.countyId.$dirty && !$v.countyId.$error}"
                                    @change.native="getCitites"
                                    @blur.native="$v.countyId.$touch()"
                                >
                                    <option value="" disabled>Select user country</option>
                                    <option v-for="county in getCounties" :key="county.id" :value="county.id"> {{county.name}} </option>
                                </Select>
                            </InputGroup>

                            <InputGroup
                                id="clientCity"
                                label="City"
                                :hasError="$v.cityId.$error"
                                :eclass="{'flex-1':true}"
                            >
                                <template v-slot:errors>
                                    <p v-if="!$v.cityId.required">
                                        The city field is required
                                    </p>
                                </template>
                                <Select 
                                    v-model="cityId"
                                    id="clientCity"
                                    name="city"
                                    :disabled="countyId ? false : true"
                                    :class="{'border-red-600' : $v.cityId.$error, 'border-green-600': $v.cityId.$dirty && !$v.cityId.$error}"             
                                    @blur.native="$v.cityId.$touch()"
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
                            :hasError="$v.client.address.$error"
                            :eclass="{'flex-1':true}"
                        >
                            <template v-slot:errors>
                                <p v-if="!$v.client.address.required">
                                    The client address field is required 
                                </p>
                                <p v-if="!$v.client.address.alphaNumSpaces">
                                    The client address field must contain only letters, spaces or numbers
                                </p>
                            </template>
                            <Input
                                v-model="client.address"
                                id="clientAddress"
                                name="clientAddress"
                                :class="{'border-red-600' : $v.client.address.$error, 'border-green-600': $v.client.address.$dirty && !$v.client.address.$error}"
                                @blur.native="$v.client.address.$touch()"
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

                    <div class="flex flex-col gap-y-4 md:flex md:flex-row md:items-center md:justify-between md:gap-x-4">
                        <InputGroup
                            id="orderDeliveryMethod"
                            label="Delivery method"
                            :hasError="$v.order.deliveryMethodId.$error"
                            :eclass="{'flex-1':true}"
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
                                <!-- <option v-for="city in cities" :key="city.id" :value="city.id">{{city.name}}</option> -->
                            </Select>
                        </InputGroup>

                        <InputGroup
                            id="orderPaymentMethod"
                            label="Delivery method"
                            :hasError="$v.order.paymentMethodId.$error"
                            :eclass="{'flex-1':true}"
                        >
                            <template v-slot:errors>
                                <p v-if="!$v.order.paymentMethodId.required">
                                    The payment method field is required
                                </p>
                            </template>
                            <Select 
                                v-model="order.deliveryMethodId"
                                id="orderPaymentMethod"
                                name="orderPaymentMethod"
                                :class="{'border-red-600' : $v.order.paymentMethodId.$error, 'border-green-600': $v.order.paymentMethodId.$dirty && !$v.order.paymentMethodId.$error}"             
                                @blur.native="$v.order.paymentMethodId.$touch()"
                            >
                                <option value="" selected disabled>Select payment method</option>
                                <!-- <option v-for="city in cities" :key="city.id" :value="city.id">{{city.name}}</option> -->
                            </Select>
                        </InputGroup>

                    </div>

                    <!-- ORDER'S PRODUCTS TABLE -->
                    <div>
                        <div class="text-sm font-semibold">Products</div>
                        <table class="mt-1 px-2 w-full rounded-sm max-h-80 md:max-h-96">
                            <thead class="w-full bg-gray-700 text-orange-500">
                                <tr class="text-left text-sm">
                                    <th class="p-2 text-center rounded-tl">#</th>
                                    <th class="p-2">Name</th>
                                    <th class="p-2">Quantity</th>
                                    <th class="p-2">Price</th>
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
                                <tr v-if="order.items.length > 0">                                    
                                    <td colspan="2">
                                        TOTAL
                                    </td>
                                    <td>{{ orderTotalQuantity }}</td>
                                    <td>{{ orderTotalPrice }}</td>
                                </tr>
                                <tr>
                                    <td colspan="5">
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

    import { required, numeric, maxLength, email } from 'vuelidate/lib/validators'
    import { alphaSpaces, alphaNumSpaces } from '../../validators/index';

    import { mapActions, mapGetters } from 'vuex';

    import _find from 'lodash/find'
    import _findIndex from 'lodash/findIndex'

    export default {

        computed: {
            // ...mapGetters('PaymentMethods', ['getPaymentMethods']),
            // ...mapGetters('DeliveryMethods', ['getDeliveryMethods']),
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
            }
        },
        
        data() {
            return {
                countyId: '',
                cityId: '',
                cities: [],

                client: {
                    firstName: '',
                    name: '',
                    phoneNumber: '',
                    email: '',
                    county: '',
                    city: '',
                    address: '',
                },

                order: {
                    address: '',
                    paymentMethodId: '',
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
            countyId: {
                required,
                numeric
            },

            cityId: {
                required,
                numeric
            },

            client: {
                firstName: {
                    required,
                    maxLength: maxLength(50),
                    alphaSpaces,
                },
                name: {
                    required,
                    maxLength: maxLength(50),
                    alphaSpaces
                },
                phoneNumber: {
                    required,
                },
                email: {
                    email
                },
                address: {
                    required,
                    alphaNumSpaces
                }
            },

            order: {
                paymentMethodId: {
                    required,
                    numeric
                },
                deliveryMethodId: {
                    required,
                    numeric
                },
                paymentMethodId: {
                    required,
                    numeric
                },
                observations: {
                    alphaNumSpaces
                },
                products: {
                    required
                }
            }
        },

        methods: {
            ...mapActions('Users', ['getUserByPhoneNumber']),
            ...mapActions('Counties', ['fetchCitites']),
            ...mapActions('Notification', ['openNotification']),
            

            submit() {

            },

            selectUser() {

            },

            saveEdit(product) {    
                const existingProductIndex = _findIndex(this.order.items, ['name', product.name]);
                this.$set(this.order.items[existingProductIndex], 'quantity', product.quantity);
            },

            addProductToOrder(product) {
                const existingProduct = _find(this.order.items, ['name', product.name]);
                const existingProductIndex = _findIndex(this.order.items, ['name', product.name]);

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
                            message: 'Product quantity is greater than the available stock'
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
                    const selectedCounty =  _find(this.getCounties, ['id', parseInt(this.countyId)]);
                    this.client.county = selectedCounty.name;
                    this.cities= await this.fetchCitites(this.countyId);
                } catch ( error ) {
                    console.log(error)
                }
            },

            selectCity() {
                const selectedCity = _find(this.cities, ['id', parseInt(this.cityId)]);
                this.client.city = selectedCity.name;
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