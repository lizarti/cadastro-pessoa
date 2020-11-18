<template>
  <div class="flex flex-col items-center">
    <div class="w-full flex flex-col items-center">
      <div class="w-full">
        <div class="flex flex-col items-center relative">
          <div
            class="w-full cursor-pointer"
            @click="opened = !opened">

            <t-input
              :value="textValue"
              :placeholder="label"
              readonly>

              <template v-slot:prepend v-if="$attrs.prependIcon">
                <div class="absolute flex items-center">
                  <t-button icon text>
                    <t-icon
                      :type="$attrs.prependIcon"
                      @click="(e) => prependHandler ? prependHandler(e) : null">
                    </t-icon>
                  </t-button>
                </div>
              </template>

              <template v-slot:append>
                <t-button icon text>
                  <t-icon
                    :type="opened ? 'chevron-up' : 'chevron-down'">
                  </t-icon>
                </t-button>
              </template>
            </t-input>
          </div>
          <div
            v-if="opened"
            class="absolute shadow bg-white top-100 z-40 w-full lef-0 rounded
            max-h-select overflow-y-auto mb-4">
            <div class="flex flex-col w-full">
              <t-option v-for="(option, index) in options" :key="index"
                :title="titleForOption(option)"
                :subtitle="subtitleForOption(option)"
                :selected="isOptionSelected(option)"
                @click="onClick(option)"
                ></t-option>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TOption from './TOption.vue';

export default {
  name: 't-select',
  components: {
    TOption,
  },
  props: {
    label: String,
    options: {
      default() {
        return [];
      },
    },
    value: null,
    title: String,
    subtitle: String,
    returnValue: String,
  },
  data: () => ({
    opened: false,
  }),
  methods: {
    onClick(option) {
      this.opened = false;
      this.$emit('input', this.returnValue ? option[this.returnValue] : option);
      this.$emit('change', this.returnValue ? option[this.returnValue] : option);
    },
    titleForOption(option) {
      if (this.isOptionsArrayOfObjects) {
        return option[this.title];
      }
      return option;
    },
    subtitleForOption(option) {
      if (this.isOptionsArrayOfObjects) {
        return option[this.subtitle];
      }
      return null;
    },
    isOptionSelected(option) {
      if (this.returnValue) {
        return option[this.returnValue] === this.value;
      }
      return option === this.value;
    },
  },
  computed: {
    textValue() {
      if (!this.hasValue) {
        return '';
      }
      if (!this.isOptionsArrayOfObjects) {
        return this.value;
      }
      if (this.returnValue) {
        const option = this.options.find((o) => o[this.returnValue] === this.value);
        return option[this.title];
      }
      return this.value[this.title];
    },
    hasValue() {
      return this.value !== null && this.value !== undefined;
    },
    isOptionsArrayOfObjects() {
      return this.options && this.options.length && typeof this.options[0] === 'object';
    },
  },
};
</script>

<style scope lang="scss">
.top-100 {
  top: 100%;
}
.bottom-100 {
  bottom: 100%;
}
.max-h-select {
  max-height: 300px;
}
</style>
