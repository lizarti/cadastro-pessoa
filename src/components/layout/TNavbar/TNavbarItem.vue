<template>
  <div class="relative">
    <span
        v-if="!$slots.submenu"
        class="cursor-pointer group text-base leading-6 font-medium hover:text-gray-900
        focus:outline-none focus:text-gray-900 transition ease-in-out duration-1500"
        @click="$emit('click')">
      <slot></slot>
    </span>

    <template v-if="$slots.submenu">
      <button
        type="button"
        class="group inline-flex items-center space-x-2 text-base leading-6 font-medium
         hover:text-gray-900 focus:outline-none focus:text-gray-900
         transition ease-in-out duration-150">
        <span>
          <slot></slot>
        </span>
        <svg
          class="text-gray-400 h-5 w-5 group-hover:text-gray-500 group-focus:text-gray-500
          transition ease-in-out duration-150" viewBox="0 0 20 20" fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1
            0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"/>
        </svg>
      </button>
      <div
        class="absolute -ml-4 mt-3 transform px-2 w-screen max-w-md
        sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
        <div class="rounded-lg shadow-lg">
          <div class="rounded-lg shadow-xs overflow-hidden">
            <div class="z-20 relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
              <slot name="submenu"></slot>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 't-navbar-item',
  props: {
    icon: {
      type: Boolean,
      required: false,
      default: false,
    },
    submenu: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style>

</style>
