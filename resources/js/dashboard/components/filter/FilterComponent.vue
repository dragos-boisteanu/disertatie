<template>
  <div>
    <Backdrop @click.native="close"></Backdrop>
    <div
      class="
        fixed
        top-0
        left-0
        z-20
        h-full
        w-3/4
        shadow-md
        bg-coolGray-100
        md:w-2/4
        lg:w-1/4
      "
    >
      <div class="absolute top-2 right-2 z-10 cursor-pointer">
        <slot name="close"></slot>
      </div>
      <div
        class="w-full py-5 px-5 text-center text-xl border-b border-gray-400"
      >
        <slot name="header"></slot>
      </div>

      <slot></slot>
    </div>
  </div>
</template>

<script>
import Backdrop from "../BackdropComponent";

export default {
  components: {
    Backdrop,
  },

  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>