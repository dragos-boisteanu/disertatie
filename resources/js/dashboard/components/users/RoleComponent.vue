<template>
    <div class="py-1 px-2 ml-2 text-xs text-white rounded-sm bg-lightBlue-600">
        {{role.name}}
    </div>
</template>

<script>
    import { mapGetters } from "vuex"

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
                return this.getRoles.filter(role => {
                    return role.id == this.roleId
                })[0];
           }
        }
    }
</script>