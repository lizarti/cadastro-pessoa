<template>
  <t-input
    v-bind="$attrs"
    v-on="$listeners"
    :value="value">
    <template v-slot:prepend v-if="prependIcon">
      <div class="absolute flex items-center">
        <t-button icon text>
          <t-icon
            :type="prependIcon"
            @click="(e) => prependHandler ? prependHandler(e) : null">
          </t-icon>
        </t-button>
      </div>
    </template>
    <template v-slot:append v-if="appendIcon">
      <div class="flex items-center">
        <t-button icon text>
          <t-icon
            :type="appendIcon"
            @click="(e) => appendHandler ? appendHandler(e) : null">
          </t-icon>
        </t-button>
      </div>
    </template>
  </t-input>
</template>

<script>
export default {
  name: 't-text-field',
  props: {
    value: null,
    prependIcon: String,
    prependHandler: Function,
    appendIcon: String,
    appendHandler: Function,
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
