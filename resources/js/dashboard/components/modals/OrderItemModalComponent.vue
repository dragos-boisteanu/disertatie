<template>
    <Modal @close="close">

        <template v-slot:header>
            Product
        </template>

        <template v-slot:body>
            <div class="flex flex-col gap-3 md:flex-row md:items-center">
                <InputGroup
                    id="productName"
                    label="Name"
                    :hasError="$v.product.name.$error"
                    :eclass="{'flex-1':true}"
                >
                    <template v-slot:errors>
                        <p v-if="!$v.product.name.required">
                            The name field is required
                        </p>
                        <p v-if="!$v.product.name.alphaSpaces">
                            Then ame field must contain only letters or spaces
                        </p>
                    </template>
                    
                    <div class="relative">
                        <Input
                            v-model.lazy="product.name"
                            id="productName"
                            :disabled="edit"
                            :class="{'border-red-600' : $v.product.name.$error, 'border-green-600': $v.product.name.$dirty && !$v.product.name.$error}"
                            @blur.native="$v.product.name.$touch()"
                            @input="findProduct"
                        ></Input>
                        <ul v-if="foundProducts.length > 0" class="absolute z-50 top-10 right-0 left-0 bg-white text-xs text-gray-800 hover:text-black rounded shadow">
                            <li 
                                v-for="product in foundProducts" :key="product.id"
                                @click="selectProduct(product)"
                                class="p-2 cursor-pointer hover:bg-gray-100"
                            >
                                {{ product.name }}
                            </li>
                        </ul>
                    </div>
                    
                </InputGroup>

                <InputGroup
                    id="productPrice"
                    label="Price"
                    :eclass="{'flex-1':true}"
                >
                    <Input
                        v-model="product.price"
                        id="productName"
                        :disabled="true"
                    ></Input>
                </InputGroup>
            </div>

            <div class="mt-3 flex flex-col gap-3 md:flex-row md:items-center ">
                <InputGroup
                    id="productStock"
                    label="Stock"
                    :eclass="{'flex-1':true}"
                >
                    <Input
                        v-model="product.stock"
                        id="productStock"
                        :disabled="true"
                    ></Input>
                </InputGroup>

                <InputGroup
                    id="productQuantity"
                    label="Quantity"
                    :hasError="$v.product.quantity.$error"
                    :eclass="{'flex-1':true}"
                >
                    <template v-slot:errors>
                        <p v-if="!$v.product.quantity.required">
                            The quantity field is required
                        </p>
                        <p v-if="!$v.product.quantity.integer">
                            Then quantity field must by an integer
                        </p>
                        <p v-if="!$v.product.quantity.maxValue">
                            Can't sell more products that are in stock
                        </p>
                         <p v-if="!$v.product.quantity.minValue">
                           The quantity must be at least 1
                        </p>
                    </template>
                    
                    <Input
                        v-model="product.quantity"
                        id="productQuantity"
                        :disabled="product.stock ? false : true"
                        :class="{'border-red-600' : $v.product.quantity.$error, 'border-green-600': $v.product.quantity.$dirty && !$v.product.quantity.$error}"
                        @blur.native="$v.product.quantity.$touch()"
                    ></Input>
                </InputGroup>
            </div>
            
        </template>

        <template v-slot:footer>
            <button 
                @click.prevent="save"
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
    import Modal from './ModalComponent'

    import {fetchProductsByName, fetchProductById } from '../../api/orders.api';

    import { required, integer, maxValue, minValue } from 'vuelidate/lib/validators'
    import { alphaSpaces } from '../../validators/index';

    import Input from '../../components/inputs/TextInputComponent';
    import InputGroup from '../../components/inputs/InputGroupComponent';

    import _debounce from 'lodash/debounce'

    export default {
        props: {
            id: {
                type: [Number, String],
                required: false,
                default: null
            },
            quantity: {
                type: [Number, String],
                required: false,
                default: ''
            }
        },

        async mounted() {
            if(this.id && this.quantity) {
                const repsonse = await fetchProductById(this.id);
                repsonse.data.data.quantity = this.quantity;
                this.product = repsonse.data.data;
                this.edit = true;
            }
        },

        computed: {
            maxQuantity() {
                return this.product ? this.product.stock : 999
            }
        },

        data() {
            return {
                product: {
                    name: '',
                    stock: '',
                    quantity: '',
                    price: '',
                },

                edit: false,
                foundProducts: []
            }
        },

        validations() {
            return {
                product: {
                    name: {
                        required,
                        alphaSpaces
                    },
                    quantity: {
                        required,
                        integer,
                        minValue: minValue(1),
                        maxValue: maxValue(this.maxQuantity)
                    }
                }
            }
           
        },

        methods: {

            findProduct: _debounce(async function() {
                try {
                    if(this.product.name.length > 1)
                    {
                        const response = await fetchProductsByName(this.product.name);
                        this.foundProducts = response.data.data;
                    }
                } catch ( error ) {
                    console.log(error)
                }
            }, 250),

            selectProduct(product) {
                product.quantity = ''
                this.product = product;
                this.foundProducts = [];
            },

            save() {
                this.$v.product.$touch();

                if(!this.$v.$invalid) {
                    // const product = {
                    //     id: this.product.id,
                    //     name: this.product.name,
                    //     quantity: this.product.quantity,
                    //     price: this.product.price
                    // }

                    if(this.edit) {
                        this.$emit('edit', this.product)
                    } else {
                        this.$emit('add', this.product)
                    }
                    this.$emit('closed');
                }
            
            },

            close() {
                this.$emit('closed');
            }
        },

        components: {
            Modal,
            Input,
            InputGroup
        }
    }
</script>