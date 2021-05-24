<template>
    <ViewContainer v-if="order">
        <template slot="header">
            View order #{{ order.id }}
            <OrderStatus :status="order.status"></OrderStatus>
        </template>

        <EditOrderDetailsModal 
            v-if="showOrderDetailsEditModalState" 
            :order-id="order.id"
            :client-id="clientId"
            :address="order.address" 
            :observations="order.observations"
            @closed="showOrderDetailsEditModalToggle"
            @updated="updateOrder"
        >
        </EditOrderDetailsModal>

        <div class="flex flex-col gap-4 md:flex-row md:flex-wrap">
            <div class="relative w-full bg-white shadow rounded p-4 md:flex-grow md:flex-shrink-0">
                <button class="absolute top-2 right-2" @click="showOrderDetailsEditModalToggle" v-if="showOrderDetailsEditButton">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"/></svg>
                </button>
                <div class="text-xl font-semibold my-3">Order details</div>
                <div class="text-sm">
                    <div class="my-1">
                        <div>
                            <span class="font-semibold">Created At: </span> <span>{{ order.createdAt | formatDate}}</span>
                        </div>
                        <div class="my-1">
                            <span class="font-semibold">Updated At: </span> <span>{{ order.updatedAt | formatDate}}</span>
                        </div>
                        <div class="my-1">
                            <span class="font-semibold">Delivery method: </span> <span>{{ order.deliveryMethod.name}}</span>
                        </div>
                        <div class="my-1" v-if="showAddressForDelivery">
                            <span class="font-semibold">Address: </span> <span>{{ order.address}}</span>
                        </div>
                        <div class="my-1">
                            <span class="font-semibold">Observations: </span> <pre>{{ order.observations}}</pre>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex-1 bg-white shadow rounded p-4">
                <div class="text-xl font-semibold my-3">Client</div>
                <div class="text-sm">
                    <div class="my-1">
                        <div v-if="order.client">
                            <div>
                                <span class="font-semibold">ID: </span> <span>{{ order.client.id}}</span>
                            </div>
                            <div>
                                <span class="font-semibold">Name: </span> <span>{{ order.client.name}}</span>
                            </div>
                        </div>
                        <div v-else>
                            <span class="font-semibold">Name: </span> <span>{{ order.name }}</span>
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
import OrderStatus from '../../components/orders/OrderStatusComponent';
import EditOrderDetailsModal from '../../components/modals/EditOrderDetailsModalComponent';

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
        },

        clientId() {
            return this.order.client.id ? this.order.client.id : null;
        },

        showAddressForDelivery() {
            return this.order.deliveryMethod.name === 'Delivery' ? true : false;
        },

        showOrderDetailsEditButton() {
            return this.order.deliveryMethod.name === 'Delivery' ? true : false;
        }
    },

    data() {
        return {
            waiting: false,
            order: null,
            showOrderDetailsEditModalState: false,
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

        showOrderDetailsEditModalToggle() {
            this.showOrderDetailsEditModalState = !this.showOrderDetailsEditModalState;
        },

        updateOrder(order) {
            console.log(order);
            Object.keys(order).forEach(key => {
                this.order[key] = order[key]
            })
        },

        setOrder(order) {
            this.order = order
        },

    },
    
    components: {
        ViewContainer,
        OrderItem,
        Button,
        OrderStatus,
        EditOrderDetailsModal
    }
}
</script>