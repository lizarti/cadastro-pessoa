<template>
  <div class="px-4 py-5 border-b border-gray-200">
    <h3 class="text-lg leading-6 font-medium text-gray-900">
      {{ title }}
    </h3>
    <p class="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
      {{ subtitle }}
    </p>
  </div>
</template>

<script>
export default {
  name: 't-form-header',
  props: {
    title: String,
    subtitle: String,
  },
};
</script>

<style>

</style>
