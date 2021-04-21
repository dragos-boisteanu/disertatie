<template>
    <div class="mt-4">
        <div>
            <input type="checkbox" id="hasIngredients" @change="clearIngredients" v-model="localProduct.hasIngredients" :disabled="waiting || locked"/>
            <label for="hasIngredients" >Has ingredients</label>
        </div>

        <div class="w-full mt-2" v-if="localProduct.hasIngredients">
            <label for="name" class="text-sm font-semibold">Ingredients</label>
            <!-- <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div> -->
            <ul v-if="localProduct.ingredients.length > 0"
                class="flex items-center gap-x-2 my-1"
            >
                <li v-for="ingredient in localProduct.ingredients" :key="ingredient.id"
                    class="text-xs p-1 px-2 bg-white rounded border flex items-center gap-x-1 cursor-pointer hover:border-gray-600"
                    :class="{'disabled pointer-events-none bg-gray-100': waiting || locked}"
                    @click="removeIngredient(ingredient.id)"
                > 
                    <span>  {{ ingredient.quantity}}{{ ingredient.unit.name}}</span>
                    <span> {{ingredient.name}} </span>
                </li>
            </ul>
            <div class="relative flex items-center gap-x-3 bg-white w-full text-sm rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500">

                <input type="text" name="ingredients" class="outline-none  p-2 h-full w-full rounded" v-model="ingredientInput" @keyup="findIngredient" :disabled="waiting || locked" />

                <ul class="absolute top-8 left-0 right-0 bg-white rounded border my-2 shadow max-h-24 overflow-y-auto" v-if="foundIngredients.length > 0">
                    <li v-for="ingredient in foundIngredients" :key="ingredient.id"
                        @click="selectIngredient(ingredient.id)"
                        class="p-1 cursor-pointer hover:bg-gray-50"    
                    >
                        <div>
                            {{ingredient.name}}
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        props: {
            ingredients: {
                type: Array,
                required: true,
                default: [],
            }
        },

        methods: {
            toggleIngredients() {
                this.product.hasIngredients = !this.product.hasIngredients;
            },

            findIngredient(){
                if(this.ingredientInput.length > 0) {
                    const lastSpaceIndex = this.ingredientInput.lastIndexOf(" ");
                    this.foundIngredients = _filter(this.getIngredients, ingredient =>  (new RegExp ('^' + `${this.ingredientInput.substring(lastSpaceIndex +1 )}`, 'i').test( ingredient.name )));
                }else {
                    this.foundIngredients = [];
                }
            }, 

            selectIngredient(id) {
                const productIngredient = _find(this.product.ingredients, ['id', id]);

                if(productIngredient) {
                    this.openNotification({
                        type: 'info',
                        show: true,
                        message: 'The product already has this ingredient'
                    })
                }else {
                    try {
                        const selectedIngredient = _find(this.foundIngredients, ['id', id]);
                        const indexOfFirstSpace = this.ingredientInput.indexOf(" ");
                        
                        const ingredientQuantity = this.ingredientInput.substring(0, indexOfFirstSpace);
                        if(ingredientQuantity.length === 0 ) {
                            throw 'Ingredient quantity is required'
                        }
                        if(!Number.isSafeInteger(parseInt(ingredientQuantity))) {
                            throw 'The first part must be an integer'
                        }

                        selectedIngredient.quantity = this.ingredientInput.substring(0, indexOfFirstSpace);
                        this.product.ingredients.push(selectedIngredient);
                        this.ingredientInput = '';

                        this.foundIngredients = [];
                    } catch (error) {
                        const errors = {
                            ingredient: [ error ]
                        }
                        this.$refs.observer.setErrors(errors);
                    }
                }
            },
   
            removeIngredient(id) {
                const ingredientIndex = _findIndex(this.product.ingredients, ['id', id]);
                this.product.ingredients.splice(ingredientIndex, 1);
            },
        }
    }
</script>
