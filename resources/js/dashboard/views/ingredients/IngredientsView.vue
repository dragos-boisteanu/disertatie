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
                <form class="flex flex-col items-stretch justify-items-start gap-y-3 md:flex-auto">
                    <div class="flex flex-col gap-y-3 bg-white shadow rounded-sm p-5">

                        <h2 class="mb-5 text-xl font-semibold">
                            Ingredient
                        </h2> 

                        <div class="w-full flex-1 flex gap-x-4">
                            <InputGroup 
                                id="name"
                                label="Label"
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
                                >
                                </Input>
                            </InputGroup> 

                            <InputGroup
                                id="name"
                                label="Label"
                                :hasError="$v.unitId.$error"
                            >
                                <template v-slot:errors>
                                    <p v-if="!$v.unitId.required">
                                        The unit field is required
                                    </p> 
                                </template>
                                <Select
                                    v-model="unitId" 
                                    id="unit_id"
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
                console.log(this.canNotCreate)
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
            ViewContainer,
            Input,
            Select,
            Button,
            InputGroup
        }
    }
</script>