<template>
    <div class="py-1 px-2 text-center text-xs text-white rounded-sm bg-lightBlue-600" v-if="roleName">
        {{ roleName }}
    </div>
</template>

<script>
    import _find from 'lodash/find';

    export default {
        props: {
            roleName: {
                type: String,
                required: true,
            }
        },

    }
</script>