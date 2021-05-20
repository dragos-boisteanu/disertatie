<template>
    <ViewContainer v-if="order">
        <template slot="header">
            View order #{{ order.id }}
        </template>

        <div class="flex flex-col gap-4 md:flex-row md:flex-wrap">
            <div class="w-full bg-white shadow rounded p-4 md:flex-grow md:flex-shrink-0">
                <div class="text-xl font-semibold my-3">Order details</div>
                <div class="text-sm">
                    <div class="my-1">
                        <div>
                            <span class="font-semibold">Created At: </span> <span>{{ order.createdAt | formatDate}}</span>
                        </div>
                        <div>
                            <span class="font-semibold">Updated At: </span> <span>{{ order.updatedAt | formatDate}}</span>
                        </div>
                        <div>
                            <span class="font-semibold">Status: </span> <span>{{ order.status.name }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex-1 bg-white shadow rounded p-4">
                <div class="text-xl font-semibold my-3">Client</div>
                <div class="text-sm">
                    <div class="my-1">
                        <div v-if="order.client">
                            <span class="font-semibold">Name: </span> <span>{{ order.client.name}}</span>
                        </div>
                        <div v-else>
                            <span class="font-semibold">Name: </span> <span>{{ order.firstName }}</span>
                        </div>
                    </div>
                    <div class="my-1">
                        <div class="my-1">
                            <span class="font-semibold">Phone number: </span> <span>{{ order.phoneNumber}}</span>
                        </div>
                        <div v-if="order.email">
                            <span class="font-semibold">Email: </span> <span>{{ order.email }}</span>
                        </div>
                    </div>
                    <div class="my-1">
                        <span class="font-semibold">Address: </span> <span>{{ order.address}}</span>
                    </div>
                    <div>
                        <span class="font-semibold">Observations: </span> <span>{{ order.observations}}</span>
                    </div>
                </div>
            </div>
            <div class="flex-1 border-b pb-4 bg-white shadow rounded p-4">
                <div class="text-xl font-semibold my-3">Staff</div>
                <div class="text-sm">
                    <div class="my-1">
                        <div>
                            <span class="font-semibold">ID: </span> <span>{{ order.staff.id }}</span>
                        </div>
                        <div>
                            <span class="font-semibold">Name: </span> <span>{{ order.staff.name}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="w-full border-b pb-2 overflow-y-auto">   
            <table class="my-4 px-2 w-full rounded-sm lg:w-1/2 text-center">
                <thead class="w-full bg-gray-700 text-orange-500">
                    <tr class="text-left text-sm">
                        <th class="p-2 text-center rounded-tl">#</th>
                        <th class="p-2 text-center">Name</th>
                        <th class="p-2 text-center">Quantity</th>
                        <th class="p-2 text-center">Unit Price</th>
                        <th class="p-2 text-center">VAT</th>
                        <th class="p-2 text-center">Discount</th>
                        <th class="p-2 text-center">Total Price</th>
                        <th class="p-2 text-center"></th>
                    </tr>
                </thead>
                <tbody class="overflow-y-auto">
                    <OrderItem  
                        v-for="(item, index) in order.items" 
                        :key="index" :item="item" 
                        :index="index"
                        :show-actions="false"
                    ></OrderItem>
                    <tr v-if="order.items.length > 0" class="mt-1 font-bold border-t">                                    
                        <td colspan="2" class="p-2 text-center">
                            TOTAL
                        </td>
                        <td class="p-2">{{ order.totalQuantity }}</td>
                        <td class="p-2"></td>
                        <td class="p-2"></td>
                        <td class="p-2"></td>
                        <td class="p-2 text-center">{{ order.totalValue }} Ron</td>
                    </tr>
                </tbody>
            </table>
        </div>

         <div class="mt-5 flex gap-4 md:justify-start" v-if="canDoAction">
            <Button 
                id="edit"
                name="edit"
                type="primary"
            >
                Edit
            </Button>
            <Button 
                v-if="canCancel"
                id="cancel"
                name="edit"
                type="danger"
                :waiting="waiting"
                @click.native="cancelOrder"
            >
                Cancel
            </Button>
        </div>
               
    </ViewContainer>
</template>

<script>

import ViewContainer from '../ViewContainer';
import OrderItem from '../../components/orders/OrderItemComponent'

import Button from '../../components/buttons/ButtonComponent';

import store from '../../store/index';
import { mapActions, mapGetters } from 'vuex';

    
export default {

    async beforeRouteEnter(to, from, next) {
        const id = to.params.id;
        let order = await store.dispatch('Orders/getOrder', id);
        next(vm => vm.setOrder(order));
    },

    computed: {
        ...mapGetters('Users', ['isAdmin', 'isLocationManager', 'isWaiter', 'getLoggedUser']),

        canDoAction() {
            return this.isAdmin || this.isLocationManager || this.isWaiter;
        },

        canCancel() {
            if(this.isWaiter && this.order.staff.id === this.loggedUser.id && this.order.deletedAt === null) {
                return true;
                    
            } else if ( this.order.deletedAt === null) {
                return true;
            }
        }
    },

    data() {
        return {
            waiting: false,
            order: null,
        }
    },

    methods: {
        ...mapActions('Orders', ['disableOrder']),
        ...mapActions('Notification', ['openNotification']),

        async cancelOrder() {
            try {
                this.waiting = true
                const payload = {
                    id: this.order.id,
                    vm: this
                }

                await this.disableOrder(payload)

                this.waiting = false;
            
                this.openNotification({
                    show: true,
                    type: 'ok',
                    message: `Order #${this.order.id} was canceled`
                })
                this.$router.push({name: "Orders"});
            } catch ( error ) {
                this.waiting = false;
                this.openNotification({
                    show: true,
                    type: 'err',
                    message: `Failed to cancel order`
                })
            }
          
        },

        setOrder(order) {
            this.order = order
        },

    },
    
    components: {
        ViewContainer,
        OrderItem,
        Button
    }
}
</script>