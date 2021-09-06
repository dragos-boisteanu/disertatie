<template>
  <div>
    <BackdropComponent @click.native="close"> </BackdropComponent>
    <NavigationComponent @close="close" />
  </div>
</template>

<script>
import NavigationComponent from "../navigation/NavigationComponent";
import BackdropComponent from "../BackdropComponent";

export default {
  data() {
    return {};
  },

  methods: {
    close() {
      this.$emit("close");
    },
  },

  components: {
    BackdropComponent,
    NavigationComponent,
  },
};
</script>