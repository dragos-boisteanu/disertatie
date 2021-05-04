<template>
    <div class="flex flex-col gap-y-1" :class="eclass">
        <label :for="id" class="text-sm font-semibold">{{ label }}</label>
        <div class="text-xs text-red-600 font-semibold" v-if="hasError">
            <slot name="errors"></slot>
        </div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props: {
            label: {
                type: String,
                required: true
            },
            id: {
                type: String,
                required: true
            },
            hasError: {
                type:Boolean,
                required: false,
                defualt: false,
            },
            eclass: {
                type: Object,
                required: false,
            }
        }
    }
</script>