<template>
  <label class="inline-flex items-center mt-3 mr-4">
    <input
      v-bind="$attrs"
      @change="emitChangeEvent"
      :checked="isChecked"
      type="radio"
      class="form-radio h-5 w-5 text-gray-800">
    <span class="ml-2 text-gray-800">{{ label }}</span>
  </label>

</template>

<script>
export default {
  name: 't-radio',
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: {
    label: String,
    checked: [Boolean, String],
  },
  methods: {
    emitChangeEvent() {
      this.$emit('change', this.$attrs.value);
    },
  },
  computed: {
    isChecked() {
      return this.$attrs.value === this.$props.checked;
    },
  },
};
</script>

<style>

</style>
