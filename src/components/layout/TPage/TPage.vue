<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 't-page',
  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },
  },
  watch: {
    '$props.title': {
      immediate: true,
      handler(title) {
        this.$store.dispatch('base/setPageTitle', title);
      },
    },
  },
};
</script>

<style scoped>
</style>
