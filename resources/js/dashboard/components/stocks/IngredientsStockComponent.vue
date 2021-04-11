<template>
    <div class="flex flex-col bg-white shadow rounded-sm p-5 md:flex-1">
            <ValidationProvider 
                vid="barcode" rules="required" 
                v-slot="{ errors, failed, passed }" 
                class="w-full"
            >
                <label for="name" class="text-sm font-semibold">Barcode</label>
                <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                <div class="flex gap-x-3 items-center relative flex-1">
                    <input 
                        id="barcode"
                        name="barcode" 
                        type="text" 
                        v-model="product.barcode" 
                        @blur="getProduct"
                        :disabled="waiting"   
                        class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                        :class="{'border-red-600': failed, 'border-green-500' : passed}"
                    />
                    <svg v-show="checkingBarcode" class="animate-spin mr-3 h-5 w-5 text-lightBlue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
            </ValidationProvider>
        </div>
</template>

<script>

</script>