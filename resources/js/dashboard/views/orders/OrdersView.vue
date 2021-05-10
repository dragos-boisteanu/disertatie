<template>
    <ViewContainer>
        <template slot="header">
            Orders
        </template>
  
        <div class="flex flex-col pb-3 md:flex-row md:justify-between items-end">
            <div class="w-full md:flex md:flex-row md:gap-3 md:items-center">
                <button 
                    class="w-full py-1 text-base text-white bg-green-600 rounded-sm active:shadow-inner active:bg-green-500 md:w-20"
                    
                    >
                    Filter
                </button>
                <button 
                    class="w-full py-1 mt-2  text-base text-white bg-lightBlue-600 rounded-sm active:shadow-inner active:bg-lightBlue-500 md:w-20 md:mt-0" 
                    >
                    Refresh
                </button>
                <router-link
                    :to="{name: 'CreateOrder'}" 
                    class="block w-full py-1 px-2 mt-2 text-center text-base text-white bg-orange-600 rounded-sm active:shadow-inner active:bg-orange-500 md:w-auto md:mt-0" 
                >
                    Create order
                </router-link>
            </div>
        
            <select  
                class="w-full p-1 mt-2 text-base border-gray-300 border rounded-sm md:w-auto">
                <option :value="1">Name asc</option>
            </select>
        </div>

        <CardsList>
            <Card v-for="order in getOrders" :key="order.id">
                <router-link :to="{name: 'Order', params:order.id}">
                    {{ order.id }}
                </router-link>
            </Card>
        </CardsList>
       
    </ViewContainer>
</template>

<script>
    import ViewContainer from '../ViewContainer';

    import CardsList from '../../components/cards/CardsListComponent';
    import Card from '../../components/cards/CardComponent';

    import store from '../../store/index'
    import { mapGetters } from 'vuex';
    
    export default {
        async beforeRouteEnter(to, from, next) {
            if(Object.keys(to.query).length === 0) {
                await store.dispatch('Orders/downloadOrders');
                next();
            } else {
                await store.dispatch('Orders/downloadOrders', to.query);
                next();
            }
        },

        computed: {
            ...mapGetters('Orders', ['getOrders']),
        },
        

        components: {
            ViewContainer,
            Card,
            CardsList
        }
    }
</script>