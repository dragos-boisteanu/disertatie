<template>
    <ViewContainer>
        <template slot="header">
            Edit product #{{ product.id }}
        </template>

        <form @submit.prevent="submit" class="flex flex-col">
            <div class="flex flex-col lg:flex-row lg:items-start lg:gap-x-6 xl:w-2/3">
                <div class="flex flex-col gap-y-3 bg-white shadow rounded-sm p-5 lg:flex-1">

                    <!-- IMAGE UPLOAD -->
                    <div class="flex items-center gap-x-5">
                        <div class="w-32 h-32 rounded-md md:mr-4">
                            <img v-if="product.image" :src="product.image" class="w-full h-full rounded-md object-cover"/>
                            <svg v-else class="bg-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="128px" height="128px"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C8.43 2 5.23 3.54 3.01 6L12 22l8.99-16C18.78 3.55 15.57 2 12 2zM7 7c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm5 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>
                        </div>

                        <div class="flex-1">
                            <ImageUploadComponent
                                :disabled="waiting || waitForFileUpload"
                                :clear="clearImage"
                                @waitForFileToUpload="toggleWaitForFileUpload"
                                @setImagePath="setImagePath"
                            ></ImageUploadComponent>
                            <button v-if="product.image" @click.prevent="removeImage">
                                Remove image
                            </button>
                        </div>
                    </div>
                    
                    <div class="flex flex-col gap-y-4 md:flex md:flex-row md:items-center md:justify-between md:gap-x-4">
                        <InputGroup
                            id="barcode"
                            label="Barcode"
                            :hasError="$v.localProduct.barcode.$error"
                            :eclass="{'flex-1': true}"
                        >
                            <template v-slot:errors>
                                <p v-if="!$v.localProduct.barcode.required">
                                    The barcode field is required
                                </p>
                            </template>
                            <Input 
                                v-model="localProduct.barcode" 
                                id="barcode"
                                name="barcode"   
                                :class="{'border-red-600' : $v.localProduct.barcode.$error, 'border-green-600': $v.localProduct.barcode.$dirty && !$v.localProduct.barcode.$error}"
                                :disabled="waiting"
                                @input.native="$v.localProduct.barcode.$touch()"  
                            />
                        </InputGroup>
                        <InputGroup
                            id="name"
                            label="Label"
                            :hasError="$v.localProduct.name.$error"
                            :eclass="{'flex-1': true}"
                        >
                            <template v-slot:errors> 
                                <p v-if="!$v.localProduct.name.required">
                                    The name field is required
                                </p>
                                <p v-if="!$v.localProduct.name.maxLength">
                                    The first name field should not be longer than 50 characters
                                </p>
                                <p v-if="!$v.localProduct.name.alphaSpaces">
                                    The name field must contain only letters and spaces
                                </p>
                            </template>
                            <Input 
                                v-model="localProduct.name" 
                                id="name"
                                name="name"   
                                :class="{'border-red-600' : $v.localProduct.name.$error, 'border-green-600': $v.localProduct.name.$dirty && !$v.localProduct.name.$error}"
                                :disabled="waiting || locked"
                                @input.native="$v.localProduct.name.$touch()"
                            />
                        </InputGroup>
                    </div>

                    <InputGroup
                        id="description"
                        label="Description"
                        :hasErrors="$v.localProduct.description.$error"
                    >  
                        <template v-slot:errors>
                            <p v-if="!$v.localProduct.description.required">
                                The description field is required
                            </p>
                            <p v-if="!$v.localProduct.description.alphaNumSpaces">
                                The description field must contain only letters, numbers and spaces
                            </p>
                        </template>
                        <Textarea 
                            v-model="localProduct.description"
                            id="description"
                            name="description"
                            :class="{'border-red-600' : $v.localProduct.description.$error, 'border-green-600': $v.localProduct.description.$dirty && !$v.localProduct.description.$error}"
                            :disabled="waiting || locked"
                            @input.native="$v.localProduct.description.$touch()"
                        />
                    </InputGroup>

                    <div class="flex flex-col gap-y-4 md:flex md:flex-row md:items-center md:justify-between md:gap-x-4">
                        <InputGroup
                            id="basePrice"
                            label="Base price"
                            :hasError="$v.localProduct.base_price.$error"
                            :eclass="{'flex-1':true}"
                        >
                            <template v-slot:errors>
                                <p v-if="!$v.localProduct.base_price.required">
                                    The base price field is required
                                </p>
                                <p v-if="!$v.localProduct.base_price.decimal">
                                    The base price must be in decimal format
                                </p>
                                <p v-if="!$v.localProduct.base_price.minValue">
                                    The base price field must be at least 1
                                </p>
                            </template>
                            <Input 
                                v-model="localProduct.base_price"
                                id="basePrice"
                                name="base price" 
                                type="text"    
                                :class="{'border-red-600' : $v.localProduct.base_price.$error, 'border-green-600': $v.localProduct.base_price.$dirty && !$v.localProduct.base_price.$error}"
                                :disabled="waiting || locked" 
                                @input.native="$v.localProduct.base_price.$touch()"
                            />
                        </InputGroup>
                        <InputGroup
                            id="category"
                            label="Category"
                            :hasError="$v.localProduct.category_id.$error"
                            :eclass="{'flex-1':true}"
                        >
                            <template v-slot:error> 
                                <p v-if="!$v.localProduct.category_id.required">
                                    The category field is mandatory
                                </p>
                            </template>
                            <Select 
                                v-model="localProduct.category_id"
                                id="category"
                                name="category" 
                                :class="{'border-red-600' : $v.localProduct.category_id.$error, 'border-green-600': $v.localProduct.category_id.$dirty && !$v.localProduct.category_id.$error}"
                                :disabled="waiting || locked"
                                @change.native="$v.localProduct.category_id.$touch()"
                            >
                                <option value="" disabled>Select category</option>
                                <option :value="category.id" v-for="category in getCategories" :key="category.id">{{ category.name }} ({{ category.vat}}% VAT)</option>
                            </Select>
                        </InputGroup>
                    </div>

                    <div class="flex flex-col gap-y-4 md:flex md:flex-row md:items-center md:justify-between md:gap-x-4">
                        <InputGroup
                            id="weight"
                            label="Weight"
                            :hasError="$v.localProduct.weight.$error"
                            :eclass="{'flex-1':true}"
                        >
                            <template v-slot:errors>
                                <p v-if="!$v.localProduct.weight.required">
                                    The weight field is required
                                </p>
                                <p v-if="!$v.localProduct.weight.integer">
                                    The weight field must be an integer
                                </p>
                            </template>
                            <Input 
                                v-model="localProduct.weight" 
                                id="weight"
                                name="weight"  
                                :class="{'border-red-600' : $v.localProduct.weight.$error, 'border-green-600': $v.localProduct.weight.$dirty && !$v.localProduct.weight.$error}"
                                :disabled="waiting || locked" 
                                @input.native="$v.localProduct.weight.$touch()"
                            />
                        </InputGroup>
                        <InputGroup
                            id="weightUnit"
                            label="Weight unit"
                        >
                            <template v-slot:errors>
                                <p v-if="!$v.localProduct.unit_id.required">
                                    The weight unit field is required
                                </p>
                            </template>
                            <Input 
                                v-model="localProduct.unit_id"
                                id="unit_id"
                                name="weight units"  
                                :class="{'border-red-600' : $v.localProduct.unit_id.$error, 'border-green-600': $v.localProduct.unit_id.$dirty && !$v.localProduct.unit_id.$error}"
                                :disabled="waiting || locked"  
                                @change.native="$v.localProduct.unit_id.$touch()"
                            >
                                <option value="" disabled>Select unit</option>
                                <option :value="unit.id" v-for="unit in getUnits" :key="unit.id">{{unit.name}} ({{ unit.description }})</option>
                            </Input>
                        </InputGroup>
                    </div>

                    <InputGroup
                        id="discount"
                        label="Discount"
                    >
                        <Select 
                            v-model="product.discountId" 
                            id="discount"
                            name="discount"
                        >
                            <option value="" selected>Select discount</option>
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

                    <IngredientsComponent
                        :ingredients="localProduct.ingredients"
                        @saved="saveIngredient"
                        @removed="removeIngredient"
                    ></IngredientsComponent>

                </div>
            </div>

            <div class="mt-5 flex md:justify-start">
                <Button 
                    type="primary"
                    :disabled="waiting || waitForFileUpload"  
                    :waiting="waiting"
                    @click.native.prevent="submit"
                >
                    Submit
                </Button>
            </div>
        </form>
    </ViewContainer>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    import ViewContainer from '../ViewContainer'

    import ImageUploadComponent from '../../components/ImageUploadComponent';
    import IngredientsComponent from '../../components/products/IngredientsComponent';
    import DiscountComponent from '../../components/discounts/DiscountComponent';

    import Input from '../../components/inputs/TextInputComponent';
    import Select from '../../components/inputs/SelectInputComponent';
    import Textarea from '../../components/inputs/TextareaInputComponent';
    import InputGroup from '../../components/inputs/InputGroupComponent';

    import Button from '../../components/buttons/ButtonComponent';

    import _find from 'lodash/find';
    import _filter from 'lodash/filter';
    import _findIndex from 'lodash/findIndex';
    import _isEqual from 'lodash/isEqual';

    import { required, integer, decimal, maxLength, minValue } from 'vuelidate/lib/validators'
    import { alphaSpaces, alphaNumSpaces } from '../../validators/index';
    import { patchProduct, downloadProduct } from '../../api/products.api';
    
    export default {

        async beforeRouteEnter (to, from, next) {
            const response = await downloadProduct(to.params.id);
            next(vm => vm.setProduct(response.data.data));
        },

        computed: {
            ...mapGetters('Categories', ['getCategories']),
            ...mapGetters('Units', ['getUnits']),
            ...mapGetters('Ingredients', ['getIngredients']),
            ...mapGetters('Discounts', ['getDiscounts']),

            availableDiscounts() {
                return this.getDiscounts.filter(discount => discount.deletedAt === null);
            }
        },

        data() {
            return {
                locked: false,
                waiting: false,

                ingredientInput: '',
                foundIngredients: [],

                product: {},

                localProduct: {
                    barcode: '',
                    name:'',
                    description: '',
                    base_price: '',
                    weight: '',
                    unit_id: '',
                    quantity: '',
                    category_id: '',
                    discountId: "",
                    ingredients: [],
                },
                
                waitForFileUpload: false,
                clearImage: false,
            }
        },

        validations: {
            localProduct: {
                barcode: {
                    required,

                },
                name: {
                    required,
                    maxLength: maxLength(50),
                    alphaSpaces,
                },
                description: {
                    required,
                    maxLength: maxLength(255),
                    alphaNumSpaces
                },
                base_price: {
                    required,
                    decimal,
                    minValue: minValue(1)
                },
                weight: {
                    required,
                    integer
                },
                unit_id: {
                    required,
                },
                category_id: {
                    required,
                }
            }
        },

        methods: {
            ...mapActions('Notification', ['openNotification']),

            async submit() {

                this.$v.$touch();

                if(!this.$v.$invalid) {
                    try {
                        const payload = {
                            product: {
                                id: this.localProduct.id,
                            }
                        }

                        let counter = 0;
                        
                        Object.keys(this.localProduct).forEach(key => {
                            // if(key === 'discount') {
                            //     if(!_isEqual(this.localProduct[key], this.product[key])) {
                            //         payload.product[key] = this.localProduct[key];
                            //         counter++;
                            //     }
                                
                            // } else
                             if(key === 'ingredients') {
                                if(!_isEqual(this.localProduct[key], this.product[key])) {
                                    payload.product[key] = this.localProduct[key];
                                    payload.product.hasIngredients = true;
                                    counter++;
                                }
                                
                            } else if (this.product[key] !== this.localProduct[key]) {
                                payload.product[key] = this.localProduct[key];
                                counter++;
                            }
                        });
                    
                        if(counter > 0) {

                            await patchProduct(payload.product);

                            counter = 0;
                            
                            this.$router.push({name: 'Product', params: {id: this.product.id}})

                            
                            this.openNotification({
                                type: 'ok',
                                show: true,
                                message: 'Product updated'
                            })
                        } else {
                            this.openNotification({
                                type: 'info',
                                show: true,
                                message: 'Nothing to update'
                            })
                        }
                    } catch ( error ) {
                        this.openNotification({
                            type: 'err',
                            show: true,
                            message: 'Something went wrong'
                        })
                        this.$v.$touch();
                        console.log(error);
                    }
                }
                
            },

            removeImage() {
                this.product.image = "";
                this.localProduct.image = "clear";
            },

            toggleWaitForFileUpload(waitForFileToUpload) {
                console.log(waitForFileToUpload);
                this.waitForFileUpload = waitForFileToUpload;
            },

            setImagePath(imagePath) {
                console.log(imagePath)
                this.localProduct.image = imagePath;
            },

            setProduct(product){
                this.product = product;
                this.localProduct = JSON.parse(JSON.stringify(this.product))
            },

            saveIngredient(ingredient) {
                const ingredientIndex = _findIndex(this.localProduct.ingredients, ['id', parseInt(ingredient.id)]);

                if(ingredientIndex > -1) {
                    Object.keys(ingredient).forEach(key => {
                        this.$set(this.localProduct.ingredients[ingredientIndex], key, ingredient[key]);
                    })
                } else {
                    this.localProduct.ingredients.push(ingredient);
                }
            },

            removeIngredient(ingredientId) {
                const ingredientIndex = _findIndex(this.localProduct.ingredients, ['id', parseInt(ingredientId)]);
                this.localProduct.ingredients.splice(ingredientIndex, 1);
            },
        },

        components: {
            ViewContainer,
            ImageUploadComponent,
            IngredientsComponent,
            DiscountComponent,
            Input,
            Select,
            Textarea,
            InputGroup,
            Button
        }
    }
</script>