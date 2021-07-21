<template>
  <router-link :to="{ name: 'Order', params: { id: order.id } }">
    <div
      class="
        w-full
        flex
        justify-start
        items-center
        pb-1
        border-b border-gray-100
      "
    >
      <div class="flex-1">
        <div class="text-xl font-semibold"># {{ order.id }}</div>
        <div class="py-1 font-semibold">
          <div v-if="order.client">
            {{ order.client.name }}
          </div>
          <div v-else>
            {{ order.firstName }}
          </div>
        </div>
        <div class="flex flex-col gap-y-1">
          <div class="flex items-center" v-if="order.phoneNumber">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="18px"
              viewBox="0 0 24 24"
              width="18px"
              fill="#000000"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M6.54 5c.06.89.21 1.76.45 2.59l-1.2 1.2c-.41-1.2-.67-2.47-.76-3.79h1.51m9.86 12.02c.85.24 1.72.39 2.6.45v1.49c-1.32-.09-2.59-.35-3.8-.75l1.2-1.19M7.5 3H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.49c0-.55-.45-1-1-1-1.24 0-2.45-.2-3.57-.57-.1-.04-.21-.05-.31-.05-.26 0-.51.1-.71.29l-2.2 2.2c-2.83-1.45-5.15-3.76-6.59-6.59l2.2-2.2c.28-.28.36-.67.25-1.02C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1z"
              />
            </svg>
            <div class="ml-2">
              {{ order.phoneNumber }}
            </div>
          </div>
          <div v-if="order.email" class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="18px"
              viewBox="0 0 24 24"
              width="18px"
              fill="#000000"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"
              />
            </svg>
            <span class="ml-2">{{ order.email }}</span>
          </div>
        </div>
      </div>
      <div>
        <OrderStatus :status="order.status"></OrderStatus>
      </div>
    </div>
    <div class="w-full flex justify-between items-center pt-1">
      <div v-if="order.staff">
        {{ order.staff.name }}
      </div>
      <div v-else class="italic">
        null
      </div>
      <div class="text-sm">
        {{ order.createdAt | formatDate }}
      </div>
    </div>
    <div class="w-full flex justify-between items-center pt-1 font-semibold">
      <div>{{ order.totalQuantity }} items</div>
      <div>{{ order.totalValue }} Ron</div>
    </div>
  </router-link>
</template>

<script>
import OrderStatus from "./OrderStatusComponent"
export default {
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  components: {
    OrderStatus
  }
};
</script>