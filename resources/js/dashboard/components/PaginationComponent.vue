<template>
  <div
    class="
      flex-initial
      px-2
      py-4
      flex
      items-center
      justify-between
      gap-x-2
      text-xs
      md:justify-end
    "
  >
    <router-link
      v-if="showNextAndPrevious"
      class="px-2 py-1 border hover:border-sky-500"
      :to="{ name: route, query: { page: previousPage, ...query } }"
      :class="{
        'pointer-events-none': !canPrevious,
        'border-gray-200': !canPrevious,
        'border-gray-300': canPrevious,
      }"
      @click.prevent.native="goTo(previousPage)"
    >
      Previous
    </router-link>
    <div v-else></div>

    <ul class="flex items-center gap-x-2 md:mx-3">
      <li v-if="currentPage > 2">
        <router-link
          @click.prevent.native="goTo(1)"
          :to="{ name: route, query: { page: 1, ...query } }"
          class="px-2 py-1 border hover:border-sky-500 rounded-sm"
          :class="{
            'border-sky-500': 1 === currentPage,
            'border-gray-300': 1 !== currentPage,
          }"
        >
          1
        </router-link>
      </li>

      <li v-if="currentPage >= 4">
        <span>...</span>
      </li>

      <li v-for="(page, index) in pagesForDisplay" :key="index">
        <router-link
          @click.prevent.native="goTo(page)"
          :to="{ name: route, query: { page, ...query } }"
          class="px-2 py-1 border hover:border-sky-500 rounded-sm"
          :class="{
            'border-sky-500': page === currentPage,
            'border-gray-300': page !== currentPage,
          }"
        >
          {{ page }}
        </router-link>
      </li>

      <li v-if="currentPage < lastPage - 2">
        <span>...</span>
      </li>

      <li v-if="currentPage <= lastPage">
        <router-link
          @click.prevent.native="goTo(lastPage)"
          :to="{ name: route, query: { page: lastPage, ...query } }"
          class="px-2 py-1 border hover:border-sky-500 rounded-sm"
          :class="{
            'border-sky-500': lastPage === currentPage,
            'border-gray-300': lastPage !== currentPage,
          }"
        >
          {{ lastPage }}
        </router-link>
      </li>
    </ul>

    <router-link
      v-if="showNextAndPrevious"
      class="px-2 py-1 border hover:border-sky-500"
      :to="{ name: route, query: { page: nextPage, ...query } }"
      :class="{
        'pointer-events-none': !canNext,
        'border-gray-200': !canNext,
        'border-gray-300': canNext,
      }"
      @click.prevent.native="goTo(nextPage)"
    >
      Next
    </router-link>
    <div v-else></div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },

    route: {
      type: String,
      required: true,
    },

    query: {
      type: Object,
      required: true,
    },
  },

  computed: {
    currentPage() {
      return this.data.currentPage;
    },

    lastPage() {
      return this.data.lastPage;
    },

    showNextAndPrevious() {
      return this.lastPage > 1;
    },

    canNext() {
      return this.currentPage < this.lastPage;
    },

    canPrevious() {
      return this.currentPage > this.firstPage;
    },

    nextPage() {
      return this.currentPage + 1;
    },

    previousPage() {
      return this.currentPage - 1;
    },

    pagesForDisplay() {
      const pagesForDisplay = [];

      for (let page = 1; page < this.lastPage; page++) {
        if (page >= this.currentPage - 1 && page <= this.currentPage + 1) {
          pagesForDisplay.push(page);
        }
      }
      return pagesForDisplay;
    },
  },

  data() {
    return {
      firstPage: 1,
    };
  },

  methods: {
    goTo(page) {
      const query = {
        page,
        ...this.query,
      };
      this.$emit("navigate", query);
    },
  },
};
</script>
