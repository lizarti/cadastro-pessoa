<template>
  <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200" :style="customStyles">
    <span v-if="$scopedSlots.item">
      <slot name="item" v-bind="{ row }"></slot>
    </span>
    <span v-if="$scopedSlots.action">
      <slot name="action" v-bind="{ row }"></slot>
    </span>
    <!-- default -->
    <span v-if="!$scopedSlots.item && !$scopedSlots.action">
      <span>{{ resolvedFormattedValue }}</span>
    </span>
  </td>
</template>

<script>
import get from '../../../utils/get';

export default {
  name: 't-body-column',
  props: {
    row: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
    column: {
      type: Object,
      required: false,
      default() {
        return {};
      },
    },
  },
  methods: {
  },
  computed: {
    rawValue() {
      return get(this.row, this.column.field);
    },
    resolvedFormattedValue() {
      if (typeof this.column.format === 'function') {
        return this.column.format(this.rawValue, this.row, this.column);
      }
      return this.rawValue;
    },
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
