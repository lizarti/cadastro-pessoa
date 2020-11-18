<template>
  <div class="w-full">
    <div class="flex relative my-2 rounded border bg-gray-200 border-gray-200 focus:border-blue-200
       text-gray-800">
      <slot name="prepend"></slot>
      <input
        v-bind="$attrs"
        v-on="listeners"
        v-mask="maskOptions"
        @accept="onMaskAccept"
        :value="value"
        class="bg-transparent px-3 py-2 w-full appearance-none"
        :class="{
          'pl-10': $scopedSlots.prepend,
          'pr-10': $scopedSlots.append,
          '-mr-10': $scopedSlots.append,
        }"/>
      <slot name="append"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 't-input',
  props: {
    value: null,
  },
  data() {
    return {
      maskedValue: undefined,
    };
  },
  methods: {
    onMaskAccept(event) {
      this.$emit('input', event.detail.unmaskedValue);
      this.maskedValue = event.detail.value;
    },
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: (event) => {
          this.$emit('input', event.target.value);
        },
      };
    },
    maskOptions() {
      if (this.$attrs.mask) {
        if (typeof this.$attrs.mask === 'object') {
          return this.$attrs.mask;
        }
        return {
          mask: this.$attrs.mask,
        };
      }
      return false;
    },
  },
  watch: {
    '$attrs.mask': {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          this.$forceUpdate();
        });
      },
    },
  },
};
</script>

<style>
</style>
