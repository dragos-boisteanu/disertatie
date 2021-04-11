<template>
    <div class="w-full">
        <div class="flex bg-white shadow rounded-sm p-5 md:flex-1 gap-x-4 w-1/2">
            <ValidationProvider 
                vid="id" rules="integer" 
                v-slot="{ errors, failed, passed }" 
                class="w-full"
            >
                <label for="name" class="text-sm font-semibold">Id</label>
                <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                <div class="flex gap-x-3 items-center relative flex-1">
                    <input 
                        id="id"
                        name="id" 
                        type="text" 
                        v-model="filter.id"
                        :disabled="waiting"   
                        class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                        :class="{'border-red-600': failed, 'border-green-500' : passed}"
                    />
                    <svg v-show="searchingForIngredientId" class="animate-spin mr-3 h-5 w-5 text-lightBlue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
            </ValidationProvider>
            <ValidationProvider 
                vid="name" rules="alpha_spaces" 
                v-slot="{ errors, failed, passed }" 
                class="w-full"
            >
                <label for="name" class="text-sm font-semibold">Name</label>
                <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                <div class="flex gap-x-3 items-center relative flex-1">
                    <input 
                        id="name"
                        name="name" 
                        type="text" 
                        v-model="filter.name"
                        :disabled="waiting"   
                        class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                        :class="{'border-red-600': failed, 'border-green-500' : passed}"
                    />
                    <svg v-show="searchingForIngredientByName" class="animate-spin mr-3 h-5 w-5 text-lightBlue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
            </ValidationProvider>

        </div>

        <div v-if="ingredient">

        </div>
    </div>
    
</template>

<script>

    export default {
        data() {
            return {
                waiting: false,
                searchingForIngredientId: false,
                searchingForIngredientByName: false,

                filter: {
                    id: '',
                    name: '',
                },

                ingredient: null
            }
        }
    }

</script>