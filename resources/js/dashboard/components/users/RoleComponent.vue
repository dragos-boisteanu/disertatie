<template>
    <div class="py-1 px-2 ml-2 text-xs text-white rounded-sm bg-lightBlue-600">
        {{role.name}}
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import _find from 'lodash/find';

    export default {
        props: {
            roleId: {
                type: Number,
                required: true,
            }
        },

        computed: {
            ...mapGetters('Roles', ['getRoles']),

            role() {
                return _find(this.getRoles, ['id', this.roleId]);
           }
        }
    }
</script>