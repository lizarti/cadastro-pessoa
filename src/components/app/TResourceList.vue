<template>
  <div>
    <div class="flex justify-between px-2 py-2 my-2">
      <div>
        <h2 class="ml-4 text-2xl leading-8 text-gray-800" v-if="showTitle">
          {{ pluralName }}
        </h2>
      </div>

      <template v-if="$scopedSlots.newItemButton">
        <div>
          <slot name="newItemButton" v-bind="{name}"></slot>
        </div>
      </template>
      <template v-if="!$scopedSlots.newItemButton">
        <div v-if="newItem">
          <t-button color="blue">
            Novo {{ name }}
          </t-button>
        </div>
      </template>
    </div>

    <template v-if="!$scopedSlots.table">
      <t-table
        :rows="data"
        :columns="columns"
        :actions="actions"
        v-on="$listeners">
        <template v-for="column in columnsToCreateSlot" v-slot:[`item.${column.field}`]="slotProps">
          <slot :name="`table.item.${column.field}`" v-bind="slotProps"></slot>
        </template>
      </t-table>
    </template>

    <template v-if="shouldPaginate && !$scopedSlots.pagination">
      <div class="flex justify-end px-2">
        <t-pagination v-bind="pagination" v-on="$listeners"></t-pagination>
      </div>
    </template>

  </div>
</template>
<script>
export default {
  name: 't-resource-list',
  props: {
    name: {
      type: String,
      required: true,
    },
    pluralName: {
      type: String,
      required: false,
      default() {
        return `${this.name}s`;
      },
    },
    showTitle: {
      type: Boolean,
      required: false,
      default: true,
    },
    columns: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
    data: {
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
    filters: {
      type: Array,
      required: false,
      default() {
        return [];
      },
    },
    serverSide: {
      type: Boolean,
      required: false,
      default: false,
    },
    pagination: {
      type: Object,
      required: false,
      default() {
        return {};
      },
    },
    newItem: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  computed: {
    columnsToCreateSlot() {
      return this.columns.filter((c) => !!this.$scopedSlots[`table.item.${c.field}`]);
    },
    shouldPaginate() {
      return Object.keys(this.pagination).length > 0;
    },
  },
};
</script>
