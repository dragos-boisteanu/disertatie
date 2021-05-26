<template>
    <ViewContainer v-if="order">
        <template slot="header">
            View order #{{ order.id }}
            <OrderStatus :status="order.status"></OrderStatus>
             <button
                    @click="refresh" 
                    class="p-1 bg-lightBlue-600 rounded-sm active:shadow-inner active:bg-lightBlue-500"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ffffff"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>
                </button>
        </template>

        <OrderItemModal
            v-if="showAddProductModalState"
            :id="selectedItemId"
            :quantity="selectedItemQuantity"
            @closed="closeAddProductModal"
            @add="addItem"
            @edit="saveEdit"
        ></OrderItemModal>

        <ConfirmCancelOrderModalComponent
            v-if="showRemoveConfirmModalState"
            :order-id="order.id"
            @closed="toggleRemoveConfirmModalState"
            @cancel="cancelOrder"
        ></ConfirmCancelOrderModalComponent>

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
                            <span class="font-semibold">Delivery method: </span> <span>{{ order.deliveryMethod.name}} ({{ order.deliveryMethod.price}} Ron)</span>
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

        <div class="w-full overflow-y-auto lg:w-1/2">   
            <table class="my-4 px-2 w-full rounded-sm  text-center">
                <thead class="w-full bg-gray-700 text-orange-500">
                    <tr class="text-left text-sm">
                        <th class="p-2 text-center rounded-tl">#</th>
                        <th class="p-2 text-center">Name</th>
                        <th class="p-2 text-center">Quantity</th>
                        <th class="p-2 text-center">
                            <div>
                                Unit Price 
                            </div>
                            <div>
                                (includes VAT + Discount)
                            </div>
                        </th>
                        <th class="p-2 text-center">Total Price</th>
                        <th class="p-2 text-center"></th>
                    </tr>
                </thead>
                <tbody class="overflow-y-auto">
                    <OrderItem  
                        v-for="(item, index) in order.items" 
                        :key="index" 
                        :item="item" 
                        :index="index"
                        :showActions="canEdit"
                        @edit="editOrderProduct(item)"
                        @remove="removeItem"
                    ></OrderItem>
                    <tr class="text-sm">
                        <td class="p-2">{{ order.items.length + 1 }}</td>
                        <td class="p-2">{{order.deliveryMethod.name}}</td>
                        <td class="p-2">1</td>
                        <td class="p-2">{{ order.deliveryMethod.price }} Ron</td>
                        <td class="p-2">{{ order.deliveryMethod.price }} Ron</td>
                    </tr>
                    <tr v-if="order.items.length > 0" class="mt-1 font-bold border-t">                                    
                        <td colspan="2" class="p-2 text-center">
                            TOTAL
                        </td>
                        <td class="p-2">{{ order.totalQuantity }}</td>
                        <td class="p-2"></td>
                        <td class="p-2 text-center">{{ order.totalValue }} Ron</td>
                    </tr>
                </tbody>
            </table>
            <button 
                v-if="canEdit"
                id="addItemBtn"
                class="w-full py-1 mt-2 text-white text-sm ripple-bg-orange-400 rounded-sm"
                @click.prevent="openAddProductModal"
            >
                Add product
            </button>
        </div>
         
        <div class="mt-5 flex gap-4 md:justify-start" >
            <Button 
                v-if="canCancel"
                id="cancel"
                name="cancel"
                type="danger"
                :waiting="waiting"
                @click.native="toggleRemoveConfirmModalState"
            >
                Cancel Order
            </Button>

            
            <Button 
                v-if="canMarkAsIsPreparing"
                id="isPreparing"
                name="isPreparing"
                type="secondary"
                :waiting="waiting"
                @click.native="markAsIsPreparing"
            >
                Is preparing
            </Button>

            <Button 
                v-if="canMarkAsAwaitingDelivery"
                id="awaitingDelivery"
                name="awaitingDelivery"
                type="secondary"
                :waiting="waiting"
                @click.native="markAsAwaitingDelivery"
            >
                Awaiting delivery
            </Button>
            
            <Button 
                v-if="canMarkAsInDelivery"
                id="inDelivery"
                name="inDelivery"
                type="secondary"
                :waiting="waiting"
                @click.native="markAsInDelivery"
            >
                In delivery
            </Button>

            <Button 
                v-if="canMarkAsDelivered"
                id="delivered"
                name="delivered"
                type="secondary"
                :waiting="waiting"
                @click.native="markAsDelivered"
            >
                Delivered
            </Button>

            <Button 
                v-if="canMarkAsCompleted"
                id="completed"
                name="completed"
                type="secondary"
                :waiting="waiting"
                @click.native="markAsCompleted"
            >
                Completed
            </Button>

            <Button 
                v-if="canMarkAsCompleted"
                id="completed"
                name="completed"
                type="secondary"
                :waiting="waiting"
                @click.native="markAsCompleted"
            >
                Completed
            </Button>
        </div>
    </ViewContainer>
</template>

<script>

import ViewContainer from '../ViewContainer';
import OrderItem from '../../components/orders/OrderItemComponent'
import OrderStatus from '../../components/orders/OrderStatusComponent';
import EditOrderDetailsModal from '../../components/modals/EditOrderDetailsModalComponent';
import OrderItemModal from '../../components/modals/OrderItemModalComponent';

import ConfirmCancelOrderModalComponent from '../../components/modals/ConfirmCancelOrderModalComponent';

import Button from '../../components/buttons/ButtonComponent';

import store from '../../store/index';
import { mapActions, mapGetters } from 'vuex';
import _findIndex from 'lodash/findIndex';
    
export default {

    async beforeRouteEnter(to, from, next) {
        const id = to.params.id;
        let order = await store.dispatch('Orders/getOrder', id);
        next(vm => vm.setOrder(order));
    },

    computed: {
        ...mapGetters('Users', ['isAdmin', 'isLocationManager', 'isWaiter', 'getLoggedUser', 'isKitchenManager', 'isDelivery']),

        canCancel() {
            if((this.isWaiter && this.order.staff.id === this.loggedUser.id) && this.order.deletedAt === null) {
                return true;
            } else {
                return false;
            }
        },

        canEdit() {
            if( (this.isWaiter && this.order.staff.id === this.loggedUser.id) || this.isAdmin || this.isLocationManager ) {
                return true
            }

            return false
        },

        clientId() {
            return this.order.client ? this.order.client.id : null;
        },

        showAddressForDelivery() {
            return this.order.deliveryMethod.name === 'Delivery' ? true : false;
        },

        showOrderDetailsEditButton() {
            return this.order.deliveryMethod.name === 'Delivery' && this.canEdit ? true : false;
        },

        canMarkAsIsPreparing() {
            return (this.isKitchenManager || this.isAdmin || this.isLocationManager) && this.order.status.name === 'Received' && this.order.deletedAt === null;
        },

        canMarkAsAwaitingDelivery() {
            return (this.isKitchenManager || this.isAdmin || this.isLocationManager )&& this.order.status.name === 'Is preparing' && this.order.deletedAt === null;
        },

        canMarkAsInDelivery() {
            return (this.isDelivery || this.isWaiter || this.isAdmin || this.isLocationManager) && this.order.status.name === "Awaiting delivery" && this.order.deletedAt === null;
        },

        canMarkAsDelivered() {
            return (this.isDelivery || this.isWaiter || this.isAdmin || this.isLocationManager) && this.order.status.name === 'In delivery' && this.order.deletedAt === null;
        },

        // canMarkAsAwaitingPayment() {
        //     return (this.isDelivery || this.isWaiter || this.isAdmin || this.isLocationManager) && this.order.status.name === "Delivered" && this.order.deletedAt === null;
        // },

        canMarkAsCompleted() {
            return (this.isDelivery || this.isWaiter || this.isAdmin || this.isLocationManager) && (this.order.status.name === 'Delivered' || this.order.staus.name === "Awaiting payment") && this.order.deletedAt === null;
        }
    },

    data() {
        return {
            showAddProductModalState: false,
            showRemoveConfirmModalState: false,
            showOrderDetailsEditModalState: false,

            waiting: false,
            order: null,

            selectedItemId: '',
            selectedItemQuantity: '',
        }
    },

    methods: {
        ...mapActions('Orders', ['disableOrder', 'downloadOrder', 'removeItemFromOrder', 'addItemToOrder', 'patchItem', 'updateOrderStatus']),
        ...mapActions('Notification', ['openNotification']),

        async refresh() {
            this.order = await this.downloadOrder(this.order.id)
        },

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

                this.toggleRemoveConfirmModalState();
                // this.$router.push({name: "Orders"});
            } catch ( error ) {
                this.waiting = false;
                this.openNotification({
                    show: true,
                    type: 'err',
                    message: `Failed to cancel order`
                })
            }
        },

        async removeItem(id){
            const payload ={
                vm: this,
                localData: {
                    id: this.order.id,
                    itemId: id
                }
            }
            const response = await this.removeItemFromOrder(payload);
            // this.order.updatedAt = response.localData.updatedAt;

            const itemIndex = _findIndex(this.order.items, ['id', id]);
 
            if(itemIndex >= 0) {
                this.order.items.splice(itemIndex, 1);
            }   
        },

        async addItem(item) {
            const payload = {
                id: this.order.id,
                item,
            }

            const response = await this.addItemToOrder(payload);

            const itemIndex = _findIndex(this.order.items, ['id', response.item.id]);

            if(itemIndex >= 0) {           
                this.$set(this.order.items[itemIndex], 'quantity', response.item.quantity);
                this.$set(this.order.items[itemIndex], 'totalPrice', response.item.totalPrice);
                
            } else {
                this.order.items.push(response.item)
            }

            this.order.totalQuantity = response.totalQuantity;
            this.order.totalValue = response.totalValue;
            this.order.updatedAt = response.updatedAt;
        },
       
        async saveEdit(item) {          
            const itemIndex = _findIndex(this.order.items, ['id', item.id]);

            if(item.quantity !== this.order.items[itemIndex].quantity) {
                const payload = {
                    vm: this,
                    data: {
                        id: this.order.id,
                        itemId: item.id,
                        quantity: item.quantity
                    }
                }

                const response = await this.patchItem(payload)

                const itemIndex = _findIndex(this.order.items, ['id', response.data.itemId]);
                
                this.$set(this.order.items[itemIndex], 'quantity', response.data.quantity);
                this.$set(this.order.items[itemIndex], 'totalPrice', response.totalPrice);

                this.order.totalQuantity = response.totalQuantity;
                this.order.totalValue = response.totalValue;
                this.order.updatedAt = response.updatedAt;
                
            } else {
                console.log('nothing to update');
            }
        },

        async updateStatus(statusId) {
            const data = {
                vm:this,
                data: {
                    id: this.order.id,
                    status: {
                        id: statusId
                    }
                }
            }
            const response = await this.updateOrderStatus(data)

            this.order.status = response.status;
        },

        async markAsIsPreparing() {
            await this.updateStatus(3);  
        },

        async markAsAwaitingDelivery() {
            await this.updateStatus(4);
        },

        async markAsInDelivery() {
            await this.updateStatus(5);  
        },

        async markAsDelivered() {
            await this.updateStatus(6)
        },

        async markAsCompleted() {
            await this.updateStatus(7)
        },  

        editOrderProduct(product) {
            this.selectedItemId = product.id;
            this.selectedItemQuantity = product.quantity;
            this.showAddProductModalState = true;
        },

        openAddProductModal() {
            this.showAddProductModalState = true;
        },

        closeAddProductModal() {
            this.showAddProductModalState = false;
            if(this.selectedItemId && this.selectedItemQuantity) {
                this.selectedItemId = '';
                this.selectedItemQuantity = '';
            }
        },

        showOrderDetailsEditModalToggle() {
            this.showOrderDetailsEditModalState = !this.showOrderDetailsEditModalState;
        },

        toggleRemoveConfirmModalState() {
            this.showRemoveConfirmModalState = !this.showRemoveConfirmModalState;
        },

        updateOrder(order) {
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
        EditOrderDetailsModal,
        ConfirmCancelOrderModalComponent,
        OrderItemModal
    }
}
</script>