<template>
  <view-container>
    <template slot="header">Notifications settings</template>

    <div>
      <div>
        <label>New order</label>
        <input type="checkbox" v-model="newOrderNotificationState" />
      </div>

      <div>
        <label>New reservation</label>
        <input type="checkbox" />
      </div>

      <div>
        <label>New user</label>
        <input type="checkbox" />
      </div>

      <div>
        <label>New message</label>
        <input type="checkbox" />
      </div>
    </div>
  </view-container>
</template>


<script>
import { mapActions, mapGetters } from "vuex";
import ViewContainer from "./ViewContainer.vue";

export default {
  computed: {
    ...mapGetters("Subscribes", ["getNewOrderNotificationState"]),
  },

  data() {
    return {
      newOrderNotificationState: this.getNewOrderNotificationState,
    };
  },

  watch: {
    newOrderNotificationState: {
      imediate: true,
      handler(newValue) {
        this.setNewOrderNotificationState(newValue);
      },
    },
  },

  methods: {
    ...mapActions("Subscribes", ["setNewOrderNotificationState"]),
  },

  components: {
    ViewContainer,
  },
};
</script>