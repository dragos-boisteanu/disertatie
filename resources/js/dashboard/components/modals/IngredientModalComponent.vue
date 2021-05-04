<template>
    <Modal
     @close="close"
    >

        <template slot="header">
            Ingredient
        </template>

        <template slot="body">
            <form class="flex flex-col gap-3">
                <InputGroup
                    id="ingredient"
                    label="Ingredient"
                    :hasError="$v.selectedIngredientId.$error"
                >
                    <template v-slot:errors>
                        <p v-if="!$v.selectedIngredientId.required">
                            Ingredient field is required
                        </p> 
                    </template>
                    <Select 
                        v-model="selectedIngredientId"
                        id="ingredient"
                        name="ingredient" 
                        :disabled="isEditMode"
                        :eclass="{'border-red-600': $v.selectedIngredientId.$error, 'border-green-600': $v.selectedIngredientId.$dirty && !$v.selectedIngredientId.$error}"
                        @change.native="selectIngredient"
                        @blur.native="$v.selectedIngredientId.$touch()"
                    >
                        <option value="" disabled>Select ingredient</option>
                        <option 
                            v-for="ingredient in ingredients" 
                            :key="ingredient.id"
                            :value="ingredient.id"
                            :disabled="ingredient.exists"
                            class="flex items-center gap-x-3 disabled:bg-gray-100"
                        >
                            {{ingredient.name}}
                        </option>
                    </Select>
                </InputGroup>
                
                <InputGroup
                    id="quantity"
                    label="Quantity"
                    :hasError="$v.ingredient.quantity.$error"
                >
                    <template v-slot:errors>
                        <p v-if="!$v.ingredient.quantity.required">
                            The quantity field is required
                        </p>
                        <p v-if="!$v.ingredient.quantity.integer">
                            The quantity field must be an integer
                        </p>
                        <p v-if="!$v.ingredient.quantity.minValue">
                            The quantity field must be at least 1
                        </p>
                    </template>
                    <Input 
                        v-model="ingredient.quantity"  
                        id="quantity"
                        name="quantity" 
                        :eclass="{'border-red-600': $v.ingredient.quantity.$error, 'border-green-600': $v.ingredient.quantity.$dirty && !$v.ingredient.quantity.$error}"
                        @input.native="$v.ingredient.quantity.$touch()"
                    />
                </InputGroup>
            </form>
        </template>

        <template slot="footer">
            <button 
                @click.prevent="submit"
                class="flex items-center bg-lightBlue-700 rounded-sm text-xs py-1 px-4 mr-2 text-white mt-2 hover:bg-lightBlue-600 active:bg-lightBlue-500 active:shadow-inner  disabled:bg-gray-500 disabled:pointer-events-none"
            >
                Save
            </button>
            <button 
                v-if="isEditMode"
                @click.prevent="remove"
                class="flex items-center bg-red-700 rounded-sm text-xs py-1 px-4 mr-2 text-white mt-2 hover:bg-red-600 active:bg-red-500 active:shadow-inner disabled:bg-gray-500 disabled:pointer-events-none"
            >
                Remove
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
    import { mapGetters } from 'vuex'
    import Modal from './ModalComponent'
    import Input from '../inputs/TextInputComponent';
    import Select from '../inputs/SelectInputComponent';
    import InputGroup from '../inputs/InputGroupComponent';

    import _find from 'lodash/find'
    import _findIndex from 'lodash/findIndex'

    import { required, integer, minValue } from 'vuelidate/lib/validators'

    export default {

        props: {
            propIngredients: {
                type: Array,
                required: true,
            },

            selectedIngredient: {
                type: Object,
                required: false,
                default: null
            }
        },

        computed: {
            ...mapGetters('Ingredients', ['getIngredients']),

            ingredients() {
                return JSON.parse(JSON.stringify(this.getIngredients))
            },

            isEditMode(){
                return this.selectedIngredient ? true : false
            }
        },

        mounted() {   
                     
            if(this.propIngredients ) {
                this.ingredients.forEach(ingredient => {
                    const propIngredientIndex = _findIndex(this.propIngredients, ['id', parseInt(ingredient.id)]);

                    if(propIngredientIndex > -1) {
                        ingredient.exists = true
                    }
                })
            }    

            if(this.selectedIngredient) {
                this.ingredient = JSON.parse(JSON.stringify(this.selectedIngredient))
                this.selectedIngredientId = this.selectedIngredient.id
            }
        },

        data() {
            return {
                selectedIngredientId: '',

                ingredient: {
                    id: '',
                    quantity: '',
                    unit: null
                }
            }
        },
        
        validations: {
            selectedIngredientId: {
                required
            },
            ingredient: {
                quantity: {
                    required,
                    integer,
                    minValue: minValue(1)
                }
            }
        },

        methods: {

            selectIngredient() {
                this.ingredient = _find(this.ingredients, ['id', parseInt(this.selectedIngredientId)]);
            },

            async submit() {
                this.$v.$touch();

                if(!this.$v.$invalid) {
                    this.$emit('saved', this.ingredient);
                }
                
            },

            remove() {
                this.$emit('removed', this.ingredient.id);
            },

            close() {
                this.$emit('closed');
            }
        },


        components: {
            Modal,
            Input,
            Select,
            InputGroup
        }
    }
</script>