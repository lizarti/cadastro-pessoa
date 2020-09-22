<template>
  <div class="px-2 mb-2 w-full">
    <slot name="label" v-if="label">
      <label class="text-sm leading-5 font-medium text-gray-700">
        {{ label }}
      </label>
    </slot>
    <div class="flex flex-wrap">
      <slot></slot>
    </div>
    <div
      v-if="$scopedSlots.errors"
      class="text-xs text-red-600 font-semibold -mt-1">
      <slot name="errors"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 't-form-group',
  props: {
    label: String,
  },
};
</script>

<style>

</style>
