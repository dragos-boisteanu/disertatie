<template>
    <ViewContainer>
        <template slot="header">
            View order
        </template>

        <div v-if="order">
            {{ order.id }}
        </div>
       
    </ViewContainer>
</template>

<script>
    import store from '../../store/index';

    import _find from 'lodash/find'

    import ViewContainer from '../ViewContainer';

    export default {
        async beforeRouteEnter(to, from, next) {
            let order = await store.dispatch('Orders/getOrder', to.params.id);

            next(vm => vm.setOrder(order));
        },

        data() {
            return {
                order: null,
            }
        },

        methods: {
            setOrder(order) {
                this.order = JSON.parse(JSON.stringify(order));
            }
        },

        components: {
            ViewContainer
        }
    }
</script>