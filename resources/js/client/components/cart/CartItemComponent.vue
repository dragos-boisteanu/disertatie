<template>
  <li class="grid grid-cols-3 border-b my-1 py-1 px-2 last:border-0">
    <div class="col-span-2">
      <div class="text-sm font-semibold">
        {{ item.name }}
      </div>
      <div class="text-xs">x{{ item.quantity }}</div>
    </div>
    <div class="text-sm self-center justify-self-end">
      {{ item.price }} Ron
    </div>
  </li>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>