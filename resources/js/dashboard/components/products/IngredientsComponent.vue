<template>
    <div class="w-full flex flex-col gap-y-2 items-start justify-start">
        <IngredientModal
            v-if="showModal"
            :prop-ingredients="ingredients"
            :selected-ingredient="selectedIngredient"
            @saved="saveIngredient"
            @removed="removeIngredient"
            @closed="toggleModal"
        ></IngredientModal>
        <label for="name" class="text-sm font-semibold">Ingredients</label>
        <ul v-if="hasIngredients"
            class="flex items-center gap-x-2 my-1"
        >
            <li v-for="ingredient in ingredients" 
                :key="ingredient.id"
                class="text-xs p-1 px-2 bg-white rounded border flex items-center gap-x-1 cursor-pointer hover:border-gray-600"
                @click="selectIngredient(ingredient.id)"
            > 
                <span>  {{ ingredient.quantity }}{{ ingredient.unit.name }}</span>
                <span> {{ingredient.name}} </span>
            </li>
        </ul>

        <button
            @click.prevent="openModal"
            class="px-2 py-1 border rounded-sm text-sm hover:border-gray-600 active:shadow-inner disabled:pointer-events-none"

        >
           Add ingredient
       </button>
    </div>
</template>


<script>
    import IngredientModal from '../modals/IngredientModalComponent';

    import _find from 'lodash/find';
    import _findIndex from 'lodash/findIndex'

    export default {
        props: {
            ingredients: {
                type: Array,
                required: true,
                default: [],
            },
        },

        computed: {
            hasIngredients() {
                return this.ingredients.length > 0
            }
        },

        data() {
            return {
                selectedIngredient: null,
                showModal: false
            }
        },

        methods: {
            toggleIngredients() {
                this.product.hasIngredients = !this.product.hasIngredients;
            },

            openModal() {
                this.selectedIngredient = null;
                this.toggleModal();
            },

            toggleModal() {
                this.showModal = !this.showModal;
            },

            selectIngredient(id) {
                this.selectedIngredient = _find(this.ingredients, ['id', parseInt(id)])
                this.toggleModal();
            },

            saveIngredient(ingredient) {
                this.$emit('saved', ingredient);
                this.toggleModal();
            },

            removeIngredient(id) {
                this.$emit('removed', id);
                this.toggleModal();
            },

            closed() {
                this.toggleModal();
            },
        },

        components: {
            IngredientModal
        }
    }
</script>
