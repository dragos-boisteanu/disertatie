<template>
  <div>
    <div class="w-full md:w-1/2" v-if="discount">
      <div class="text-sm font-semibold">Selected discount</div>
      <div
        @click="removeDiscount"
        class="
          flex
          items-center
          justify-between
          text-xs
          p-1
          px-2
          bg-white
          rounded
          border
          gap-x-1
          cursor-pointer
          hover:border-gray-600
        "
      >
        <div>
          <div>
            {{ discount.code }} - {{ discount.value }} %
          </div>
          <div>
            {{ discount.startsAt }} >
            {{ discount.endsAt }}
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="18px"
          viewBox="0 0 24 24"
          width="18px"
          fill="#000000"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
          />
        </svg>
      </div>
    </div>

    <InputGroup id="discount" label="Discount">
      <Select v-model="selectDiscountId" id="discount" name="discount" @change.native="selectDiscount">
        <option value="" disabled selected>Select discount</option>
        <option
          v-for="discount in getDiscounts"
          :key="discount.id"
          :value="discount.id"
          :disabled="discount.deletedAt"
          :selected="discount.id === discountId"
          class="flex items-center gap-x-3 disabled:bg-gray-100"
        >
          <span>
            {{ discount.code }}
          </span>
          <span> {{ discount.value }}% </span>
        </option>
      </Select>
    </InputGroup>
  </div>
</template>


<script>
import { mapGetters } from 'vuex'
import  _find  from 'lodash/find'

import InputGroup from '../inputs/InputGroupComponent.vue';
import Select from '../inputs/SelectInputComponent.vue';

export default {
  props: {
    discountId: {
      type: [Number, String],
      required: false,
      default: null
    }
  },

  mounted () {
    if(this.discountId) {
      this.discount = _find(this.getDiscounts, ['id', parseInt(this.discountId)]);
      this.selectDiscountId = this.discountId;
    }
  },

  computed: {
    ...mapGetters('Discounts', ['getDiscounts']),
  },

  data() {
    return {
      selectDiscountId: "",
      discount: null,
    }
  },

  watch: {
    discountId(newValue, oldValue) {
      if(newValue !== oldValue) {
        this.discount = _find(this.getDiscounts, ['id', parseInt(newValue)]);
        this.selectDiscountId = newValue;
      }
    },
  },

  methods: {
    selectDiscount() {
      this.discount = _find(this.getDiscounts, ['id', parseInt(this.selectDiscountId)]);
      this.addDiscount();
    },

    removeDiscount() {
      this.discount = null;
      this.selectDiscountId = "";
      this.$emit('remove');
    },

    addDiscount() {
      this.$emit('add', this.selectDiscountId);
    }
  },

  components: {
    InputGroup,
    Select
  }
}
</script>