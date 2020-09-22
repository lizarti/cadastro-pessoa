<template>
  <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left
    text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider"
    :style="customStyles">
    <slot></slot>
  </th>
</template>

<script>
export default {
  name: 't-header-column',
  props: {
    column: {
      type: Object,
      required: false,
      default() {
        return {};
      },
    },
  },
  computed: {
    customStyles() {
      return {
        width: this.column.width,
      };
    },
  },
};
</script>

<style>

</style>
