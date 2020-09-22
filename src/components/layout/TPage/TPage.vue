<template>
  <div>
    <div class="page" id="page">
      <slot></slot>
    </div>
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
  .page {
    padding: 8px 12px;
    margin-bottom: 72px;
  }
</style>
