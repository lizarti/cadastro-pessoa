<template>
  <div class="flex flex-wrap">
    <template
      v-for="(item, key) in form.fields">
      <t-form-item
        :key="key"
        :item="item"
        :model="model"
        :class="resolveClassesForItem(key)"
        v-if="shouldRenderItem(item)">
      </t-form-item>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    model: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
    form: {
      type: Object,
      required: true,
      default() {
        return {
          model: {
            type: Object,
            required: true,
            default() {
              return {
                name: '',
                fields: {},
              };
            },
          },
        };
      },
    },
    grid: {
      type: Object,
      required: false,
      default() {
        return {};
      },
    },
  },
  methods: {
    resolveClassesForItem(key) {
      /* if doesn't exists grid definition for this item, it should be 100% */
      if (!this.grid[key]) {
        return {
          'w-full': true,
        };
      }
      return this.grid[key];
    },
    shouldRenderItem(item) {
      if (typeof item.show === 'function') {
        return item.show(this.model);
      }
      return true;
    },
  },
};
</script>

<style scoped>

</style>
