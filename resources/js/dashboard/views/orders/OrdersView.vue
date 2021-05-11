<template>
    <ViewContainer>

        <OrdersFilter
            v-if="showFilterState"
            @closed="toggleFilterState"
        />

        <template slot="header">
            Orders
        </template>
   
        <div class="flex flex-col pb-3 md:flex-row md:justify-between items-end">
            <div class="w-full md:flex md:flex-row md:gap-3 md:items-center">
                <button 
                    class="w-full py-1 text-base text-white ripple-bg-green-600 rounded-sm active:shadow-inner md:w-20"
                    @click="toggleFilterState"
                    >
                    Filter
                </button>
                <button 
                    @click="refresh"
                    class="w-full py-1 mt-2  text-base text-white ripple-bg-lightBlue-600 rounded-sm active:shadow-inner md:w-20 md:mt-0" 
                    >
                    Refresh
                </button>
                <router-link
                    :to="{name: 'CreateOrder'}" 
                    class="block w-full py-1 px-2 mt-2 text-center text-base text-white ripple-bg-orange-600 rounded-sm active:bg-orange-500 md:w-auto md:mt-0" 
                >
                    Create order
                </router-link>
            </div>
        
            <select 
                v-model="orderBy" 
                @change="order"
                class="w-full p-1 mt-2 text-base border-gray-300 border rounded-sm md:w-auto">
                <option :value="1">Created at asc</option>
                <option :value="2">Created at desc</option>
            </select>
        </div>

        <CardsList>
            <Card v-for="order in getOrders" :key="order.id">
                <router-link :to="{name: 'Order', params: { id: order.id}}">
                    <div class="w-full flex justify-start items-center pb-1 border-b border-gray-100">
                       <div class="flex-1">
                           <div class="text-xl font-semibold">
                               # {{order.id}}
                           </div>
                           <div class="py-1 font-semibold">
                               <div v-if="order.client">
                                   {{ order.client.name }}
                               </div>
                               <div v-else>
                                   {{ extractClientFirstNameFromOrderAddres(order.address) }}
                               </div>
                           </div>
                           <div class="flex items-center">
                               <div class="flex items-center">
                                   <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6.54 5c.06.89.21 1.76.45 2.59l-1.2 1.2c-.41-1.2-.67-2.47-.76-3.79h1.51m9.86 12.02c.85.24 1.72.39 2.6.45v1.49c-1.32-.09-2.59-.35-3.8-.75l1.2-1.19M7.5 3H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.49c0-.55-.45-1-1-1-1.24 0-2.45-.2-3.57-.57-.1-.04-.21-.05-.31-.05-.26 0-.51.1-.71.29l-2.2 2.2c-2.83-1.45-5.15-3.76-6.59-6.59l2.2-2.2c.28-.28.36-.67.25-1.02C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1z"/></svg>
                                    <div class="ml-2">
                                        {{ order.phoneNumber}} 
                                    </div>
                               </div>
                               <div v-if="order.email" class="flex items-center">
                                    <span class="mx-2">|</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/></svg>
                                    <span class="ml-2">{{order.email}}</span>
                               </div>
                              
                           </div>
                       </div>
                       <div>
                           <OrderStatus :status-id="order.status"></OrderStatus>
                       </div>
                    </div>
                    <div class="w-full flex justify-between items-center pt-1">
                        <div>
                            {{ order.staff.name }}
                        </div>
                        <div class="text-sm">
                            {{ order.createdAt | formatDate}}
                        </div>
                    </div>
                    <div class="w-full flex justify-between items-center pt-1 font-semibold">
                        <div>
                            {{ orderTotalQuantity(order.items) }} items
                        </div>
                        <div>
                            {{ orderTotalValue(order.items) }} Ron
                        </div>
                    </div>

                </router-link>
            </Card>
        </CardsList>
       
    </ViewContainer>
</template>

<script>
    import ViewContainer from '../ViewContainer';

    import CardsList from '../../components/cards/CardsListComponent';
    import Card from '../../components/cards/CardComponent';
    import OrderStatus from '../../components/orders/OrderStatusComponent';

    import OrdersFilter from '../../components/filter/OrdersFilterComponent'

    import store from '../../store/index'
    import { mapActions, mapGetters } from 'vuex';

    import _findIndex from 'lodash/findIndex'
    
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

        mounted() {
             if(this.$route.query.orderBy) {
                this.orderBy = this.$route.query.orderBy;
            } else {
                this.orderBy = 1;
            }
        },

        computed: {
            ...mapGetters('Orders', ['getOrders']),
        },

        data() {
            return {
                showFilterState: false,
                orderBy: 1
            }
        },

        methods: {
            ...mapActions('Orders', ['refreshOrders', 'downloadOrders']),

            orderTotalValue(items) {
                let totalValue = 0;
                items.forEach(item => {
                    totalValue += parseInt(item.quantity) + parseFloat(item.price)
                })
                return totalValue.toFixed(2);
            },

            orderTotalQuantity(items) {
                let totalQuantity = 0;

                items.forEach(item => {
                    totalQuantity += item.quantity
                })

                return totalQuantity
            },

            async refresh() {
                try {
                    if(Object.keys(this.$route.query).length > 0) { 
                        this.$router.replace({name:'Orders', query: {}});
                    }
                    this.orderBy = 1
                    await this.refreshOrders();
                } catch ( error ) {
                    console.log(error)
                }
            },

            async order() {
                try {
                    this.$Progress.start()

                    const query = Object.assign({}, this.$route.query);
                 
                    query.orderBy = this.orderBy;
                    
                    await this.downloadOrders(query)

                    this.$router.replace({name:'Orders', query});

                    this.$Progress.finish()
                } catch ( error ) {
                    this.$Progress.fail();
                    console.log(error);
                }
            },

            extractClientFirstNameFromOrderAddres(address) {
              return address.substr(0, address.indexOf(' '));
            },

            toggleFilterState() {
                this.showFilterState = !this.showFilterState
            }
        },
        

        components: {
            ViewContainer,
            Card,
            CardsList,
            OrderStatus,
            OrdersFilter
        }
    }
</script>