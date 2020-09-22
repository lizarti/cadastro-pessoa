<template>
  <ul class="inline-flex list-none rounded my-2 relative z-0 shadow-sm"
    v-if="shouldRenderPagination">
    <li
      class="cursor-pointer -ml-px relative inline-flex items-center px-4 py-2
      border border-gray-300 bg-white text-sm leading-5 font-medium
      text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none
      focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100
      active:text-gray-700 transition ease-in-out duration-150"
     :class="{
       'bg-blue-500': isPageSelected(pageNumber),
       'hover:bg-blue-600': isPageSelected(pageNumber),
     }"
     v-for="pageNumber of pagesLength" :key="pageNumber"
     @click="paginate(pageNumber)">
     <span :class="{
      'text-white': isPageSelected(pageNumber),
     }">{{ pageNumber }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 't-pagination',
  props: {
    page: Number,
    perPage: Number,
    total: Number,
  },
  methods: {
    isPageSelected(page) {
      return page === this.page;
    },
    paginate(page) {
      this.$emit('paginate', {
        page,
        perPage: this.perPage,
        total: this.total,
      });
    },
  },
  computed: {
    pagesLength() {
      return Math.ceil(this.total / this.perPage);
    },
    shouldRenderPagination() {
      return this.pagesLength > 1;
    },
  },
};
</script>

<style>

</style>
