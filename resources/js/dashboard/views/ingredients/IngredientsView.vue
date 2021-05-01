<template>
    <ViewContainer>
        <template slot="header">
            Ingredients
        </template>

        <div class="w-full md:flex md:gap-x-4 xl:w-3/4 2xl:w-1/2 ">
            <div class="flex flex-col bg-white shadow rounded-sm p-5 md:flex-1">
                <ul class="px-2 overflow-y-auto w-full max-h-80 md:flex-1 md:max-h-96 ">
                    <li 
                        v-for="(ingredient, index) in getIngredients" :key="ingredient.id"
                        class="flex items-center justify-between border rounded-sm py-1 px-2 my-3 mr-2"
                    >
                        <div 
                            @click="selectIngredient(ingredient.id)"
                            class="cursor-pointer flex items-center gap-x-2">
                            <span>{{ index + 1 }}.</span>
                            <span>{{ ingredient.name }}</span>
                            <span>{{ ingredient.stockQuantity }} {{ ingredient.unit.name }}</span>
                        </div>
                        <div>
                            <button @click="removeIngredient(ingredient.id)"> X</button>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="mt-4 md:mt-0 lg:flex-1">
                <form @submit.prevent="submit" class="flex flex-col items-stretch justify-items-start gap-y-3 md:flex-auto">
                    <div class="flex flex-col gap-y-3 bg-white shadow rounded-sm p-5">

                        <h2 class="mb-5 text-xl font-semibold">
                            Ingredient
                        </h2> 

                        <div class="w-full flex-1 flex gap-x-4">
                            <div class="flex-grow flex-1">
                                <label for="name" class="text-sm font-semibold">Nane</label>
                                <div class="text-xs text-red-600 font-semibold mb-1" v-if="$v.ingredient.name.$error">
                                    <p v-if="!$v.ingredient.name.required">
                                        The name field is required
                                    </p>
                                    <p v-if="!$v.ingredient.name.alphaSpaces">
                                        The name field must contain only letters or spaces
                                    </p>
                                    <p v-if="!$v.ingredient.name.maxLength">
                                        The name field must be no longer than 50 characters
                                    </p>
                                </div>
                                <input 
                                    id="name"
                                    name="name" 
                                    type="text" 
                                    v-model="ingredient.name" 
                                    class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                                    :class="{'border-red-600' : $v.ingredient.name.$error, 'border-green-600': $v.ingredient.name.$dirty && !$v.ingredient.name.$error}"
                                    :disabled="disabled"
                                    @blur="$v.ingredient.name.$touch()"
                                />
                            </div> 

                            <div class="flex-0">
                                <label for="vat" class="text-sm font-semibold">Unit</label>
                                <div class="text-xs text-red-600 font-semibold mb-1" v-if="$v.ingredient.unit.id.$error">
                                    <p v-if="!$v.ingredient.unit.id.required">
                                        The unit field is required
                                    </p> 
                                </div>
                                <select 
                                    id="unit_id"
                                    name="weight units" 
                                    type="text" 
                                    v-model="ingredient.unit" 
                                    class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                                    :class="{'border-red-600' : $v.ingredient.unit.id.$error, 'border-green-600': $v.ingredient.unit.id.$dirty && !$v.ingredient.unit.id.$error}"
                                    :disabled="disabled" 
                                    @blur="$v.ingredient.unit.id.$touch()"
                                >
                                    <option value="" disabled>Select unit</option>
                                    <option :value="unit" v-for="unit in getUnits" :key="unit.id">{{unit.name}} ({{ unit.description }})</option>
                                </select>
                            </div>
                        </div>    
                    </div>
                    <div>
                        <button 
                            v-if="ingredientSelected"
                            @click.prevent="clearSelection"
                            class="mb-3 inline-flex items-center justify-center px-2 py-1 w-full text-base text-white bg-lightBlue-600 rounded-sm active:shadow-inner active:bg-lightBlue-500 md:w-auto"
                        >                       
                            Clear selection
                        </button>
                        <button 
                            type="submit"
                            :disabled="disabled"  
                            class="inline-flex items-center justify-center px-2 py-1 w-full text-base text-white bg-green-600 rounded-sm active:shadow-inner active:bg-green-500 md:w-auto disabled:bg-gray-500 disabled:pointer-events-none"
                        >
                            <svg v-if="waiting" class="animate-spin mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span v-if="ingredientSelected">
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
    import { mapActions, mapGetters } from 'vuex'
    import ViewContainer from '../ViewContainer'
    import _find from 'lodash/find';

    import { required, maxLength, } from 'vuelidate/lib/validators'
    import { alphaSpaces } from '../../validators/index';

    export default {
        computed: {
            ...mapGetters('Ingredients', ['getIngredients']),
            ...mapGetters('Units', ['getUnits']),
            ...mapGetters('Users',['getLoggedUser']),

            canNotCreate() {
                return this.getLoggedUser.role_id !== 6 && this.getLoggedUser.role_id !== 7
            },

            disabled() {
                console.log(this.canNotCreate)
                return this.waiting || this.canNotCreate
            }

        },

        data() {
            return {
                waiting: false,
                ingredientSelected: false,
                ingredient: {
                    id: '',
                    name: '',
                    unit: {
                        id: '',
                        name: '',
                    }
                }
            }
        },

        validations: {
            ingredient: {
                name: {
                    required,
                    alphaSpaces,
                    maxLength: maxLength(50),
                },
                unit: {
                    id: {
                        required
                    }
                }
            }
        },

        methods: {
            ...mapActions('Ingredients', ['postIngredient', 'patchIngredient', 'deleteIngredient']),
            ...mapActions('Notification', ['openNotification']),

            selectIngredient(id) {
                this.ingredientSelected = true;
                this.ingredient = Object.assign(this.ingredient, _find(this.getIngredients, ['id', id]));
                this.$v.$reset();
            },

            clearSelection() {
                this.ingredientSelected = false;
                this.resetForm();
            },

            resetForm() {
                this.$v.$reset();
                this.ingredient = {
                    id: '',
                    name: '',
                    unit: {
                        id: '',
                        name: '',
                    }
                }
            },

            async submit() {

                this.$v.$touch()

                if(!this.$v.$invalid) {
                    try {
                        this.$Progress.start();

                        if(this.ingredientSelected) {

                            const originalIngredient = _find(this.getIngredients, ['id', this.ingredient.id]);

                            const payload = {
                                vm: this,
                                ingredient: {
                                    id: this.ingredient.id,
                                }
                            }

                            let counter = 0;

                            Object.keys(this.ingredient).forEach(key => {
                                if(originalIngredient[key] !== this.ingredient[key]) {
                                    payload.ingredient[key] = this.ingredient[key];
                                    counter++;
                                }
                            });

                            if(counter > 0 ) {
                                await this.patchIngredient(payload);
                            } else {
                                this.openNotification({
                                    type: 'info',
                                    show: true,
                                    message: 'Nothing to update'
                                });
                            }
                            
                        } else {
                            await this.postIngredient(this.ingredient);
                            this.resetForm();
                        }

                        this.waiting = false;
                        this.$Progress.finish()

                    } catch ( error ) {
                        this.$Progress.fail();
                        this.waiting = false;
                        console.log(error);
                        
                        if(error.response && error.response.data.errors) {
                           this.$v.$touch()
                        }  
                    }
                }
                
            },

            async removeIngredient(id) {
                try {
                    this.$Progress.start();

                    await this.deleteIngredient(id);

                    this.$Progress.finish();
                } catch ( error ) {
                    this.$Progress.fail();
                    console.log(error)
                }
            },

        },

        components: {
            ViewContainer
        }
    }
</script>