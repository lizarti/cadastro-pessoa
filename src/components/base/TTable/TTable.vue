<template>
  <div class="flex flex-col">
    <div class="p-2 overflow-x-auto">
      <div class="align-middle inline-block min-w-full shadow overflow-hidden rounded-md">
        <table class="min-w-full">
          <thead>
            <THeaderRow :columns="columns" :actions="actions"></THeaderRow>
          </thead>
          <tbody class="bg-white">
            <TBodyRow
              v-for="(row, index) in rows"
              :key="index"
              :columns="columns"
              :actions="actions"
              :row="row"
              v-on="$listeners">
              <template
                v-for="column in columnsToCreateSlot"
                v-slot:[`item.${column.field}`]="slotProps">
                <slot :name="`item.${column.field}`" v-bind="slotProps.row"></slot>
              </template>
            </TBodyRow>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import THeaderRow from './THeaderRow.vue';
import TBodyRow from './TBodyRow.vue';

export default {
  name: 't-table',
  components: {
    THeaderRow,
    TBodyRow,
  },
  props: {
    columns: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
    rows: {
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
  computed: {
    columnsToCreateSlot() {
      return this.columns.filter((c) => !!this.$scopedSlots[`item.${c.field}`]);
    },
  },
};
</script>

<style>

</style>
