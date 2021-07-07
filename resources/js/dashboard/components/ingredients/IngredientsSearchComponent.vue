<template>
  <div class="w-full mb-2 flex items-center gap-x-2">
    <div class="w-full p-2 flex items-center bg-gray-50">
      <svg
        class="text-coolGray-300 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 0 24 24"
        width="24px"
        fill="#000000"
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path
          d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
        />
      </svg>
      <input
        name="search"
        id="search"
        placeholder="Search category by name"
        class="w-full outline-none px-2 rounded bg-gray-50"
        v-model="value"
        @input="callSearch"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import  _debounce  from 'lodash/debounce';
export default {
  data() {
    return {
      value: "",
    };
  },

  computed: {
    ...mapGetters('Ingredients', ['getIngredients']),
  },

  methods: {    
    ...mapActions('Ingredients', ['searchIngredients', 'downloadIngredients']),

    callSearch: _debounce(function() {
      if (this.value) {
       this.searchIngredients(this.value);
      } else {
        this.downloadIngredients()
      }
    }, 250),
  },
};
</script>