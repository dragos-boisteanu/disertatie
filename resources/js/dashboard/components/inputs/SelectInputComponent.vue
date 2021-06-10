<template>
    <select 
        :id="id"
        :name="name" 
        :value="value"
        :class="eclass"
        :disabled="disabled" 
        class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"
        @change="$emit('input', $event.target.value)"
    >
        <slot></slot>
    </select>
</template>

<script>

    export default {
        props: {
            id: {
                type: String,
                required: false,
            },
            name: {
                type: String,
                required: false,
            },
            value:{
                type: [String, Number],
                required: false,
                default: null
            },
            eclass: {
                type: Object,
                required: false
            },
            disabled: {
                type: Boolean,
                required: false,
                default: false,
            },
        },
    }

</script>