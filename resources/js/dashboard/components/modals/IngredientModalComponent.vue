<template>
    <Modal>

        <template slot="header">
            Ingredient
        </template>

        <template slot="body">
            <ValidationObserver ref="observer">
                <form class="flex flex-col gap-3">
                    <ValidationProvider 
                        vid="ingredient" 
                        rules="required" 
                        v-slot="{ errors, failed, passed }" 
                        class="w-full"
                    >
                        <label for="ingredient" class="text-sm font-semibold">Ingredient</label>
                            <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                            <select 
                                id="ingredient"
                                name="ingredient"
                                v-model="ingredient.id" 
                                class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                                :class="{'border-red-600': failed, 'border-green-500' : passed}"
                                @change="selectIngredient"
                                :disabled="isEditMode"
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
                            </select>
                    </ValidationProvider>
                    
                    <ValidationProvider 
                        vid="quantity" 
                        rules="required|integer" 
                        v-slot="{ errors, failed, passed }" 
                        class="w-full"
                    >
                        <label for="quantity" class="text-sm font-semibold">Quantity</label>
                        <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                        <input 
                            id="quantity"
                            name="quantity" 
                            type="quantity" 
                            v-model="ingredient.quantity"  
                            class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                            :class="{'border-red-600': failed, 'border-green-500' : passed}"
                        />
                    </ValidationProvider>
                </form>
            </ValidationObserver>
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

    import _find from 'lodash/find'
    import _findIndex from 'lodash/findIndex'

    export default {

        props: {
            propIngredients: {
                type: Array,
                required: true,
                default: null,
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
            }
        },

        data() {
            return {
                // ingredients: [],

                ingredient: {
                    id: '',
                    qauantity: '',
                    unit: null
                }
            }
        },

        methods: {

            selectIngredient() {
                this.ingredient = _find(this.ingredients, ['id', parseInt(this.ingredient.id)]);
            },

            async submit() {
                const valid = await this.$refs.observer.validate()
                if(valid) {
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
            Modal
        }
    }
</script>