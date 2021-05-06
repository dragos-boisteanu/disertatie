<template>
    <ViewContainer>
        <template slot="header">
            Ingredients
        </template>

        <div class="w-full md:flex md:gap-x-4 xl:w-3/4 2xl:w-1/2 ">
            <div class="flex flex-col bg-white shadow rounded-sm p-5 md:flex-1">
                <table class="px-2 w-full rounded-sm max-h-80 md:max-h-96">
                    <thead class="w-full bg-gray-700 text-orange-500">
                        <tr class="text-left text-sm">
                            <th class="p-2 text-center">Index</th>
                            <th class="p-2">Name</th>
                            <th class="p-2">Quantity</th>
                            <th class="p-2"></th>
                        </tr>
                    </thead>
                    <tbody class="overflow-y-auto">
                        <tr 
                            v-for="(ingredient, index) in getIngredients" :key="ingredient.id"
                            @click="selectIngredient(ingredient.id)"
                            class="transition-shadow transition-transform duration-500 ease-in-out text-sm rounded-md cursor-pointer border-white transform hover:scale-105
                            hover:bg-gray-50 hover:shadow-md"
                        >
                            <td class="p-2 text-center font-semibold">{{ index + 1 }}</td>
                            <td class="p-2">{{ ingredient.name }}</td>
                            <td class="p-2">{{ ingredient.stockQuantity }} {{ ingredient.unit.name }}</td>
                            <td class="p-2 flex items-center justify-center">
                                <button v-if="allowRemoval(ingredient.productsCount)" @click="removeIngredient(ingredient.id)">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/></svg>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="mt-4 md:mt-0 lg:flex-1">
                <form class="flex flex-col items-stretch justify-items-start gap-y-3 md:flex-auto">
                    <div class="flex flex-col gap-y-3 bg-white shadow rounded-sm p-5">

                        <h2 class="mb-5 text-xl font-semibold">
                            Ingredient
                        </h2> 

                        <div class="w-full flex-1 flex gap-x-4">
                            <InputGroup 
                                id="name"
                                label="Name"
                                :hasError="$v.ingredient.name.$error"
                            >
                                <template v-slot:errors>
                                    <p v-if="!$v.ingredient.name.required">
                                        The name field is required
                                    </p>
                                    <p v-if="!$v.ingredient.name.alphaSpaces">
                                        The name field must contain only letters or spaces
                                    </p>
                                    <p v-if="!$v.ingredient.name.maxLength">
                                        The name field must be no longer than 50 characters
                                    </p>
                                </template>
                                <Input 
                                    v-model="ingredient.name" 
                                    id="name"
                                    name="name"
                                    :eclass="{'border-red-600' : $v.ingredient.name.$error, 'border-green-600': $v.ingredient.name.$dirty && !$v.ingredient.name.$error}"
                                    :disabled="disabled"
                                    @blur.native="$v.ingredient.name.$touch()"
                                ></Input>
                            </InputGroup> 

                            <InputGroup
                                id="unitId"
                                label="Unit"
                                :hasError="$v.unitId.$error"
                            >
                                <template v-slot:errors>
                                    <p v-if="!$v.unitId.required">
                                        The unit field is required
                                    </p> 
                                </template>
                                <Select
                                    v-model="unitId" 
                                    id="unitId"
                                    name="weight_units"
                                    :eclass="{'border-red-600' : $v.unitId.$error, 'border-green-600': $v.unitId.$dirty && !$v.unitId.$error}"
                                    :disabled="disabled" 
                                    @blur.native="$v.unitId.$touch()"
                                    @change.native="selectUnit"
                                >
                                    <option value="" disabled>Select unit</option>
                                    <option :value="unit.id" v-for="unit in getUnits" :key="unit.id">{{unit.name}} ({{ unit.description }})</option>
                                </Select>
                            </InputGroup>
                        </div>    
                    </div>
                    <div>
                        <Button 
                            v-if="ingredientSelected"
                            type="secondary"
                            @click.native.prevent="clearSelection"
                        >                       
                            Clear selection
                        </Button>
                        <Button 
                            type="primary"
                            :disabled="disabled"
                            :waiting="waiting"
                            @click.native.prevent="submit"
                        >
                            <span v-if="ingredientSelected">
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
    import { mapActions, mapGetters } from 'vuex'

    import ViewContainer from '../ViewContainer'

    import Input from '../../components/inputs/TextInputComponent';
    import Select from '../../components/inputs/SelectInputComponent';
    import Button from '../../components/buttons/ButtonComponent';
    import InputGroup from '../../components/inputs/InputGroupComponent';

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
                return this.waiting || this.canNotCreate
            }

        },

        data() {
            return {
                waiting: false,
                ingredientSelected: false,
                unitId: '',
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
            },
            unitId: { 
                required 
            }
        },

        methods: {
            ...mapActions('Ingredients', ['postIngredient', 'patchIngredient', 'deleteIngredient']),
            ...mapActions('Notification', ['openNotification']),

            allowRemoval(productsCount) {
                return parseInt(productsCount) !== 0
            },

            selectIngredient(id) {
                this.ingredientSelected = true;
                this.ingredient = Object.assign(this.ingredient, _find(this.getIngredients, ['id', id]));
                this.unitId = String(this.ingredient.unit.id)
                this.$v.$reset();
            },

            clearSelection() {
                this.ingredientSelected = false;
                this.resetForm();
            },

            resetForm() {
                this.$v.$reset();
                this.unitId = '';
                this.ingredient = {
                    id: '',
                    name: '',
                    unit: {
                        id: '',
                        name: '',
                    }
                }
            },

            selectUnit() {
                this.ingredient.unit = _find(this.getUnits, ['id', parseInt(this.unitId)]);
            },

            async submit() {

                this.$v.$touch()

                if(!this.$v.$invalid) {
                    try {
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
                                this.$Progress.start();

                                await this.patchIngredient(payload);
                            } else {
                                this.openNotification({
                                    type: 'info',
                                    show: true,
                                    message: 'Nothing to update'
                                });
                            }
                            
                        } else {
                            this.$Progress.start();

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

                    if(this.selectIngredient) {
                        this.clearSelection();
                    }

                    this.$Progress.finish();
                } catch ( error ) {
                    this.$Progress.fail();
                    console.log(error)
                }
            },

        },

        components: {
            ViewContainer,
            Input,
            Select,
            Button,
            InputGroup
        }
    }
</script>