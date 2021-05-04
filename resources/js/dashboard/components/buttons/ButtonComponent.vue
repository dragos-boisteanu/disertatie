<template>
    <button
        :id="id"
        :name="name"
        :class="eclass"
        :disabled="disabled"
        type="button"
        class="w-full inline-flex items-center justify-center px-2 py-1 text-base rounded-sm active:shadow-inner md:w-auto disabled:bg-gray-500 disabled:pointer-events-none"
    >
        <svg v-if="waiting" class="animate-spin mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>

        <slot></slot>
        
    </button>    
</template>

<script>
    export default {
        props:{
            id: {
                type: String,
                requried: false,
            },
            name: {
                type: String,
                requried: false,
            },
            type: {
                type: String,
                requried: true,
            },
            disabled: {
                type: Boolean,
                required: false,
                default: false
            },
            waiting: {
                type: Boolean,
                requried: false,
                default: false
            },
        },

        computed: {
            eclass() {
                let result = '';

                switch (this.type) {
                    case 'primary':
                        result = 'text-white bg-green-600 active:bg-green-500';
                        break;
                    case 'secondary': 
                        result = 'mb-3 md:mb-0 text-white bg-lightBlue-600 active:bg-lightBlue-500';
                        break;
                    case 'danger':
                        result = 'text-white bg-red-600 active:bg-red-500'
                    default:
                        result = 'text-black transparent border active:border-gray-600'
                        break;
                }

                return result;
            }
        }
    }
</script>