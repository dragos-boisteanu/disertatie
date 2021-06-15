<template>
  <ViewContainer>
    <template slot="header"> Discounts </template>

    <div class="w-full md:flex md:gap-x-4 xl:w-3/4 2xl:w-1/2">
      <DiscountsListComponent
        @selected="selectDiscount">
      </DiscountsListComponent>
      <DiscountFormComponent
        :discount-id="discountId"
        @reset="reset"
      ></DiscountFormComponent>
    </div>
  </ViewContainer>
</template>

<script>
import { mapGetters } from "vuex";

import ViewContainer from "../ViewContainer";
import _find from "lodash/find";

import DiscountsListComponent from "../../components/discounts/DiscountsListComponent.vue";
import DiscountFormComponent from "../../components/discounts/DiscountFormComponent.vue";

export default {
  computed: {
    ...mapGetters("Discounts", ["getDiscounts"]),

    canPermanentyDelete() {
      return (
        this.discount.productCounts === 0 || this.discount.categoriesCount === 0
      );
    },    
  },

  data() {
    return {
      discountId: ""
    };
  },

  methods: {
    selectDiscount(discountId) {
      this.discountId = discountId;
    },

    reset() {
      this.discountId = "";
    },

    async submit() {
      this.$v.discount.$touch();

      if (!this.$v.discount.$invalid) {
        try {
          if (this.discountSelected) {
            
          } else {
            await this.postDiscount(this.discount);
            this.resetForm();
          }
        } catch (error) {
          console.log(error);
        }
      }
    },

    
  },

  components: {
    ViewContainer,
    DiscountsListComponent,
    DiscountFormComponent
  },
};
</script>