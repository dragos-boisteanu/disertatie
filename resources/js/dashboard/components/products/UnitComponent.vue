<template>
    <span v-if="unit">
        {{unit.name}}
    </span>
</template>

<script>
    import { mapGetters } from 'vuex'
    import _find from 'lodash/find';

    export default {
        props: {
            unitId: {
                type: Number,
                required: true
            }
        },

        computed: {
            ...mapGetters('Units', ['getUnits']),

            unit() {
                return _find(this.getUnits, ['id', this.unitId]);
            }
        }
    }

</script>