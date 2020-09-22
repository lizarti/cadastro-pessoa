<template>
  <div class="flex flex-col items-center w-full">
    <div class="w-full flex flex-col items-center">
      <div class="w-full">
        <div class="flex flex-col items-center relative">
          <div
            class="w-full cursor-pointer"
            @click="opened = !opened">
            <div
              class="my-2 px-4 py-2 rounded border
            bg-gray-200 border-gray-200 focus:border-blue-200 flex">
              <div class="appearance-none outline-none w-full
              text-gray-800 overflow-hidden whitespace-no-wrap">
                <span class="text-gray-500" v-if="!hasValidValue">{{ label}}</span>
                <span v-if="hasValidValue" class="">
                  {{ textValue }}
                </span>
              </div>
              <div
                class="text-gray-300 w-8 pl-2 pr-1 border-l flex items-center border-gray-200">
                <button
                  class="w-6 h-6 text-gray-600 outline-none focus:outline-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="w-4 h-4">
                    <polyline :points="pointsIconChevron" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div
            v-if="opened"
            class="absolute shadow bg-white top-100 z-40 w-full lef-0 rounded
            max-h-select overflow-y-auto svelte-5uyqqj">
            <div class="flex flex-col w-full">
              <t-option v-for="(option, index) in options" :key="index"
                :title="option[title]"
                :subtitle="option[subtitle]"
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
    isOptionSelected(option) {
      if (this.returnValue) {
        return option[this.returnValue] === this.value;
      }
      return option === this.value;
    },
  },
  computed: {
    textValue() {
      if (this.returnValue) {
        const option = this.options.find((o) => o[this.returnValue] === this.value);
        return option[this.title];
      }
      return this.value[this.title];
    },
    pointsIconChevron() {
      return this.opened ? '18 15 12 9 6 15' : '18 9 12 15 6 9';
    },
    hasValidValue() {
      return this.value !== null && this.value !== undefined;
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
