<template>
  <tr class="hover:bg-gray-100 transition duration-200">
    <TBodyColumn v-for="(column, index) in columns" :key="index" :column="column" :row="row">
      <template v-slot:item="slotProps" v-if="$scopedSlots[`item.${column.field}`]">
        <slot :name="`item.${column.field}`" v-bind="slotProps"></slot>
      </template>
    </TBodyColumn>
    <TActionColumn
      v-if="actions.length"
      :row="row"
      :actions="actions"
      v-on="$listeners"></TActionColumn>
  </tr>
</template>

<script>
import TBodyColumn from './TBodyColumn.vue';
import TActionColumn from './TActionColumn.vue';

export default {
  name: 't-body-row',
  components: {
    TBodyColumn,
    TActionColumn,
  },
  props: {
    row: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
    columns: {
      type: Array,
      required: Boolean,
      default() {
        return {};
      },
    },
    actions: {
      type: Array,
      required: false,
      default() {
        return {};
      },
    },
  },
};
</script>

<style>

</style>
