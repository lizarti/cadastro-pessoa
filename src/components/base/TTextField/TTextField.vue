<template>
  <div class="w-full">
    <div>

      <input
        v-bind="$attrs"
        v-on="listeners"
        class="my-2 px-4 py-2 rounded border bg-gray-200 border-gray-200 focus:border-blue-200
        appearance-none outline-none w-full text-gray-800"
        v-mask="maskOptions"
        @accept="onMaskAccept"
        :maxlength="maxLengthMask"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 't-text-field',
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
    maxLengthMask() {
      if (!!this.$attrs.mask && typeof this.$attrs.mask === 'string') {
        return this.$attrs.mask.length;
      }
      return undefined;
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
