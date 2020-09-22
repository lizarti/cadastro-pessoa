<template>
  <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-right font-medium w-16">
    <template v-for="action in actions">
      <!-- <a href="#"
        class="text-indigo-600 hover:text-indigo-900 ml-2"
        :key="action.name">{{ action.label }}
      </a> -->
      <t-button
        text
        color="blue"
        :key="action.name"
        @click="emitAction(action)">{{ action.label }}</t-button>
    </template>
  </td>
</template>

<script>
export default {
  name: 't-action-column',
  props: {
    row: {
      type: Object,
      required: true,
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
  methods: {
    emitAction(action) {
      this.$emit('action', {
        action,
        row: this.row,
      });
    },
  },
  computed: {
  },
};
</script>

<style>

</style>
