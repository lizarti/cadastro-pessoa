<template>
  <div
    class="text-xs inline-flex items-center font-bold leading-sm uppercase px-2 py-1"
    :class="{...computedColors, ...computedStyles}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 't-tag',
  props: {
    color: {
      type: String,
      required: false,
      default: 'gray',
    },
    outlined: {
      type: Boolean,
      required: false,
      default: false,
    },
    label: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    computedColors() {
      return {
        [`bg-${this.color}-200`]: !this.outlined,
        [`text-${this.color}-700`]: true,
      };
    },
    computedStyles() {
      return {
        rounded: this.label,
        'rounded-full': !this.label,
        border: this.outlined,
        [`border-${this.color}-700`]: this.outlined,
      };
    },
  },
};
</script>

<style>

</style>
