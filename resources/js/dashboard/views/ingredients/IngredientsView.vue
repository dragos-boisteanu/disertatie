<template>
    <ViewContainer>
        <template slot="header">
            Ingredients
        </template>

        <div class="w-full md:flex xl:w-3/4 2xl:w-1/2 ">
            <ul class="px-2 overflow-y-scroll w-full max-h-80 md:flex-1 md:max-h-96 ">
                <li 
                    v-for="(ingredient, index) in getIngredients" :key="ingredient.id"
                    class="flex items-center justify-between border rounded-sm py-1 px-2 my-3"
                >
                    <div 
                        @click="selectIngredient(ingredient.id)"
                        class="cursor-pointer flex items-center gap-x-2">
                        <span>{{ index + 1 }}.</span>
                        <span>{{ ingredient.name }}</span>
                        <span>{{ ingredient.quantity }} {{ ingredient.unitName }}</span>
                    </div>
                    <div>
                        <button @click="removeIngredient(ingredient.id)"> X</button>
                    </div>
                </li>
            </ul>

            <div class="mt-5 md:flex-1 md:mt-0">
                <ValidationObserver v-slot="{ handleSubmit }" ref="observer">
                    <form @submit.prevent="handleSubmit(submit)" class="flex flex-col w-full">
                        <div class="flex flex-col items-stretch justify-items-start gap-y-3 pt-5 border-t border-gray-200 md:border-l md:pl-5 md:border-t-0 md:pt-0 md:flex-auto">
                            <h2 class="mb-5 text-xl font-semibold">
                                Ingredient
                            </h2> 

                            <ValidationProvider vid="name" rules="required|alpha_spaces|max:50" v-slot="{ errors, failed, passed }" class="flex-grow flex-shrink-0">
                                <label for="name" class="text-sm font-semibold">Nane</label>
                                <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                                <input 
                                    id="name"
                                    name="name" 
                                    type="text" 
                                    v-model="ingredient.name" 
                                    :disabled="waiting"   
                                    class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                                    :class="{'border-red-600': failed, 'border-green-500' : passed}"
                                />
                            </ValidationProvider> 
                            
                            <div class="w-full flex-1 flex items-center gap-x-4">
                                <ValidationProvider vid="vat" rules="required|integer" v-slot="{ errors, failed, passed }" class="flex-1">
                                    <label for="vat" class="text-sm font-semibold">Quantity</label>
                                    <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                                    <input 
                                        id="vat"
                                        name="vat" 
                                        type="number" 
                                        v-model="ingredient.quantity" 
                                        :disabled="waiting"   
                                        class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                                        :class="{'border-red-600': failed, 'border-green-500' : passed}"
                                    />
                                </ValidationProvider>

                                <ValidationProvider vid="color" rules="required" v-slot="{  errors, failed, passed }" class="flex-1">
                                    <label for="vat" class="text-sm font-semibold">Unit</label>
                                    <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                                    <select 
                                        id="unit_id"
                                        name="weight units" 
                                        type="text" 
                                        v-model="ingredient.unit_id" 
                                        :disabled="waiting"   
                                        class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                                        :class="{'border-red-600': failed, 'border-green-500' : passed}"
                                    >
                                        <option value="" disabled>Select unit</option>
                                        <option :value="unit.id" v-for="unit in getUnits" :key="unit.id">{{unit.name}} ({{ unit.description }})</option>
                                    </select>

                                </ValidationProvider>
                            </div>
                            <div>
                                <button 
                                    v-if="ingredientSelected"
                                    @click.prevent="clearSelection"
                                    class=" mb-3 inline-flex items-center justify-center px-2 py-1 w-full text-base text-white bg-lightBlue-600 rounded-sm active:shadow-inner active:bg-lightBlue-500 md:w-auto"
                                >                       
                                    Clear selection
                                </button>
                                <button 
                                    type="submit"
                                    :disabled="waiting"  
                                    class="inline-flex items-center justify-center px-2 py-1 w-full text-base text-white bg-green-600 rounded-sm active:shadow-inner active:bg-green-500 md:w-auto disabled:bg-gray-500 disabled:pointer-events-none"
                                >
                                    <svg v-if="waiting" class="animate-spin mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>
                                        Submit
                                    </span>
                                </button>
                            </div>
                            
                        </div>                     
                        
                    </form>
                </ValidationObserver>
            </div>
        </div>

    </ViewContainer>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import ViewContainer from '../ViewContainer'
    import _find from 'lodash/find';
    import store from '../../store';

    export default {

        async beforeRouteEnter (to, from, next) {
            if(store.getters['Ingredients/getIngredients'].lenght > 0) {
                next();
            } else {
                await store.dispatch('Ingredients/downloadIngredients');
                next();
            }
        },

        computed: {
            ...mapGetters('Ingredients', ['getIngredients']),
            ...mapGetters('Units', ['getUnits']),
        },

        data() {
            return {
                waiting: false,
                ingredientSelected: false,
                ingredient: {
                    id: '',
                    name: '',
                    quantity: '',
                    unit_id: '',
                    unit_name: '',
                }
            }
        },

        methods: {
            ...mapActions('Ingredients', ['postIngredient', 'patchIngredient', 'deleteIngredient']),

            selectIngredient(id) {
                this.ingredientSelected = true;
                this.ingredient = Object.assign(this.ingredient, _find(this.getIngredients, ['id', id]));
            },

            clearSelection() {
                this.ingredientSelected = false;
                this.resetForm();
            },

            resetForm() {
                this.$refs.observer.reset();
                this.ingredient = {
                    id: '',
                    name: '',
                    quantity: '',
                    unit_id: '',
                    unit_name: '',
                }
            },

            async submit() {
                try {
                    this.$Progress.start();

          
                    if(this.ingredientSelected) {

                        const originalIngredient = _find(this.getIngredients, ['id', this.ingredient.id]);

                        const payload = {
                            vm: this,
                            ingredient: {
                                id: this.ingredient.id
                            }
                        }

                        let counter = 0;

                        Object.keys(originalIngredient).forEach(key => {
                            if(originalIngredient[key] !== this.ingredient[key]) {
                                payload.ingredient[key] = this.ingredient[key];
                                counter++;
                            }
                        });

                        if(counter > 0 ) {
                            await this.patchIngredient(payload);

                        } else {
                            console.log('nothing to update')
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
                    
                    if(error.response.data.errors) {
                        this.$refs.observer.setErrors(error.response.data.errors)
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
            }
        },

        components: {
            ViewContainer
        }
    }
</script>