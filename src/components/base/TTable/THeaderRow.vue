<template>
  <tr>
    <THeaderColumn v-for="(column, index) in columns" :key="index" :column="column">
      {{ column.label }}
    </THeaderColumn>
    <THeaderColumn v-if="actions.length" class="w-16" :column="{}"></THeaderColumn>
  </tr>
</template>

<script>
import THeaderColumn from './THeaderColumn.vue';

export default {
  name: 't-header-row',
  components: {
    THeaderColumn,
  },
  props: {
    columns: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
    actions: {
      type: Array,
      required: false,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>

</style>
