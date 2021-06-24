<template>
  <div
    v-show="getBackdropState"
    id="backdrop"
    class="fixed z-20 top-0 left-0 h-full w-full bg-black bg-opacity-75 hidden"
  ></div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('Backdrop', ['getBackdropState'])
  }
}
</script>